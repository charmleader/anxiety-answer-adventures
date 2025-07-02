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
  name: '교실',
  teacher: '담임 선생님',
  advice: `공부를 제대로 안하니까 불안한거야. \n그시간에 공부를 하자! \n정면돌파! 화이팅!`,
  description: '따뜻한 격려와 응원',
  image: '/lovable-uploads/d36a05a1-d0bc-490e-a102-02d187685aca.png',
  color: 'homeroom',
};

const otherTeachers = [
  {
    id: 'health_room',
    name: '보건실',
    teacher: '보건 선생님',
    advice: '심호흡을 크게 하고, 두 손으로 나를 토닥여 주자~ 다독다독~ 누구보다 네가 스스로를 응원해 준다면, 너의 뇌는 너의 불안을 희망으로 변화 시킬거고, 결국 너는 해 낼 수 있을거야!',
    description: '몸과 마음을 편안하게',
    image: '/lovable-uploads/818b62b1-0a53-4d0f-be83-2fae413e0b96.png',
    color: 'health-room',
  },
  {
    id: 'counseling_room',
    name: '상담실',
    teacher: '상담 선생님',
    advice: '시험보기전에 마음이 두근거리거나 나는 또 못할거야, 스탑! 신호를 만들자. 예를 들어 마음속으로 "멈춰!"라고 말하는거야. 그리고 나는 준비한 만큼 해볼거야.',
    description: '마음의 부담을 덜어내기',
    image: '/lovable-uploads/61012407-a7fd-4fcf-9484-a604ecf32fc3.png',
    color: 'counseling-room',
  },
  {
    id: 'library',
    name: '도서실',
    teacher: '사서 선생님',
    advice: '그러면 효율적으로 공부하기 위해 공부 방법을 알아볼까요?',
    description: '체계적으로 정리하기',
    image: '/lovable-uploads/aca47cf7-d727-4b94-ac2c-2f42625181c5.png',
    color: 'library',
  },
  {
    id: 'cafeteria',
    name: '급식실',
    teacher: '영양 선생님',
    advice: '바나나 한 입, 아몬드 5개! 시험 전 불안감을 없앨 수 있는 마법 간식이야. 먹으면 마음이 차분해지고 머리가 반짝해질거야!',
    description: '몸의 에너지 충전하기',
    image: '/lovable-uploads/480377ae-6190-43e2-a11b-45ec2d015585.png',
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
    console.log('handleHomeroomSolved called');
    vote('homeroom');
    setStep('voted');
  };

  const handleNeedMoreHelp = () => {
    console.log('handleNeedMoreHelp called');
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
          선생님!<br />
          <span className="text-3xl md:text-5xl lg:text-6xl opacity-80">시험을 보는데 불안해요.</span><br />
          어떻게 해야할까요?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          카드를 클릭해서 담임 선생님의 조언을 들어보세요.
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
          <div className="flex justify-center mb-6">
            <Button
              onClick={toggleAudio}
              variant="secondary"
              size="lg"
              className="flex items-center gap-3 px-6 py-4 text-lg font-medium bg-gradient-card shadow-card hover:shadow-floating transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              <Volume2 className="w-6 h-6" />
              음성으로 듣기
            </Button>
            <audio
              ref={audioRef}
              src="/teacher2.MP3"
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
              선생님 감사합니다. 도움이 되었어요.
            </Button>
            <div className="mt-8 p-6 bg-gradient-card rounded-lg shadow-card border border-border">
              <div className="text-center mb-6">
                <p className="text-xl font-semibold text-foreground mb-2">
                  또 다른 해결방법이 궁금한가요?
                </p>
                <p className="text-base text-muted-foreground">
                  다른 선생님들의 특별한 조언도 들어보세요!
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleNeedMoreHelp}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 font-medium bg-background/50 border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                >
                  추가 해결방안 보기
                </Button>
              </div>
            </div>
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
          카드를 클릭해서 각각의 선생님의 조언도 들어보세요!
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
      
      {/* Creator credit */}
      <div className="fixed bottom-4 right-8 text-sm text-muted-foreground/70 z-10">
        제작자: 참리더
      </div>
    </div>
  );
}