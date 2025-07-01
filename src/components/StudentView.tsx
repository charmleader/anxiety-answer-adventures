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
    advice: '불안한 마음을 나누어 보세요. 충분히 준비했다면 자신을 믿어보세요.',
    description: '마음의 부담을 덜어내기',
    image: '/lovable-uploads/f654e1fe-1cc7-4541-8d17-cf4299d39fc0.png',
    color: 'counseling-room',
  },
  {
    id: 'library',
    name: '도서관',
    teacher: '사서 선생님',
    advice: '차분히 정리하며 복습해보세요. 아는 것부터 천천히 확인해 나가세요.',
    description: '체계적으로 정리하기',
    image: '/lovable-uploads/190579a4-33ad-40e6-93ca-511720b44c60.png',
    color: 'library',
  },
  {
    id: 'cafeteria',
    name: '급식실',
    teacher: '영양 선생님',
    advice: '영양가 있는 음식을 먹고 충분히 쉬세요. 컨디션 관리가 가장 중요해요.',
    description: '몸의 에너지 충전하기',
    image: '/lovable-uploads/07388efb-3770-4315-866e-545bf1fa4ad7.png',
    color: 'cafeteria',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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