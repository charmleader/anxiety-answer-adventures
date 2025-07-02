import { FlipCard } from './FlipCard';
import { Badge } from '@/components/ui/badge';

interface TeacherCardProps {
  location: {
    id: string;
    name: string;
    teacher: string;
    advice: string;
    description: string;
    image: string;
    color: string;
  };
  isFlipped: boolean;
  onFlip: () => void;
  voteCount: number;
}

export function TeacherCard({ location, isFlipped, onFlip, voteCount }: TeacherCardProps) {
  const frontContent = (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-48 h-48 md:w-64 md:h-64 mb-4 rounded-full overflow-hidden shadow-gentle">
        <img 
          src={location.image} 
          alt={location.teacher}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        {location.name}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground">
        {location.description}
      </p>
    </div>
  );

  const backContent = (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg md:text-xl font-bold text-foreground">
          {location.teacher}
        </h4>
        <Badge variant="secondary" className="text-sm">
          {voteCount}명 선택
        </Badge>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-base md:text-lg leading-relaxed text-foreground mb-4">
            "{location.advice}"
          </p>
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-gentle">
            <img 
              src={location.image} 
              alt={location.teacher}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <FlipCard
      frontContent={frontContent}
      backContent={backContent}
      isFlipped={isFlipped}
      onFlip={onFlip}
      locationColor={location.color}
      className="h-96 md:h-[28rem]"
    />
  );
}