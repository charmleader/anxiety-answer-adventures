-- 투표 결과를 저장할 테이블 생성
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL CHECK (location IN ('health_room', 'counseling_room', 'library', 'cafeteria')),
  student_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS 정책 설정
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 투표를 볼 수 있도록 설정
CREATE POLICY "Anyone can view votes" 
ON public.votes 
FOR SELECT 
USING (true);

-- 모든 사용자가 투표를 추가할 수 있도록 설정
CREATE POLICY "Anyone can insert votes" 
ON public.votes 
FOR INSERT 
WITH CHECK (true);

-- 중복 투표 방지를 위한 unique 제약조건
CREATE UNIQUE INDEX unique_student_vote ON public.votes(student_id);

-- 투표 카운트를 위한 인덱스
CREATE INDEX idx_votes_location ON public.votes(location);