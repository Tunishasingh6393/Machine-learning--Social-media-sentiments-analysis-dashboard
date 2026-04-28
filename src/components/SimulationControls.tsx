import { useState } from "react";
import { Search, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { aiService } from "../services/aiService";
import { SocialPost } from "../types";

interface SimulationControlsProps {
  onDataGenerated: (posts: SocialPost[]) => void;
  onAnalyze: (text: string) => Promise<void>;
}

export function SimulationControls({ onDataGenerated, onAnalyze }: SimulationControlsProps) {
  const [keyword, setKeyword] = useState("AI Technology");
  const [singleText, setSingleText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const posts = await aiService.generateMockPosts(keyword);
      onDataGenerated(posts);
    } catch (err) {
      setError("Failed to generate simulation data. Check API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!singleText.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      await onAnalyze(singleText);
      setSingleText("");
    } catch (err) {
      setError("Sentiment analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Generator */}
      <div className="p-6 bg-[#0c0c0e] text-white rounded-xl border border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-zinc-100">
            Social Data Simulator
          </h2>
        </div>
        <p className="text-[10px] text-zinc-500 mb-6 font-mono leading-relaxed">
          BASELINE_MODEL: NLP-CORE-V3<br/>
          STATUS: READY_ FOR_GITHUB_PUSH
        </p>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input 
              type="text" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Keyword (e.g. Swiggy)"
              className="w-full bg-black border-zinc-800 border rounded-lg pl-10 pr-4 py-2.5 text-xs text-zinc-300 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-indigo-500 disabled:opacity-50 transition-colors flex items-center gap-2 justify-center"
          >
            {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "EXECUTE_SIMULATION"}
          </button>
        </div>
      </div>

      {/* Real-time Input */}
      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
          <h2 className="text-[11px] font-bold uppercase tracking-wider font-mono text-zinc-400">
            Live Labelling
          </h2>
        </div>
        <textarea 
          value={singleText}
          onChange={(e) => setSingleText(e.target.value)}
          placeholder="Paste sample tweet..."
          className="w-full bg-black/40 border border-zinc-800 rounded-lg p-4 text-[11px] min-h-[120px] mb-4 text-zinc-300 focus:border-indigo-500 transition-all outline-none resize-none font-mono"
        />
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !singleText.trim()}
          className="w-full bg-white text-black py-2.5 rounded-lg text-xs font-bold hover:bg-zinc-200 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "PROBABILITY_TEST"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20 text-[10px] font-mono uppercase italic">
          ERR_MODEL: {error}
        </div>
      )}
    </div>
  );
}
