import { useState, useEffect, useMemo } from "react";
import { LayoutDashboard, MessageSquare, Database, Github, FileText, Info, Sparkles } from "lucide-react";
import { StatsCards } from "./components/StatsCards";
import { Charts } from "./components/Charts";
import { PostList } from "./components/PostList";
import { SimulationControls } from "./components/SimulationControls";
import { SocialPost, SentimentCounts } from "./types";
import { aiService } from "./services/aiService";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide'>('dashboard');

  // Load initial mock from API
  useEffect(() => {
    fetch('/api/social-data')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  const stats = useMemo(() => {
    const counts: SentimentCounts = { positive: 0, negative: 0, neutral: 0 };
    let totalConfidence = 0;
    
    posts.forEach(post => {
      counts[post.sentiment]++;
      totalConfidence += post.confidence;
    });

    return {
      total: posts.length,
      counts,
      avgConfidence: posts.length > 0 ? totalConfidence / posts.length : 0
    };
  }, [posts]);

  const handleDataGenerated = (newPosts: SocialPost[]) => {
    setPosts(prev => [...newPosts, ...prev]);
  };

  const handleAnalyze = async (text: string) => {
    const result = await aiService.analyzeSentiment(text);
    const newPost: SocialPost = {
      id: Math.random().toString(36).substr(2, 9),
      platform: 'twitter',
      author: 'Live User',
      content: text,
      timestamp: new Date().toISOString(),
      sentiment: result.sentiment,
      confidence: result.confidence
    };
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-300 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c0c0e] p-6 flex flex-col gap-8 hidden lg:flex border-r border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">S</div>
          <h1 className="text-lg font-semibold tracking-tight text-white leading-none">
            Sentiment<span className="text-indigo-400">Scope</span>
            <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 mt-1">Industrial Edition</div>
          </h1>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <SidebarLink 
            icon={LayoutDashboard} 
            label="Real-time Stream" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarLink 
            icon={Info} 
            label="Student Guide" 
            active={activeTab === 'guide'} 
            onClick={() => setActiveTab('guide')} 
          />
          
          <div className="mt-12 mb-2 px-4 text-[9px] uppercase tracking-widest font-bold text-zinc-600">Infrastructure</div>
          <div className="px-5 py-4 bg-black/40 border border-zinc-800 rounded-xl font-mono text-[10px] space-y-1.5 overflow-hidden">
            <div className="text-zinc-700 font-bold">PROJECT_ROOT/</div>
            <div className="ml-3 text-zinc-500">├─ data/ <span className="text-zinc-700"># simulated</span></div>
            <div className="ml-3 text-zinc-500">├─ src/ <span className="text-zinc-700"># NLP core</span></div>
            <div className="ml-3 text-white">└─ model.py</div>
          </div>
        </nav>

        <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-xl p-4">
          <div className="text-indigo-400 text-[10px] uppercase font-bold flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3" />
            Industry Note
          </div>
          <p className="text-[10px] text-zinc-600 leading-snug italic">
            Models customer experience flows used by Fortune 500 teams.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-zinc-800/50 bg-[#0c0c0e] flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
            <span className={activeTab === 'dashboard' ? 'text-indigo-400 border-b border-indigo-400 pb-1' : 'text-zinc-500'}>Analytics</span>
            <span className="text-zinc-500">Data Sources</span>
            <span className="text-zinc-500">Model Tuning</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-2 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> 
              REMOTE_SERVER: ACTIVE
            </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <StatsCards counts={stats.counts} total={stats.total} avgConfidence={stats.avgConfidence} />
                
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  <div className="xl:col-span-8 space-y-8">
                    <Charts counts={stats.counts} />
                    <PostList posts={posts} />
                  </div>
                  <div className="xl:col-span-4 space-y-8">
                    <SimulationControls onDataGenerated={handleDataGenerated} onAnalyze={handleAnalyze} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="guide"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-none bg-[#0c0c0e] p-12 rounded-2xl border border-zinc-800"
              >
                <ProjectGuide />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-xs font-semibold
        ${active ? 'bg-indigo-600/10 text-white border border-indigo-500/20' : 'text-zinc-500 hover:text-zinc-300'}
      `}
    >
      <Icon className={`w-3.5 h-3.5 ${active ? 'text-indigo-400' : ''}`} />
      <span className={active ? 'tracking-tight' : 'tracking-wide'}>{label}</span>
    </button>
  );
}

function ProjectGuide() {
  return (
    <div className="space-y-12 text-zinc-400 font-sans">
      <section>
        <div className="flex items-center gap-4 mb-4">
          <div className="px-3 py-1 bg-indigo-600/20 text-indigo-400 text-[10px] font-bold uppercase rounded border border-indigo-500/30 tracking-[0.2em]">Documentation</div>
        </div>
        <h2 className="text-4xl font-light text-white tracking-tight mb-6">Industrial Proof-of-Work Guide</h2>
        <p className="text-lg leading-relaxed text-zinc-500 max-w-3xl">
          This project serves as a cornerstone for student portfolios. It moves beyond theoretical ML by providing 
          a tangible, visual bridge between raw code and business value.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" /> Commercial Relevance
          </h3>
          <p className="text-sm leading-relaxed text-zinc-500">
            For apps like <span className="text-zinc-300">Swiggy</span> or <span className="text-zinc-300">Zomato</span>, 
            instant feedback loop means higher retention. This dashboard mimics the 'Command Center' views used by their ops teams.
          </p>
        </div>
        <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" /> Technical Edge
          </h3>
          <p className="text-sm leading-relaxed text-zinc-500">
            Showcase how you traded simple <span className="italic">NLTK</span> for <span className="text-zinc-300">Large Language Models</span>. 
            Gemini allows for semantic depth (understanding sarcasm) which legacy libraries often miss.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-widest font-mono italic">Implementation Pillars</h3>
        <div className="grid grid-cols-1 gap-4 font-mono">
          {[
            { t: "Simulation Layer", d: "Synthetic social data generation for testing in isolated environments." },
            { t: "Classification Engine", d: "LLM-driven inference providing sentiment polarity and confidence logs." },
            { t: "BI Dashboard", d: "Reactive state visualization turning metrics into strategic charts." }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-6 bg-black/40 rounded-xl border border-zinc-800/50 group hover:border-indigo-500/50 transition-colors">
              <span className="text-indigo-500 font-bold opacity-30 select-none">0{i+1}</span>
              <div>
                <p className="font-bold text-white uppercase text-xs tracking-widest mb-1">{item.t}</p>
                <p className="text-[11px] text-zinc-600">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="p-8 bg-indigo-600/5 border border-indigo-600/20 rounded-2xl">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">The Placement Pitch</h3>
        <p className="text-sm italic text-zinc-500 leading-relaxed">
          "When asked about the project scope, highlight that you didn't just build a model; you architected 
          an end-to-end data pipeline. Mention that the UI focuses on 'Actionable Intelligence'—not just raw scores, 
          but visual distributions that stakeholders can use for decision making."
        </p>
      </div>
    </div>
  );
}
