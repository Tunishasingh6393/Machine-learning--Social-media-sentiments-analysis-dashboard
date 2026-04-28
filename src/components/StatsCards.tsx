import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { SentimentCounts } from "../types";
import { cn } from "../lib/utils";

interface StatsCardsProps {
  counts: SentimentCounts;
  total: number;
  avgConfidence: number;
}

export function StatsCards({ counts, total, avgConfidence }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Posts",
      value: total,
      icon: Target,
      color: "text-zinc-500",
      bg: "bg-zinc-50"
    },
    {
      label: "Positive",
      value: counts.positive,
      percentage: total > 0 ? (counts.positive / total) * 100 : 0,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Negative",
      value: counts.negative,
      percentage: total > 0 ? (counts.negative / total) * 100 : 0,
      icon: TrendingDown,
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      label: "Neutral",
      value: counts.neutral,
      percentage: total > 0 ? (counts.neutral / total) * 100 : 0,
      icon: Minus,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl">
        <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1 tracking-widest">Total Analyzed</p>
        <h2 className="text-3xl font-light text-white font-mono">{total.toLocaleString()}</h2>
        <p className="text-[10px] text-zinc-600 mt-2 font-mono uppercase italic tracking-tighter">Processed live Stream</p>
      </div>

      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl group hover:border-emerald-500/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Positive</p>
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-light text-white font-mono">{counts.positive}</h2>
        <div className="w-full bg-zinc-800 h-1 mt-4 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${total > 0 ? (counts.positive / total) * 100 : 0}%` }}></div>
        </div>
      </div>

      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl group hover:border-rose-500/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Negative</p>
          <TrendingDown className="w-4 h-4 text-rose-500" />
        </div>
        <h2 className="text-3xl font-light text-white font-mono">{counts.negative}</h2>
        <div className="w-full bg-zinc-800 h-1 mt-4 rounded-full overflow-hidden">
          <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${total > 0 ? (counts.negative / total) * 100 : 0}%` }}></div>
        </div>
      </div>

      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Confidence</p>
          <Target className="w-4 h-4 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-light text-indigo-400 font-mono">{(avgConfidence * 100).toFixed(1)}%</h2>
        <div className="w-full bg-zinc-800 h-1 mt-4 rounded-full overflow-hidden">
          <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${avgConfidence * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
}
