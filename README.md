
# AI Agent Supervisor 🕵️♂️

A real-time monitoring system for AI agents with human-in-the-loop feedback capabilities.


## Features ✨

- **Live Agent Activity Stream**  
  Monitor agent decisions as they happen
- **Human Feedback Injection**  
  Pause workflows to provide corrections
- **State Version History**  
  Track changes like git commits
- **Multi-Agent Coordination**  
  Visualize agent collaboration workflows
- **Production-Ready Architecture**  
  Built with Next.js 14 and LangGraph

## Tech Stack 🛠️

| Component               | Technology       | Purpose                          |
|-------------------------|------------------|----------------------------------|
| **Frontend**            | Next.js 14       | Real-time monitoring dashboard   |
| **State Management**    | Zustand          | Cross-component state sync       |
| **AI Orchestration**    | LangGraph        | Agent workflow management        |
| **Human Interface**     | CopilotKit       | Feedback UI components           |
| **Realtime Comms**      | WebSocket        | Instant state updates            |
| **Backend**             | FastAPI          | Agent supervisor API             |

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- Python 3.10+
- OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/agent-supervisor.git
   cd agent-supervisor
   ```

2. Set up backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Set up frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

Create `.env` files:

**Backend** (`backend/.env`):
```ini
OPENAI_API_KEY=your_openai_key
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```ini
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Running the System

1. Start backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

Visit `http://localhost:3000` to access the dashboard.

## Key Components 🧩

### Agent Workflow
```python
# Example LangGraph workflow
builder = StateGraph(AgentState)

builder.add_node("research", research_agent)
builder.add_node("human_feedback", human_feedback_node)
builder.add_conditional_edges(
    "write",
    lambda state: "human_feedback" if state.get('feedback') else END
)
```

### Real-Time UI
```tsx
// Live activity feed component
<AnimatePresence>
  {messages.map((msg) => (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AgentMessage message={msg} />
    </motion.div>
  ))}
</AnimatePresence>
```

## API Endpoints 📡

| Endpoint          | Method | Description                     |
|-------------------|--------|---------------------------------|
| `/api/converse`   | POST   | Initiate agent workflow         |
| `/api/feedback`   | POST   | Submit human feedback           |
| `/ws`             | WS     | Real-time updates stream        |

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Need Help?**  
Open an issue or join our [Discord community](https://discord.gg/copilotkit)

**Inspired By**  
[CopilotKit Travel Planner Tutorial](https://dev.to/copilotkit/build-an-ai-travel-planner-with-copilotkit-langgraph-google-maps-api-32fm) 
