# Sentiment Analysis Core Engine

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

def train_model():
    # 1. Load Data
    data = pd.read_csv('data/synthetic_tweets.csv')
    
    # 2. Preprocess & Vectorize
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(data['text'])
    y = data['sentiment']
    
    # 3. Train
    model = LogisticRegression()
    model.fit(X, y)
    
    # 4. Save Artifacts
    joblib.dump(model, 'models/sentiment_classifier.pkl')
    joblib.dump(vectorizer, 'models/vectorizer.pkl')
    print("Model trained and artifacts saved to /models")

if __name__ == "__main__":
    train_model()
