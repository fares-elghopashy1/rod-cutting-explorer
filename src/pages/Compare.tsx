import { motion } from 'framer-motion';
import { useState } from 'react';
import { Scale, Zap, GitCompare, CheckCircle, XCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { RodVisualization } from '@/components/RodVisualization';
import { ResultCard } from '@/components/ResultCard';
import { SpeedComparison } from '@/components/SpeedComparison';
import { rodCuttingGreedy, rodCuttingDP, AlgorithmResult } from '@/lib/algorithms';

export default function Compare() {
  const [greedyResult, setGreedyResult] = useState<AlgorithmResult | null>(null);
  const [dpResult, setDPResult] = useState<AlgorithmResult | null>(null);
  const [rodLength, setRodLength] = useState(8);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = (prices: number[], length: number) => {
    setIsRunning(true);
    setRodLength(length);
    
    setTimeout(() => {
      const greedy = rodCuttingGreedy(prices, length);
      const dp = rodCuttingDP(prices, length);
      setGreedyResult(greedy);
      setDPResult(dp);
      setIsRunning(false);
    }, 300);
  };

  const handleReset = () => {
    setGreedyResult(null);
    setDPResult(null);
  };

  const profitDiff = dpResult && greedyResult 
    ? dpResult.profit - greedyResult.profit 
    : 0;

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
          <div className="inline-flex p-4 rounded-2xl hero-gradient mb-4">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Algorithm Comparison
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Compare Greedy and Dynamic Programming approaches side by side
            to see the difference in results and performance.
          </p>
        </motion.div>

        {/* Input Panel - Centered */}
        <div className="max-w-xl mx-auto mb-8">
          <InputPanel
            onRun={handleRun}
            onReset={handleReset}
            variant="compare"
            isRunning={isRunning}
          />
        </div>

        {/* Results Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Greedy Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg greedy-gradient">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Greedy Algorithm</h2>
            </div>

            <div className="viz-container">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Rod Cuts</h3>
              <RodVisualization
                totalLength={rodLength}
                cuts={greedyResult?.cuts || []}
                variant="greedy"
                animated={true}
              />
            </div>

            <ResultCard result={greedyResult} variant="greedy" />
          </motion.div>

          {/* DP Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg dp-gradient">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Dynamic Programming</h2>
            </div>

            <div className="viz-container">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Rod Cuts</h3>
              <RodVisualization
                totalLength={rodLength}
                cuts={dpResult?.cuts || []}
                variant="dp"
                animated={true}
              />
            </div>

            <ResultCard result={dpResult} variant="dp" />
          </motion.div>
        </div>

        {/* Comparison Section */}
        {greedyResult && dpResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Profit Difference Banner */}
            {profitDiff > 0 && (
              <div className="p-6 rounded-xl dp-gradient text-white text-center">
                <p className="text-lg font-semibold">
                  DP outperforms Greedy by ${profitDiff}!
                </p>
                <p className="text-sm opacity-90 mt-1">
                  This demonstrates why greedy isn't always optimal.
                </p>
              </div>
            )}

            {profitDiff === 0 && (
              <div className="p-6 rounded-xl bg-muted text-center">
                <p className="text-lg font-semibold">
                  Both algorithms found the same profit!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  For this input, greedy happened to find the optimal solution.
                </p>
              </div>
            )}

            {/* Speed Comparison */}
            <SpeedComparison
              greedyResult={greedyResult}
              dpResult={dpResult}
            />

            {/* Complexity Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Theoretical Complexity</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4">
                        <span className="flex items-center justify-center gap-2">
                          <Zap className="w-4 h-4 text-greedy" />
                          Greedy
                        </span>
                      </th>
                      <th className="text-center py-3 px-4">
                        <span className="flex items-center justify-center gap-2">
                          <GitCompare className="w-4 h-4 text-dp" />
                          DP
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Time Complexity</td>
                      <td className="py-3 px-4 text-center font-mono">O(n log n) or O(n²)</td>
                      <td className="py-3 px-4 text-center font-mono">O(n²)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Space Complexity</td>
                      <td className="py-3 px-4 text-center font-mono">O(1) or O(n)</td>
                      <td className="py-3 px-4 text-center font-mono">O(n)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Optimal Solution</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Not guaranteed
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-dp">
                          <CheckCircle className="w-4 h-4" />
                          Always optimal
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">Key Takeaway</h4>
                <p className="text-sm text-muted-foreground">
                  While greedy algorithms are often faster and simpler, they can miss the optimal solution.
                  Dynamic Programming guarantees optimality by systematically exploring all possibilities,
                  making it the preferred choice when correctness is essential.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
