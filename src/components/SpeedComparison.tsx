import { motion } from 'framer-motion';
import { AlgorithmResult } from '@/lib/algorithms';
import { cn } from '@/lib/utils';

interface SpeedComparisonProps {
  greedyResult: AlgorithmResult | null;
  dpResult: AlgorithmResult | null;
  className?: string;
}

export function SpeedComparison({
  greedyResult,
  dpResult,
  className,
}: SpeedComparisonProps) {
  if (!greedyResult || !dpResult) {
    return null;
  }

  const maxTime = Math.max(greedyResult.executionTime, dpResult.executionTime);
  const greedyWidth = (greedyResult.executionTime / maxTime) * 100;
  const dpWidth = (dpResult.executionTime / maxTime) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-6 rounded-xl bg-card border border-border', className)}
    >
      <h3 className="text-lg font-semibold mb-6">Speed Comparison</h3>

      <div className="space-y-6">
        {/* Greedy Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-greedy">Greedy Algorithm</span>
            <span className="text-muted-foreground">
              {greedyResult.executionTime.toFixed(3)} ms
            </span>
          </div>
          <div className="h-8 bg-muted/50 rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${greedyWidth}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full greedy-gradient flex items-center justify-end pr-3"
            >
              {greedyWidth > 15 && (
                <span className="text-xs font-semibold text-white">
                  {greedyResult.executionTime.toFixed(2)}ms
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* DP Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-dp">Dynamic Programming</span>
            <span className="text-muted-foreground">
              {dpResult.executionTime.toFixed(3)} ms
            </span>
          </div>
          <div className="h-8 bg-muted/50 rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dpWidth}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="h-full dp-gradient flex items-center justify-end pr-3"
            >
              {dpWidth > 15 && (
                <span className="text-xs font-semibold text-white">
                  {dpResult.executionTime.toFixed(2)}ms
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profit comparison */}
      <div className="mt-6 p-4 rounded-lg bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Profit Difference</span>
          <span
            className={cn(
              'font-semibold',
              dpResult.profit > greedyResult.profit ? 'text-dp' : 'text-muted-foreground'
            )}
          >
            {dpResult.profit > greedyResult.profit
              ? `DP is $${dpResult.profit - greedyResult.profit} better`
              : 'Same profit'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
