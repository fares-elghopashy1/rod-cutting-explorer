import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, GitCompare, Lightbulb, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { RodVisualization } from '@/components/RodVisualization';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Theory() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
            <Lightbulb className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Understanding the <span className="gradient-text">Rod Cutting Problem</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A classic optimization problem in computer science that demonstrates
            the power of dynamic programming over greedy approaches.
          </p>
        </motion.div>

        {/* What is Rod Cutting */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            What is the Rod Cutting Problem?
          </h2>
          <p className="text-muted-foreground mb-6">
            Given a rod of length <strong>n</strong> units and a table of prices for different lengths,
            determine the maximum revenue obtainable by cutting up the rod and selling the pieces.
          </p>
          
          <div className="bg-muted/30 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3">Example Price Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-4">Length</th>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <th key={i} className="text-center py-2 px-3">{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 font-medium">Price ($)</td>
                    {[2, 5, 7, 8, 10, 17, 17, 20].map((p, i) => (
                      <td key={i} className="text-center py-2 px-3 font-mono">{p}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Visual Representation</h3>
            <p className="text-sm text-muted-foreground mb-3">
              A rod of length 8 can be cut in many different ways:
            </p>
            <RodVisualization totalLength={8} cuts={[2, 2, 2, 2]} variant="neutral" />
            <p className="text-xs text-muted-foreground mt-2">
              Example: Cutting into 4 pieces of length 2 gives: $5 × 4 = $20
            </p>
          </div>
        </motion.section>

        {/* Why Greedy Fails */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-8 border-l-4 border-l-greedy"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-greedy" />
            Why Greedy Sometimes Fails
          </h2>
          
          <p className="text-muted-foreground mb-6">
            The greedy approach picks cuts based on the <strong>best price-per-unit-length ratio</strong>.
            While intuitive, this doesn't always lead to the optimal solution.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 rounded-xl bg-greedy/10">
              <h4 className="font-semibold text-greedy mb-2">Greedy Logic</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Calculate price/length for each piece</li>
                <li>Sort by ratio (highest first)</li>
                <li>Greedily pick highest ratio pieces</li>
                <li>Fill remaining length</li>
              </ol>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10">
              <h4 className="font-semibold text-destructive mb-2">The Problem</h4>
              <p className="text-sm text-muted-foreground">
                A piece with lower ratio might combine with another piece
                to give a higher total value than the "optimal" local choice.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30">
            <h4 className="font-semibold mb-2">Counter-Example</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Consider prices: [2, 5, 7, 8] for lengths 1-4, with rod length 4:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Greedy (best ratio = length 2):</p>
                <RodVisualization totalLength={4} cuts={[2, 2]} variant="greedy" animated={false} />
                <p className="text-sm font-mono mt-2">Profit: $5 + $5 = <strong>$10</strong></p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Optimal (length 1 + 3):</p>
                <RodVisualization totalLength={4} cuts={[1, 3]} variant="dp" animated={false} />
                <p className="text-sm font-mono mt-2">Profit: $2 + $7 = <strong>$9</strong>... wait!</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              In this case greedy works! But with different prices, it often fails.
            </p>
          </div>
        </motion.section>

        {/* Why DP Works */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 mb-8 border-l-4 border-l-dp"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-dp" />
            Why Dynamic Programming Guarantees Optimality
          </h2>

          <p className="text-muted-foreground mb-6">
            Dynamic Programming considers <strong>ALL possible combinations</strong> of cuts
            and builds up the solution systematically, guaranteeing the optimal result.
          </p>

          <div className="p-6 rounded-xl bg-dp/10 mb-6">
            <h4 className="font-semibold text-dp mb-3">The Recurrence Relation</h4>
            <div className="bg-background/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <p>dp[n] = max(price[i] + dp[n - i]) for i = 1 to n</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              For each length n, we try every possible first cut (1 to n) and combine it
              with the optimal solution for the remaining length.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              <div className="text-3xl font-bold text-dp mb-1">O(n²)</div>
              <p className="text-sm text-muted-foreground">Time Complexity</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              <div className="text-3xl font-bold text-dp mb-1">O(n)</div>
              <p className="text-sm text-muted-foreground">Space Complexity</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 text-center">
              <div className="text-3xl font-bold text-dp mb-1">100%</div>
              <p className="text-sm text-muted-foreground">Optimal Guarantee</p>
            </div>
          </div>
        </motion.section>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Link to="/greedy" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full p-6 rounded-xl greedy-gradient text-white text-center"
            >
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Explore Greedy</h3>
              <p className="text-sm opacity-90">See the algorithm in action</p>
              <ArrowRight className="w-5 h-5 mx-auto mt-3" />
            </motion.div>
          </Link>

          <Link to="/dp" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full p-6 rounded-xl dp-gradient text-white text-center"
            >
              <GitCompare className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Explore DP</h3>
              <p className="text-sm opacity-90">Watch optimal building</p>
              <ArrowRight className="w-5 h-5 mx-auto mt-3" />
            </motion.div>
          </Link>

          <Link to="/compare" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full p-6 rounded-xl hero-gradient text-white text-center"
            >
              <Target className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Compare Both</h3>
              <p className="text-sm opacity-90">Side-by-side analysis</p>
              <ArrowRight className="w-5 h-5 mx-auto mt-3" />
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
