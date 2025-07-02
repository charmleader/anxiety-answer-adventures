import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            아이(AI)마음 휴게소
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            시험 불안감을 해소할 수 있도록 선생님들의 조언을 들어보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* 학생용 */}
          <Card 
            className="p-8 text-center bg-gradient-card shadow-card hover:shadow-floating transition-all duration-300 cursor-pointer hover-lift"
            onClick={() => navigate('/student')}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              학생용
            </h2>
            <p className="text-muted-foreground mb-6">
              카드를 클릭해서 각각의 선생님의 조언도 들어보세요.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-gradient-primary text-white"
            >
              게임 시작하기
            </Button>
          </Card>

          {/* 교사용 */}
          <Card 
            className="p-8 text-center bg-gradient-card shadow-card hover:shadow-floating transition-all duration-300 cursor-pointer hover-lift"
            onClick={() => navigate('/teacher')}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-accent-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              교사용
            </h2>
            <p className="text-muted-foreground mb-6">
              학생들이 어떤 조언을 선택했는지 실시간으로 확인하고 결과를 분석할 수 있습니다.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="w-full"
            >
              결과 확인하기
            </Button>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            긴장도 관리를 위한 교육용 게임입니다
          </p>
        </div>
      </div>
      
      {/* Creator credit */}
      <div className="fixed bottom-4 right-8 text-sm text-muted-foreground/70 z-10">
        제작자: 참리더
      </div>
    </div>
  );
};

export default Index;
