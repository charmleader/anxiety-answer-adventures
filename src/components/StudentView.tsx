import { useState } from 'react';
import { TeacherCard } from './TeacherCard';
import { Button } from '@/components/ui/button';
import { useVotes } from '@/hooks/useVotes';
import { Badge } from '@/components/ui/badge';

const locations = [
  {
    id: 'health_room',
    name: '보건실',
    teacher: '보건 선생님',
    advice: '깊게 숨을 쉬고 몸의 긴장을 풀어보세요. 시험은 건강이 가장 중요해요.',
    description: '몸과 마음을 편안하게',
    image: '/lovable-uploads/2fe0360c-80ca-4177-b2f8-2af64e08a28f.png',
    color: 'health-room',
  },
  {
    id: 'counseling_room',
    name: '상담실',
    teacher: '상담 선생님',
    advice: '시험보기전에 마음이 두근거리거나 나는 또 못할거야, 스탑! 신호를 만들자. 예를 들어 마음속으로 "멈춰!"라고 말하는거야. 그리고 나는 준비한 만큼 해볼거야.',
    description: '마음의 부담을 덜어내기',
    image: '/lovable-uploads/f654e1fe-1cc7-4541-8d17-cf4299d39fc0.png',
    color: 'counseling-room',
  },
  {
    id: 'library',
    name: '교실',
    teacher: '담임 선생님',
    advice: '공부를 제대로 안하니까 불안한거야. 그시간에 공부를 하자! 정면돌파!',
    description: '체계적으로 정리하기',
    image: '/lovable-uploads/190579a4-33ad-40e6-93ca-511720b44c60.png',
    color: 'library',
  },
  {
    id: 'cafeteria',
    name: '급식실',
    teacher: '영양 선생님',
    advice: '바나나 한 입, 아몬드 5개! 시험 전 불안감을 없앨 수 있는 마법 간식이야. 먹으면 마음이 차분해지고 머리가 반짝해질거야!',
    description: '몸의 에너지 충전하기',
    image: '/lovable-uploads/07388efb-3770-4315-866e-545bf1fa4ad7.png',
    color: 'cafeteria',
  },
  {
    id: 'homeroom',
    name: '담임실',
    teacher: '담임 선생님',
    advice: '시험은 너의 노력이 빛나는 순간이야. 지금까지 열심히 한 너 자신을 믿고, 차근차근 해보자. 선생님이 항상 응원하고 있어!',
    description: '따뜻한 격려와 응원',
    image: '/src/assets/homeroom-teacher.jpg',
    color: 'homeroom',
  },
];

export function StudentView() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const { voteCounts, vote, hasVoted, totalVotes } = useVotes();

  const handleCardFlip = (locationId: string) => {
    if (hasVoted) return;
    
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(locationId)) {
      newFlippedCards.delete(locationId);
    } else {
      newFlippedCards.clear(); // 한 번에 하나의 카드만 뒤집기
      newFlippedCards.add(locationId);
    }
    setFlippedCards(newFlippedCards);
  };

  const handleVote = (locationId: string) => {
    vote(locationId as keyof typeof voteCounts);
  };

  const getSelectedLocation = () => {
    return Array.from(flippedCards)[0];
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
            선생님, 시험을 보는데<br />불안해요. 어떻게 해야할까요?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            4명의 선생님께서 각각 다른 조언을 주실 거예요. 카드를 클릭해서 조언을 들어보세요!
          </p>
          
          {totalVotes > 0 && (
            <Badge variant="secondary" className="text-base px-4 py-2">
              총 {totalVotes}명이 참여했어요
            </Badge>
          )}
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {locations.map((location) => (
            <TeacherCard
              key={location.id}
              location={location}
              isFlipped={flippedCards.has(location.id)}
              onFlip={() => handleCardFlip(location.id)}
              voteCount={voteCounts[location.id as keyof typeof voteCounts]}
            />
          ))}
        </div>

        {/* 투표 버튼 */}
        {flippedCards.size > 0 && !hasVoted && (
          <div className="text-center">
            <Button
              onClick={() => handleVote(getSelectedLocation())}
              size="lg"
              className="bg-gradient-primary text-white text-lg px-8 py-4 shadow-floating hover:shadow-card transition-all duration-300"
            >
              이 조언이 도움이 될 것 같아요!
            </Button>
          </div>
        )}

        {hasVoted && (
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-card max-w-md mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-2">
                투표해주셔서 감사합니다!
              </h3>
              <p className="text-muted-foreground">
                선생님께서 결과를 확인하실 수 있어요.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}