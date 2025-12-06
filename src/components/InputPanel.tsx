import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InputPanelProps {
  onRun: (prices: number[], rodLength: number) => void;
  onReset?: () => void;
  variant?: 'greedy' | 'dp' | 'compare';
  isRunning?: boolean;
  className?: string;
}

export function InputPanel({
  onRun,
  onReset,
  variant = 'greedy',
  isRunning = false,
  className,
}: InputPanelProps) {
  const [pricesInput, setPricesInput] = useState('2, 5, 7, 8, 10, 17, 17, 20');
  const [rodLength, setRodLength] = useState(8);
  const [error, setError] = useState('');

  const parsePrices = (input: string): number[] | null => {
    try {
      const prices = input
        .split(/[,\s]+/)
        .filter((s) => s.trim())
        .map((s) => {
          const num = parseFloat(s.trim());
          if (isNaN(num) || num < 0) throw new Error('Invalid price');
          return num;
        });
      return prices.length > 0 ? prices : null;
    } catch {
      return null;
    }
  };

  const handleRun = () => {
    const prices = parsePrices(pricesInput);
    if (!prices) {
      setError('Please enter valid prices (positive numbers separated by commas)');
      return;
    }
    if (rodLength < 1 || rodLength > 50) {
      setError('Rod length must be between 1 and 50');
      return;
    }
    setError('');
    onRun(prices, rodLength);
  };

  const handleReset = () => {
    setPricesInput('2, 5, 7, 8, 10, 17, 17, 20');
    setRodLength(8);
    setError('');
    onReset?.();
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'greedy':
        return 'greedy-gradient';
      case 'dp':
        return 'dp-gradient';
      default:
        return 'hero-gradient';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('input-panel space-y-4', className)}
    >
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        Input Parameters
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Price Array
          </label>
          <textarea
            value={pricesInput}
            onChange={(e) => setPricesInput(e.target.value)}
            placeholder="Enter prices separated by commas (e.g., 2, 5, 7, 8)"
            className="w-full h-24 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Price[i] = price for rod of length (i+1)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Rod Length (n)
          </label>
          <input
            type="number"
            value={rodLength}
            onChange={(e) => setRodLength(parseInt(e.target.value) || 0)}
            min={1}
            max={50}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
          />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className={cn('flex-1 text-white font-semibold', getButtonVariant())}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Algorithm'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="px-4"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
