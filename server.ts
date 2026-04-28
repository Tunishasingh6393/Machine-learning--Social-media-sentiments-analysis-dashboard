import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock API for social media data (Industry imitation)
  app.get("/api/social-data", (req, res) => {
    // In a real app, this would fetch from Twitter/YouTube APIs
    const mockData = [
      {
        id: "1",
        platform: "twitter",
        author: "@tech_guru",
        content: "Just tried the new AI studio. The speed is absolutely incredible! #AI #Innovation",
        timestamp: new Date().toISOString(),
        sentiment: "positive",
        confidence: 0.98
      },
      {
        id: "2",
        platform: "twitter",
        author: "@angry_user",
        content: "Still waiting for my order to be shipped. Their customer service is terrible and unresponsive. Avoid!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        sentiment: "negative",
        confidence: 0.95
      },
      {
        id: "3",
        platform: "youtube",
        author: "GamingChannel",
        content: "The graphics are okay, but the gameplay feels a bit repetitive after a while. Might wait for a sale.",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        sentiment: "neutral",
        confidence: 0.85
      }
    ];
    res.json(mockData);
  });

  // Proxy for Gemini API would go here if needed server-side, 
  // but we'll follow the skill instruction to call it from frontend.

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
