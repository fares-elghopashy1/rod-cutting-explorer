import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, AlertTriangle } from 'lucide-react';
import { Header } from '@/components/Header';
import { CodeBlock } from '@/components/CodeBlock';
import { InputPanel } from '@/components/InputPanel';
import { RodVisualization } from '@/components/RodVisualization';
import { ResultCard } from '@/components/ResultCard';
import { AlgorithmSteps } from '@/components/AlgorithmSteps';
import { rodCuttingGreedy, AlgorithmResult } from '@/lib/algorithms';

const GREEDY_CODE = `def rod_cutting_greedy(prices, n):
    ratio = sorted(
        ((prices[i] / (i + 1), i + 1) for i in range(len(prices))),
        reverse=True
    )
    remaining = n
    total_profit = 0
    cuts = []
    for unit, length in ratio:
        while remaining >= length:
            remaining -= length
            total_profit += prices[length - 1]
            cuts.append(length)
    return total_profit, cuts`;

export default function Greedy() {
  const [result, setResult] = useState<AlgorithmResult | null>(null);
  const [rodLength, setRodLength] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleRun = (prices: number[], length: number) => {
    setIsRunning(true);
    setRodLength(length);
    
    // Small delay for visual feedback
    setTimeout(() => {
      const greedyResult = rodCuttingGreedy(prices, length);
      setResult(greedyResult);
      setCurrentStepIndex(0);
      setIsRunning(false);
    }, 300);
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStepIndex(0);
  };

  const getCurrentCuts = () => {
    if (!result?.steps || result.steps.length === 0) return [];
    const step = result.steps[currentStepIndex];
    return step?.currentCuts || [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl greedy-gradient mb-4">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Greedy Algorithm
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A fast heuristic approach that makes locally optimal choices.
            Not always globally optimal for rod cutting.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Theory & Code */}
          <div className="lg:col-span-1 space-y-6">
            {/* Theory Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-greedy" />
                How Greedy Works
              </h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Calculate price/length ratio for each piece size</li>
                <li>Sort pieces by ratio (highest to lowest)</li>
                <li>Repeatedly pick the best ratio piece that fits</li>
                <li>Continue until no more pieces fit</li>
              </ol>
              <div className="mt-4 p-3 rounded-lg bg-greedy/10 text-sm">
                <strong className="text-greedy">⚠️ Note:</strong>
                <span className="text-muted-foreground ml-1">
                  Greedy may not find the optimal solution!
                </span>
              </div>
            </motion.div>

            {/* Input Panel */}
            <InputPanel
              onRun={handleRun}
              onReset={handleReset}
              variant="greedy"
              isRunning={isRunning}
            />

            {/* Code Block */}
            <CodeBlock
              code={GREEDY_CODE}
              title="Python Implementation"
              language="python"
            />
          </div>

          {/* Right Column - Visualization & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visualization Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="viz-container"
            >
              <h2 className="text-lg font-semibold mb-4">Rod Visualization</h2>
              <RodVisualization
                totalLength={rodLength}
                cuts={getCurrentCuts()}
                variant="greedy"
                animated={true}
              />
            </motion.div>

            {/* Algorithm Steps */}
            {result?.steps && result.steps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Step-by-Step Execution</h2>
                <AlgorithmSteps
                  steps={result.steps}
                  variant="greedy"
                  onStepChange={setCurrentStepIndex}
                />
              </motion.div>
            )}

            {/* Result Card */}
            <ResultCard result={result} variant="greedy" />
          </div>
        </div>
      </main>
    </div>
  );
}
