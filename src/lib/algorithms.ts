export interface AlgorithmResult {
  profit: number;
  cuts: number[];
  executionTime: number;
  steps?: AlgorithmStep[];
}

export interface AlgorithmStep {
  type: 'compare' | 'cut' | 'update' | 'final';
  description: string;
  currentProfit?: number;
  currentCuts?: number[];
  remaining?: number;
  dpTable?: number[];
  highlightIndex?: number;
}

export interface GreedyStep extends AlgorithmStep {
  ratio?: { value: number; length: number }[];
  currentRatioIndex?: number;
}

export interface DPStep extends AlgorithmStep {
  currentLength?: number;
  currentCut?: number;
  comparing?: { cut: number; profit: number };
}

export function rodCuttingGreedy(prices: number[], n: number): AlgorithmResult {
  const startTime = performance.now();
  const steps: GreedyStep[] = [];

  // Calculate price/length ratios
  const ratios = prices.map((price, i) => ({
    value: price / (i + 1),
    length: i + 1,
    price: price
  }));

  // Sort by ratio (highest first)
  ratios.sort((a, b) => b.value - a.value);

  steps.push({
    type: 'compare',
    description: `Calculated price/length ratios and sorted by value. Best ratio: ${ratios[0].value.toFixed(2)} for length ${ratios[0].length}`,
    ratio: ratios.map(r => ({ value: r.value, length: r.length })),
  });

  let remaining = n;
  let totalProfit = 0;
  const cuts: number[] = [];

  for (let i = 0; i < ratios.length && remaining > 0; i++) {
    const { length, price } = ratios[i];
    
    while (remaining >= length) {
      remaining -= length;
      totalProfit += price;
      cuts.push(length);

      steps.push({
        type: 'cut',
        description: `Cut piece of length ${length} (price: $${price}). Remaining: ${remaining}`,
        currentProfit: totalProfit,
        currentCuts: [...cuts],
        remaining,
        currentRatioIndex: i,
      });
    }
  }

  steps.push({
    type: 'final',
    description: `Greedy algorithm complete. Total profit: $${totalProfit}`,
    currentProfit: totalProfit,
    currentCuts: cuts,
  });

  const executionTime = performance.now() - startTime;

  return {
    profit: totalProfit,
    cuts,
    executionTime,
    steps,
  };
}

export function rodCuttingDP(prices: number[], n: number): AlgorithmResult {
  const startTime = performance.now();
  const steps: DPStep[] = [];

  const dp: number[] = new Array(n + 1).fill(0);
  const solution: number[][] = Array.from({ length: n + 1 }, () => []);

  steps.push({
    type: 'compare',
    description: 'Initialized DP table with zeros',
    dpTable: [...dp],
  });

  for (let length = 1; length <= n; length++) {
    let maxProfit = 0;
    let bestCut: number[] = [];

    for (let cut = 1; cut <= length; cut++) {
      const price = cut - 1 < prices.length ? prices[cut - 1] : 0;
      const profit = price + dp[length - cut];

      steps.push({
        type: 'compare',
        description: `Length ${length}: Trying cut of ${cut}. Price: $${price} + Previous: $${dp[length - cut]} = $${profit}`,
        dpTable: [...dp],
        currentLength: length,
        currentCut: cut,
        comparing: { cut, profit },
        highlightIndex: length,
      });

      if (profit > maxProfit) {
        maxProfit = profit;
        bestCut = [cut, ...solution[length - cut]];
      }
    }

    dp[length] = maxProfit;
    solution[length] = bestCut;

    steps.push({
      type: 'update',
      description: `Length ${length}: Best profit is $${maxProfit} with cuts [${bestCut.join(', ')}]`,
      dpTable: [...dp],
      currentLength: length,
      highlightIndex: length,
    });
  }

  steps.push({
    type: 'final',
    description: `DP algorithm complete. Optimal profit: $${dp[n]}`,
    dpTable: [...dp],
    currentProfit: dp[n],
    currentCuts: solution[n],
  });

  const executionTime = performance.now() - startTime;

  return {
    profit: dp[n],
    cuts: solution[n],
    executionTime,
    steps,
  };
}
