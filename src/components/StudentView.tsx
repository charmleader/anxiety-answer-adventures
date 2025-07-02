import { useState, useRef } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from '@/components/ui/button';
import { useVotes } from '@/hooks/useVotes';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2 } from 'lucide-react';
import homeroomTeacherImage from '@/assets/homeroom-teachers.jpg';
import healthTeachersImage from '@/assets/health-teachers.jpg';
import counselingTeachersImage from '@/assets/counseling-teachers.jpg';
import libraryTeachersImage from '@/assets/library-teachers.jpg';
import nutritionTeachersImage from '@/assets/nutrition-teachers.jpg';

const homeroomTeacher = {
  id: 'homeroom',
  name: '담임실',
  teacher: '담임 선생님',
  advice: '시험은 너의 노력이 빛나는 순간이야. 지금까지 열심히 한 너 자신을 믿고, 차근차근 해보자. 선생님이 항상 응원하고 있어!',
  description: '따뜻한 격려와 응원',
  image: homeroomTeacherImage,
  color: 'homeroom',
};

const otherTeachers = [
  {
    id: 'health_room',
    name: '보건실',
    teacher: '보건 선생님',
    advice: '시험에 대한 불안은 누구에게나 있을 수 있어. 심호흡을 크게 하고, 두 손으로 나를 토닥여 주자~ 다독다독~ 누구보다 네가 스스로를 응원해 준다면, 너의 뇌는 너의 불안을 희망으로 변화 시킬거고, 결국 너는 해 낼 수 있을거야!',
    description: '몸과 마음을 편안하게',
    image: healthTeachersImage,
    color: 'health-room',
  },
  {
    id: 'counseling_room',
    name: '상담실',
    teacher: '상담 선생님',
    advice: '시험보기전에 마음이 두근거리거나 나는 또 못할거야, 스탑! 신호를 만들자. 예를 들어 마음속으로 "멈춰!"라고 말하는거야. 그리고 나는 준비한 만큼 해볼거야.',
    description: '마음의 부담을 덜어내기',
    image: counselingTeachersImage,
    color: 'counseling-room',
  },
  {
    id: 'library',
    name: '도서실',
    teacher: '사서 선생님',
    advice: '그러면 효율적으로 공부하기 위해 공부 방법을 알아볼까요?',
    description: '체계적으로 정리하기',
    image: libraryTeachersImage,
    color: 'library',
  },
  {
    id: 'cafeteria',
    name: '급식실',
    teacher: '영양 선생님',
    advice: '바나나 한 입, 아몬드 5개! 시험 전 불안감을 없앨 수 있는 마법 간식이야. 먹으면 마음이 차분해지고 머리가 반짝해질거야!',
    description: '몸의 에너지 충전하기',
    image: nutritionTeachersImage,
    color: 'cafeteria',
  },
];

export function StudentView() {
  const [step, setStep] = useState<'homeroom' | 'choice' | 'others' | 'voted'>('homeroom');
  const [isHomeroomFlipped, setIsHomeroomFlipped] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { voteCounts, vote, hasVoted, totalVotes } = useVotes();

  const handleHomeroomFlip = () => {
    setIsHomeroomFlipped(!isHomeroomFlipped);
  };

  const handleHomeroomSolved = () => {
    vote('homeroom');
    setStep('voted');
  };

  const handleNeedMoreHelp = () => {
    setStep('others');
  };

  const handleCardFlip = (locationId: string) => {
    if (hasVoted) return;
    
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(locationId)) {
      newFlippedCards.delete(locationId);
    } else {
      newFlippedCards.clear();
      newFlippedCards.add(locationId);
    }
    setFlippedCards(newFlippedCards);
  };

  const handleVote = (locationId: string) => {
    vote(locationId as keyof typeof voteCounts);
    setStep('voted');
  };

  const getSelectedLocation = () => {
    return Array.from(flippedCards)[0];
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderHomeroomStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
          선생님, 시험을 보는데<br />불안해요. 어떻게 해야할까요?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          먼저 담임선생님께 물어보세요. 카드를 클릭해서 조언을 들어보세요!
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <TeacherCard
          location={homeroomTeacher}
          isFlipped={isHomeroomFlipped}
          onFlip={handleHomeroomFlip}
          voteCount={voteCounts.homeroom}
        />
      </div>

      {isHomeroomFlipped && (
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Button
              onClick={toggleAudio}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <Volume2 className="w-5 h-5" />
              음성으로 듣기
            </Button>
            <audio
              ref={audioRef}
              src="/담임.m4a"
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={handleHomeroomSolved}
              size="lg"
              className="bg-gradient-primary text-white text-lg px-8 py-4 shadow-floating hover:shadow-card transition-all duration-300 mr-4"
            >
              선생님 감사합니다. 위로가 되었어요.
            </Button>
            <Button
              onClick={handleNeedMoreHelp}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
            >
              다른 선생님께도 상담받고 싶어요
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderOthersStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
          다른 선생님들의 조언도<br />들어보세요!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          4명의 선생님께서 각각 다른 조언을 주실 거예요. 카드를 클릭해서 조언을 들어보세요!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {otherTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            location={teacher}
            isFlipped={flippedCards.has(teacher.id)}
            onFlip={() => handleCardFlip(teacher.id)}
            voteCount={voteCounts[teacher.id as keyof typeof voteCounts]}
          />
        ))}
      </div>

      {flippedCards.size > 0 && (
        <div className="text-center">
          <Button
            onClick={() => handleVote(getSelectedLocation())}
            size="lg"
            className="bg-gradient-primary text-white text-lg px-8 py-4 shadow-floating hover:shadow-card transition-all duration-300"
          >
            이 조언이 가장 도움이 될 것 같아요!
          </Button>
        </div>
      )}
    </div>
  );

  const renderVotedStep = () => (
    <div className="text-center">
      <div className="bg-white rounded-lg p-6 shadow-card max-w-md mx-auto">
        <h3 className="text-xl font-bold text-foreground mb-2">
          참여해주셔서 감사합니다!
        </h3>
        <p className="text-muted-foreground">
          선생님께서 결과를 확인하실 수 있어요.
        </p>
        {totalVotes > 0 && (
          <Badge variant="secondary" className="text-base px-4 py-2 mt-4">
            총 {totalVotes}명이 참여했어요
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-6xl mx-auto">
        {step === 'homeroom' && renderHomeroomStep()}
        {step === 'others' && renderOthersStep()}
        {step === 'voted' && renderVotedStep()}
      </div>
    </div>
  );
}