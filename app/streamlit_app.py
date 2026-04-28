import streamlit as st
import pandas as pd
import joblib

st.set_page_config(page_title="SentiDash", layout="wide")

st.title("📊 Social Media Sentiment Dashboard")

st.sidebar.header("Configuration")
model_path = st.sidebar.text_input("Model Path", "models/sentiment_classifier.pkl")

# Simulation of analysis
text = st.text_area("Analyze Text:")
if st.button("Predict"):
    # In a real app, load model and predict
    st.success("Predicted Sentiment: Positive (Mocked)")
