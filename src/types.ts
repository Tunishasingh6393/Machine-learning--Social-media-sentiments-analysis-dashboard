export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'youtube' | 'facebook' | 'instagram';
  author: string;
  content: string;
  timestamp: string;
  sentiment: Sentiment;
  confidence: number;
}

export interface SentimentCounts {
  positive: number;
  negative: number;
  neutral: number;
}

export interface DashboardStats {
  totalAnalyzed: number;
  sentimentCounts: SentimentCounts;
  averageConfidence: number;
  topKeywords: { word: string; count: number }[];
}
