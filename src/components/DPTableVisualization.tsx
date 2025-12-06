import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DPTableVisualizationProps {
  dpTable: number[];
  highlightIndex?: number;
  animated?: boolean;
  className?: string;
}

export function DPTableVisualization({
  dpTable,
  highlightIndex,
  animated = true,
  className,
}: DPTableVisualizationProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <div className="min-w-max">
        {/* Header row - indices */}
        <div className="flex gap-1 mb-1">
          <div className="w-16 h-10 flex items-center justify-center text-xs font-medium text-muted-foreground bg-muted/30 rounded">
            Length
          </div>
          {dpTable.map((_, index) => (
            <motion.div
              key={`header-${index}`}
              initial={animated ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                'w-14 h-10 flex items-center justify-center text-sm font-semibold rounded',
                index === highlightIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-foreground'
              )}
            >
              {index}
            </motion.div>
          ))}
        </div>

        {/* Value row */}
        <div className="flex gap-1">
          <div className="w-16 h-12 flex items-center justify-center text-xs font-medium text-muted-foreground bg-muted/30 rounded">
            Max $
          </div>
          {dpTable.map((value, index) => (
            <motion.div
              key={`value-${index}`}
              initial={animated ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'w-14 h-12 flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all duration-300',
                index === highlightIndex
                  ? 'border-dp bg-dp/20 text-dp animate-cell-highlight'
                  : value > 0
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-border bg-muted/30 text-muted-foreground'
              )}
            >
              ${value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
