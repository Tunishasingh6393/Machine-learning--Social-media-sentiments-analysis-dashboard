import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { SentimentCounts } from "../types";

interface ChartsProps {
  counts: SentimentCounts;
}

export function Charts({ counts }: ChartsProps) {
  const data = [
    { name: "Positive", value: counts.positive, color: "#10b981" },
    { name: "Negative", value: counts.negative, color: "#f43f5e" },
    { name: "Neutral", value: counts.neutral, color: "#f59e0b" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl h-[400px]">
        <h3 className="text-xs font-bold text-zinc-500 mb-6 uppercase tracking-[0.2em] font-mono">
          Sentiment Distribution
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              stroke="none"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#0c0c0e', borderRadius: '8px', border: '1px solid #27272a', color: '#fff' }}
              itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', marginTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl h-[400px]">
        <h3 className="text-xs font-bold text-zinc-500 mb-6 uppercase tracking-[0.2em] font-mono">
          Frequency Overview
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e1e21" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ background: '#0c0c0e', borderRadius: '8px', border: '1px solid #27272a', color: '#fff' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
