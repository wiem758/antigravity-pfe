# api/services/gemini_service.py
# Service layer for Gemini 3.5 integration

import os
import json
import re
from dotenv import load_dotenv
import httpx

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


def call_gemini(history: list, user_message: str, system_prompt: str) -> dict:
    """
    Calls Gemini 3.5 via REST API and returns the parsed JSON response.
    
    Args:
        history: List of previous messages with role and content
        user_message: Current user message
        system_prompt: System instructions for the model
        
    Returns:
        Parsed JSON response from Gemini
    """
    try:
        # Prepare conversation history
        messages = []
        for msg in history[-6:]:  # Keep last 6 messages for context
            messages.append({
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [{"text": msg["content"]}]
            })
        
        # Add current message
        messages.append({
            "role": "user",
            "parts": [{"text": user_message}]
        })
        
        # Build request payload for REST API
        payload = {
            "system_instruction": {"parts": [{"text": system_prompt}]},
            "contents": messages,
            "generationConfig": {
                "temperature": 0.1,
                "maxOutputTokens": 1024,
            }
        }
        
        # Call Gemini REST API
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{GEMINI_MODEL}:generateContent?key={GOOGLE_API_KEY}"
        )
        
        with httpx.Client(timeout=30) as client:
            response = client.post(url, json=payload)
            response.raise_for_status()
        
        data = response.json()
        raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
        
        # Clean up markdown formatting if present
        raw_text = raw_text.strip()
        raw_text = re.sub(r'^```json\s*', '', raw_text)
        raw_text = re.sub(r'^```\s*', '', raw_text)
        raw_text = re.sub(r'\s*```$', '', raw_text)
        raw_text = raw_text.strip()
        
        return json.loads(raw_text)
        
    except json.JSONDecodeError as je:
        raise Exception(f"Gemini API error: Failed to parse JSON response: {str(je)}")
    except Exception as e:
        raise Exception(f"Gemini API error: {str(e)}")


def extract_json_from_response(text: str) -> dict:
    """Extract JSON from response text, handling markdown formatting."""
    text = text.strip()
    text = re.sub(r'^```json\s*', '', text)
    text = re.sub(r'^```\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return json.loads(text.strip())
