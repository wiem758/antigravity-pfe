# Gemini 3.5 Integration Setup Guide

## ✅ What's Connected

Your project now integrates **Google Gemini 3.5 Flash** for AI-powered chat and financial transaction analysis.

### Components Added:

1. **`api/services/gemini_service.py`** - Dedicated Gemini service layer
2. **Updated `api/routes/chat.py`** - Uses new service abstraction
3. **Updated `requirements.txt`** - New `google-genai==0.4.1` SDK

---

## 🔑 Configuration

### 1. Ensure Your `.env` File Has:

```env
GOOGLE_API_KEY=AQ.Ab8RN6LJA7H_URsEmdzGLfkPaR--WhA2lZuthLDSJeasOR8EBg
GEMINI_MODEL=gemini-3.5-flash
MCP_SERVER_URL=http://localhost:8001
MCP_API_KEY=dev-secret-key
```

### 2. Install Updated Dependencies:

```bash
pip install -r requirements.txt
```

---

## 🚀 How It Works

### Chat Flow:

```
User Message
    ↓
api/routes/chat.py (/chat endpoint)
    ↓
api/services/gemini_service.py (call_gemini)
    ↓
Google Gemini 3.5 Flash
    ↓
JSON Response (structured transaction data)
    ↓
MCP Server (/tools/transactions/*)
    ↓
Response to User
```

### Supported Actions:

- **`create_debit`** - Record expense/payment
- **`create_credit`** - Record income/receipt
- **`create_transfert`** - Move money between caisses
- **`list_transactions`** - Show transaction history
- **`get_caisses`** - Show cash balances
- **`unknown`** - General AI response

---

## 🧪 Testing the Integration

### Test in Python:

```python
from api.services.gemini_service import call_gemini

history = []
user_message = "pay supplier 500 EUR"
system_prompt = "..."

result = call_gemini(history, user_message, system_prompt)
print(result)
```

### Test via API:

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "show me all transactions",
    "session_id": "test-session-001"
  }'
```

### Start the API:

```bash
uvicorn api.main:app --reload --port 8000
```

---

## 📚 Available Gemini Models

- `gemini-3.5-flash` (Default - Fast & Efficient)
- `gemini-3.5-pro` (More capable)
- `gemini-2.0-flash` (Latest)
- `gemini-2.0-pro` (Premium)

Change in `.env`:

```env
GEMINI_MODEL=gemini-3.5-pro
```

---

## 🔄 Features

✅ **Multi-language Support** - French, Arabic, Tunisian dialect, English
✅ **Auto-Detection** - Automatically detects transaction type from context
✅ **Conversation Memory** - Keeps last 6 messages for context
✅ **JSON Parsing** - Handles markdown-formatted JSON responses
✅ **Error Handling** - Graceful error messages in user's language
✅ **Session Management** - Per-user conversation history

---

## 🛠 Architecture

```
api/
├── main.py                 # FastAPI app entry point
├── routes/
│   ├── chat.py            # Chat endpoint (updated)
│   └── sessions.py        # Session management
└── services/              # NEW
    ├── __init__.py
    └── gemini_service.py  # Gemini 3.5 integration (NEW)
```

---

## 📖 Examples

### Example 1: Debit in Arabic
```json
{
  "message": "خلّص لمورد باريس 500 يورو",
  "session_id": "user-123"
}
```
**Response**: Debit created, EUR cash box, supplier payment

### Example 2: Credit in French
```json
{
  "message": "client Dupont a payé 2000 dinars",
  "session_id": "user-123"
}
```
**Response**: Credit recorded, TND cash box

### Example 3: List Transactions
```json
{
  "message": "show me all transactions",
  "session_id": "user-123"
}
```
**Response**: Last 5 transactions

---

## ⚠️ Important Notes

- Your `GOOGLE_API_KEY` is required in `.env`
- Gemini API calls incur costs (~0.075/1M tokens for 3.5-flash)
- Default temperature is 0.1 (low creativity for consistent JSON)
- Conversation history limited to 6 messages for cost efficiency
- MCP server must be running on port 8001 for transactions to work

---

## 🔗 Links

- [Google Genai Python SDK](https://github.com/google-gemini/python-genai)
- [Gemini API Docs](https://ai.google.dev/)
- [Your Project API](http://localhost:8000/docs)

---

## ✨ Next Steps

1. ✅ Configure `.env` with your API key
2. ✅ Run `pip install -r requirements.txt`
3. ✅ Start MCP server: `python mcp_server/app.py`
4. ✅ Start API: `uvicorn api.main:app --reload`
5. ✅ Test at `http://localhost:4200`

---

**Connected and Ready!** 🚀
