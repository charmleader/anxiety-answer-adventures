import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipped: boolean;
  onFlip: () => void;
  className?: string;
  locationColor: string;
}

export function FlipCard({ 
  frontContent, 
  backContent, 
  isFlipped, 
  onFlip, 
  className,
  locationColor 
}: FlipCardProps) {
  return (
    <div className={cn("relative w-full h-full perspective-1000", className)}>
      <Card 
        className={cn(
          "w-full h-full cursor-pointer transition-transform duration-700 transform-style-preserve-3d shadow-card hover:shadow-floating",
          isFlipped && "rotate-y-180",
          `bg-${locationColor}`
        )}
        onClick={onFlip}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-gradient-card border-2 border-white/50">
          {frontContent}
        </div>
        
        {/* 뒷면 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-white border-2 border-white/50">
          {backContent}
        </div>
      </Card>
    </div>
  );
}