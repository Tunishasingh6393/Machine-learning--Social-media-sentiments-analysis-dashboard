# 🧠 Project Technical Guide & Interview Prep

This document provides a deep dive into the technical decisions and potential interview questions for the **Social Media Sentiment Analysis Dashboard**.

## 1. Technical Explanation (For Interviewers)
"This project is a real-time sentiment analytics engine. While most student projects use basic NLTK or Scikit-learn with TF-IDF, I opted for an **LLM-driven architecture** using Google Gemini. This allows the system to understand **semantics and context** rather than just performing keyword matching. For example, my model can distinguish between 'The burger was sick' (positive slang) and 'I feel sick after that burger' (negative feedback)."

## 2. The Tech Stack Decisions
- **React + Tailwind:** For a responsive, "Mission Control" style UI that aligns with modern SaaS aesthetics.
- **Express Proxy:** Used to securely handle data simulation and serve as an extensible middle-ware layer for future platform integrations.
- **Recharts:** Chosen over Chart.js for its native React support and better performance with dynamic datasets.

## 3. High-Value Interview Q&A

### Q1: How do you handle sarcasm in sentiment analysis?
**A:** "Traditional bags-of-words models struggle with sarcasm because they don't see the contradiction. By using Google Gemini, the model utilizes attention mechanisms to see that 'Great, my phone died again' has a negative intent despite using the word 'Great'. In my prompt engineering, I specifically instruct the AI to check for contextual contradictions."

### Q2: How would you scale this to handle 1 million tweets per day?
**A:** "I would implement a message queue like **RabbitMQ** or **Apache Kafka** to ingest the raw tweets. This would decouple the ingestion from the processing. For the AI Part, I would use **Gemini Batch API** or a distributed serverless setup (AWS Lambda / Google Cloud Functions) to process the queue items in parallel without blocking the dashboard."

### Q3: Why did you use a simulator instead of the real Twitter API?
**A:** "The Twitter (X) API now has significant costs for developers. To make this project production-ready without a massive budget, I built a **Generative AI data simulator**. This actually allowed me to stress-test the model with specific edge cases (multi-lingual text, emojis, and specific brand slang) which is harder to do with a stochastic live stream."

### Q4: How is 'Confidence Score' calculated?
**A:** "In this implementation, the confidence score is a probability value returned by the LLM (Gemini) based on its internal logits. In a production environment, I would cross-reference this with a fallback rule-based sentiment lexicon (like VADER) to flag low-confidence predictions for human review."

## 4. GitHub Upload Strategy
To make your repo look "Star-worthy":
1. **Meaningful Commits:** Avoid `init commit`. Use `feat: implement gemini sentiment engine` or `ui: add real-time recharts dashboard`.
2. **Assets Folder:** Place screenshots and a 30-second screen recording in a `/docs/assets` folder.
3. **Tags:** Use tags like `react`, `machine-learning`, `nlp`, `sentiment-analysis`, `google-gemini`.

---

## 📈 Future Roadmap
- [ ] Multi-language support (Spanish, Hindi, French).
- [ ] Integration with YouTube Comment API.
- [ ] Exportable CSV reports for business stakeholders.
- [ ] User authentication and saved brand-watch keywords.
