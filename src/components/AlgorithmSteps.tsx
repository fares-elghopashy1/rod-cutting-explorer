import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlgorithmStep } from '@/lib/algorithms';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

interface AlgorithmStepsProps {
  steps: AlgorithmStep[];
  variant: 'greedy' | 'dp';
  onStepChange?: (step: number) => void;
  className?: string;
}

export function AlgorithmSteps({
  steps,
  variant,
  onStepChange,
  className,
}: AlgorithmStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          onStepChange?.(next);
          return next;
        });
      }, 1000);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, onStepChange]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => {
        const next = prev + 1;
        onStepChange?.(next);
        return next;
      });
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    onStepChange?.(0);
  };

  const step = steps[currentStep];
  const isDP = variant === 'dp';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('space-y-4', className)}
    >
      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePlay}
          size="sm"
          className={cn(
            'text-white',
            isDP ? 'dp-gradient' : 'greedy-gradient'
          )}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 mr-1" />
          ) : (
            <Play className="w-4 h-4 mr-1" />
          )}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button
          onClick={handleNext}
          size="sm"
          variant="outline"
          disabled={currentStep >= steps.length - 1}
        >
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button onClick={handleReset} size="sm" variant="outline">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <span className="ml-auto text-sm text-muted-foreground">
          Step {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full', isDP ? 'dp-gradient' : 'greedy-gradient')}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Current step display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={cn(
            'p-4 rounded-lg border-l-4',
            step?.type === 'final'
              ? isDP
                ? 'bg-dp/10 border-dp'
                : 'bg-greedy/10 border-greedy'
              : step?.type === 'cut' || step?.type === 'update'
              ? 'bg-primary/10 border-primary'
              : 'bg-muted/50 border-muted-foreground'
          )}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'px-2 py-0.5 rounded text-xs font-semibold uppercase',
                step?.type === 'final'
                  ? 'bg-dp text-white'
                  : step?.type === 'cut' || step?.type === 'update'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {step?.type}
            </span>
            <p className="text-sm">{step?.description}</p>
          </div>

          {step?.currentProfit !== undefined && (
            <div className="mt-3 flex gap-4 text-sm">
              <span className="text-muted-foreground">
                Current Profit:{' '}
                <strong className={isDP ? 'text-dp' : 'text-greedy'}>
                  ${step.currentProfit}
                </strong>
              </span>
              {step.remaining !== undefined && (
                <span className="text-muted-foreground">
                  Remaining: <strong>{step.remaining}</strong>
                </span>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
