import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RodVisualizationProps {
  totalLength: number;
  cuts: number[];
  variant?: 'greedy' | 'dp' | 'neutral';
  animated?: boolean;
  showLabels?: boolean;
  className?: string;
}

const segmentColors = [
  'bg-[hsl(var(--viz-segment-1))]',
  'bg-[hsl(var(--viz-segment-2))]',
  'bg-[hsl(var(--viz-segment-3))]',
  'bg-[hsl(var(--viz-segment-4))]',
  'bg-[hsl(var(--viz-segment-5))]',
];

export function RodVisualization({
  totalLength,
  cuts,
  variant = 'neutral',
  animated = true,
  showLabels = true,
  className,
}: RodVisualizationProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'greedy':
        return 'ring-2 ring-greedy/30';
      case 'dp':
        return 'ring-2 ring-dp/30';
      default:
        return 'ring-2 ring-primary/20';
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Full rod representation */}
      <div className="relative">
        <div
          className={cn(
            'h-12 rounded-lg bg-muted/50 overflow-hidden flex',
            getVariantClasses()
          )}
        >
          <AnimatePresence mode="wait">
            {cuts.length > 0 ? (
              cuts.map((cut, index) => {
                const widthPercent = (cut / totalLength) * 100;
                return (
                  <motion.div
                    key={`${index}-${cut}`}
                    initial={animated ? { width: 0, opacity: 0 } : false}
                    animate={{ width: `${widthPercent}%`, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: animated ? index * 0.15 : 0,
                      ease: 'easeOut',
                    }}
                    className={cn(
                      'h-full flex items-center justify-center text-sm font-semibold text-white relative',
                      segmentColors[index % segmentColors.length]
                    )}
                    style={{ minWidth: widthPercent > 5 ? '30px' : '0' }}
                  >
                    {widthPercent > 8 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: animated ? index * 0.15 + 0.2 : 0 }}
                      >
                        {cut}
                      </motion.span>
                    )}
                    {/* Divider line */}
                    {index < cuts.length - 1 && (
                      <div className="absolute right-0 top-0 h-full w-0.5 bg-background/50" />
                    )}
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex items-center justify-center text-muted-foreground text-sm"
              >
                No cuts made yet
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Length markers */}
        {showLabels && (
          <div className="flex justify-between mt-1 px-1">
            <span className="text-xs text-muted-foreground">0</span>
            <span className="text-xs text-muted-foreground">{totalLength}</span>
          </div>
        )}
      </div>

      {/* Cut summary */}
      {cuts.length > 0 && showLabels && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {cuts.map((cut, index) => (
            <span
              key={index}
              className={cn(
                'px-2 py-1 rounded-md text-xs font-medium text-white',
                segmentColors[index % segmentColors.length]
              )}
            >
              Length: {cut}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
