import { useVotes } from '@/hooks/useVotes';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const locations = [
  {
    id: 'health_room',
    name: '보건실',
    teacher: '보건 선생님',
    advice: '깊게 숨을 쉬고 몸의 긴장을 풀어보세요. 시험은 건강이 가장 중요해요.',
    image: '/lovable-uploads/2fe0360c-80ca-4177-b2f8-2af64e08a28f.png',
    color: 'health-room',
  },
  {
    id: 'counseling_room',
    name: '상담실',
    teacher: '상담 선생님',
    advice: '불안한 마음을 나누어 보세요. 충분히 준비했다면 자신을 믿어보세요.',
    image: '/lovable-uploads/f654e1fe-1cc7-4541-8d17-cf4299d39fc0.png',
    color: 'counseling-room',
  },
  {
    id: 'library',
    name: '도서관',
    teacher: '사서 선생님',
    advice: '차분히 정리하며 복습해보세요. 아는 것부터 천천히 확인해 나가세요.',
    image: '/lovable-uploads/190579a4-33ad-40e6-93ca-511720b44c60.png',
    color: 'library',
  },
  {
    id: 'cafeteria',
    name: '급식실',
    teacher: '영양 선생님',
    advice: '영양가 있는 음식을 먹고 충분히 쉬세요. 컨디션 관리가 가장 중요해요.',
    image: '/lovable-uploads/07388efb-3770-4315-866e-545bf1fa4ad7.png',
    color: 'cafeteria',
  },
];

export function TeacherView() {
  const { voteCounts, totalVotes } = useVotes();

  const getPercentage = (count: number) => {
    return totalVotes > 0 ? (count / totalVotes) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            교사용 결과 화면
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            학생들이 어떤 조언을 선택했는지 실시간으로 확인할 수 있습니다.
          </p>
          <Badge variant="secondary" className="text-lg px-6 py-2">
            총 참여 학생: {totalVotes}명
          </Badge>
        </div>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => {
            const count = voteCounts[location.id as keyof typeof voteCounts];
            const percentage = getPercentage(count);
            
            return (
              <Card key={location.id} className={`p-6 bg-${location.color} border-2 border-white/50 shadow-card`}>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-gentle">
                    <img 
                      src={location.image} 
                      alt={location.teacher}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {location.name}
                      </h3>
                      <Badge variant="secondary" className="text-sm">
                        {count}명
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {location.teacher}
                    </p>
                    
                    <Progress 
                      value={percentage} 
                      className="h-3 mb-3"
                    />
                    
                    <p className="text-sm text-foreground font-medium">
                      {percentage.toFixed(1)}% 선택
                    </p>
                    
                    <div className="mt-3 p-3 bg-white/70 rounded-lg">
                      <p className="text-sm text-foreground italic">
                        "{location.advice}"
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {totalVotes === 0 && (
          <div className="text-center mt-12">
            <Card className="p-8 bg-white shadow-card max-w-md mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-2">
                아직 투표한 학생이 없습니다
              </h3>
              <p className="text-muted-foreground">
                학생들이 투표하면 실시간으로 결과가 업데이트됩니다.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}