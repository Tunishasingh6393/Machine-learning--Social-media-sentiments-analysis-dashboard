import { SocialPost } from "../types";
import { cn } from "../lib/utils";
import { ExternalLink, Twitter, Youtube, User } from "lucide-react";

interface PostListProps {
  posts: SocialPost[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-black/20">
        <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] font-mono">
          Live Activity Feed
        </h3>
        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono uppercase">
          {posts.length} entries active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/10 border-b border-zinc-800/50">
              <th className="p-4 text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">Plat</th>
              <th className="p-4 text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">Source</th>
              <th className="p-4 text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">Inference Output</th>
              <th className="p-4 text-[10px] font-mono text-zinc-600 uppercase tracking-tighter text-right">Label</th>
              <th className="p-4 text-[10px] font-mono text-zinc-600 uppercase tracking-tighter text-right">Conf %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {posts.map((post) => (
              <tr 
                key={post.id} 
                className="hover:bg-indigo-500/5 transition-colors cursor-default"
              >
                <td className="p-4">
                  {post.platform === 'twitter' ? (
                    <Twitter className="w-3.5 h-3.5 text-sky-500/80" />
                  ) : (
                    <Youtube className="w-3.5 h-3.5 text-red-500/80" />
                  )}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-zinc-500" />
                    <span className="text-[11px] font-medium font-mono text-zinc-300">{post.author}</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-[11px] text-zinc-400 line-clamp-1 italic max-w-sm">
                    "{post.content}"
                  </p>
                </td>
                <td className="p-4 text-right">
                  <span className={cn(
                    "text-[9px] px-2 py-1 rounded font-bold uppercase tracking-tight",
                    post.sentiment === 'positive' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                    post.sentiment === 'negative' && "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                    post.sentiment === 'neutral' && "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                  )}>
                    {post.sentiment}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-[10px] text-zinc-500">
                  {(post.confidence * 100).toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
