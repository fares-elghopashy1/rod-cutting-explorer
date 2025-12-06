import { motion } from 'framer-motion';
import { useState } from 'react';
import { GitCompare, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { CodeBlock } from '@/components/CodeBlock';
import { InputPanel } from '@/components/InputPanel';
import { RodVisualization } from '@/components/RodVisualization';
import { DPTableVisualization } from '@/components/DPTableVisualization';
import { ResultCard } from '@/components/ResultCard';
import { AlgorithmSteps } from '@/components/AlgorithmSteps';
import { rodCuttingDP, AlgorithmResult, DPStep } from '@/lib/algorithms';

const DP_CODE = `def rod_cutting_dp(prices, n):
    dp = [0] * (n + 1)
    solution = [[] for _ in range(n + 1)]
    for length in range(1, n + 1):
        max_profit = 0
        best_cut = []
        for cut in range(1, length + 1):
            price = prices[cut - 1] if cut - 1 < len(prices) else 0
            profit = price + dp[length - cut]
            if profit > max_profit:
                max_profit = profit
                best_cut = [cut] + solution[length - cut]
        dp[length] = max_profit
        solution[length] = best_cut
    return dp[n], solution[n]`;

export default function DP() {
  const [result, setResult] = useState<AlgorithmResult | null>(null);
  const [rodLength, setRodLength] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleRun = (prices: number[], length: number) => {
    setIsRunning(true);
    setRodLength(length);
    
    setTimeout(() => {
      const dpResult = rodCuttingDP(prices, length);
      setResult(dpResult);
      setCurrentStepIndex(0);
      setIsRunning(false);
    }, 300);
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStepIndex(0);
  };

  const getCurrentStep = (): DPStep | null => {
    if (!result?.steps || result.steps.length === 0) return null;
    return result.steps[currentStepIndex] as DPStep;
  };

  const currentStep = getCurrentStep();

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
          <div className="inline-flex p-4 rounded-2xl dp-gradient mb-4">
            <GitCompare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Dynamic Programming
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The optimal approach that considers all possibilities
            and guarantees the maximum profit.
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
                <CheckCircle className="w-5 h-5 text-dp" />
                How DP Works
              </h2>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Build solution from length 1 to n</li>
                <li>For each length, try all possible first cuts</li>
                <li>Combine with optimal solution for remainder</li>
                <li>Store the best result for each length</li>
              </ol>
              <div className="mt-4 p-3 rounded-lg bg-dp/10 text-sm">
                <strong className="text-dp">✓ Guaranteed:</strong>
                <span className="text-muted-foreground ml-1">
                  Always finds the optimal solution!
                </span>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-muted/30">
                <p className="text-xs font-mono text-muted-foreground">
                  dp[n] = max(price[i] + dp[n-i])<br />
                  for i = 1 to n
                </p>
              </div>
            </motion.div>

            {/* Input Panel */}
            <InputPanel
              onRun={handleRun}
              onReset={handleReset}
              variant="dp"
              isRunning={isRunning}
            />

            {/* Code Block */}
            <CodeBlock
              code={DP_CODE}
              title="Python Implementation"
              language="python"
            />
          </div>

          {/* Right Column - Visualization & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* DP Table Visualization */}
            {currentStep?.dpTable && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="viz-container"
              >
                <h2 className="text-lg font-semibold mb-4">DP Table</h2>
                <DPTableVisualization
                  dpTable={currentStep.dpTable}
                  highlightIndex={currentStep.highlightIndex}
                  animated={true}
                />
              </motion.div>
            )}

            {/* Rod Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="viz-container"
            >
              <h2 className="text-lg font-semibold mb-4">Rod Visualization</h2>
              <RodVisualization
                totalLength={rodLength}
                cuts={result?.cuts || []}
                variant="dp"
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
                  variant="dp"
                  onStepChange={setCurrentStepIndex}
                />
              </motion.div>
            )}

            {/* Result Card */}
            <ResultCard result={result} variant="dp" />
          </div>
        </div>
      </main>
    </div>
  );
}
