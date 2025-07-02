import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VoteCount {
  health_room: number;
  counseling_room: number;
  library: number;
  cafeteria: number;
  homeroom: number;
}

export function useVotes() {
  const [voteCounts, setVoteCounts] = useState<VoteCount>({
    health_room: 0,
    counseling_room: 0,
    library: 0,
    cafeteria: 0,
    homeroom: 0,
  });

  const [hasVoted, setHasVoted] = useState(false);
  const [studentId] = useState(() => `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // 투표 수 조회
  const fetchVoteCounts = async () => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('location');

      if (error) throw error;

      const counts: VoteCount = {
        health_room: 0,
        counseling_room: 0,
        library: 0,
        cafeteria: 0,
        homeroom: 0,
      };

      data?.forEach((vote) => {
        if (vote.location in counts) {
          counts[vote.location as keyof VoteCount]++;
        }
      });

      setVoteCounts(counts);
    } catch (error) {
      console.error('Error fetching vote counts:', error);
    }
  };

  // 투표하기
  const vote = async (location: keyof VoteCount) => {
    if (hasVoted) return;

    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ location, student_id: studentId }]);

      if (error) throw error;

      setHasVoted(true);
      await fetchVoteCounts();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  // 실시간 업데이트 구독
  useEffect(() => {
    fetchVoteCounts();

    const channel = supabase
      .channel('votes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
        },
        () => {
          fetchVoteCounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    voteCounts,
    vote,
    hasVoted,
    totalVotes: Object.values(voteCounts).reduce((sum, count) => sum + count, 0),
  };
}