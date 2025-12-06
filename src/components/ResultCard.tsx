import { motion } from 'framer-motion';
import { DollarSign, Scissors, Clock, Award } from 'lucide-react';
import { AlgorithmResult } from '@/lib/algorithms';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  result: AlgorithmResult | null;
  variant: 'greedy' | 'dp';
  className?: string;
}

export function ResultCard({ result, variant, className }: ResultCardProps) {
  if (!result) {
    return (
      <div
        className={cn(
          'result-card flex items-center justify-center h-48 text-muted-foreground',
          className
        )}
      >
        Run the algorithm to see results
      </div>
    );
  }

  const isDP = variant === 'dp';
  const gradientClass = isDP ? 'dp-gradient' : 'greedy-gradient';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('result-card', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {isDP ? 'Dynamic Programming' : 'Greedy'} Result
        </h3>
        {isDP && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-dp/10 text-dp text-xs font-semibold"
          >
            <Award className="w-3 h-3" />
            Optimal
          </motion.span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-muted/50"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Total Profit</span>
          </div>
          <p className={cn('text-3xl font-bold', isDP ? 'text-dp' : 'text-greedy')}>
            ${result.profit}
          </p>
        </motion.div>

        {/* Cuts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-muted/50"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Scissors className="w-4 h-4" />
            <span className="text-sm">Cut Pattern</span>
          </div>
          <p className="text-lg font-semibold font-mono">
            [{result.cuts.join(', ')}]
          </p>
        </motion.div>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-muted/50"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Execution Time</span>
          </div>
          <p className="text-lg font-semibold">
            {result.executionTime.toFixed(3)} ms
          </p>
        </motion.div>
      </div>

      {/* Visual indicator bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={cn('h-1 rounded-full mt-6 origin-left', gradientClass)}
      />
    </motion.div>
  );
}
