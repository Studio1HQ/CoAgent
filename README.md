<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/CoAgent.webp" alt="AI Agent Supervisor with CopilotKit: A dashboard for watching agent activity and sending human feedback" width="100%" />

<br />
<br />

# AI Agent Supervisor with CopilotKit

### A dashboard for watching agent activity and sending human feedback

A prototype supervisor dashboard for multi-agent workflows. A Next.js UI with CopilotKit actions streams output from a FastAPI and LangGraph backend and lets a human send feedback.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with CopilotKit](https://img.shields.io/badge/Built_with_CopilotKit-141414?style=for-the-badge)](https://copilotkit.ai)
[![Read the blog](https://img.shields.io/badge/Read_the_blog-1c1917?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/copilotkit/build-an-ai-travel-planner-with-copilotkit-langgraph-google-maps-api-32fm)

[CopilotKit docs](https://docs.copilotkit.ai) &nbsp;·&nbsp; [CopilotKit](https://copilotkit.ai) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

CoAgent is an early prototype of a supervisor dashboard for AI agents. The idea is to watch a team of agents work, and to step in with human feedback. A Next.js frontend uses [CopilotKit](https://copilotkit.ai) actions to start a task and send feedback. A FastAPI backend runs a small [LangGraph](https://www.langchain.com/langgraph) workflow and streams its output back as Server-Sent Events.

The current backend is a skeleton. The LangGraph nodes (`research`, `write`, `human_feedback`) add placeholder messages to the state and do not call an LLM yet, so the project is best read as scaffolding for the supervisor pattern. It was inspired by the [CopilotKit travel planner tutorial](https://dev.to/copilotkit/build-an-ai-travel-planner-with-copilotkit-langgraph-google-maps-api-32fm).

## Features

- **Live activity stream**: The frontend reads the streamed response from the backend and appends each chunk to an agent message list.
- **CopilotKit actions**: `initiateTask` starts a run and `provideFeedback` sends human feedback from the copilot chat or the feedback panel.
- **Human feedback node**: The graph has a `human_feedback` node that records feedback when it is present in the state.
- **Persistent client state**: A Zustand store keeps messages, session ID and status in the browser.
- **Streaming API**: `POST /api/converse` returns `text/event-stream`.

## Tech stack

| Layer | Tool |
| --- | --- |
| Frontend | [Next.js](https://nextjs.org/) 15, React 19, Tailwind CSS, Framer Motion |
| Copilot UI | [CopilotKit](https://copilotkit.ai) (`@copilotkit/react-core`, `@copilotkit/react-ui`, `@copilotkit/backend`) |
| Client state | [Zustand](https://zustand-demo.pmnd.rs/) |
| Agent orchestration | [LangGraph](https://www.langchain.com/langgraph) |
| Backend | [FastAPI](https://fastapi.tiangolo.com) and uvicorn |

## Getting started

### Prerequisites

- Node.js 18 or later
- Python 3.10 or later (the committed environment uses Python 3.11)
- An OpenAI API key, if you extend the agents to call a model (not used by the current code)

### Installation

```bash
git clone https://github.com/Studio1HQ/CoAgent.git
cd CoAgent

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### Environment variables

Backend, in `backend/.env`:

| Variable | Description |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI key. Listed in the original setup; not read by the current code. |
| `ALLOWED_ORIGINS` | Allowed frontend origin, for example `http://localhost:3000`. Not read by the current code, which allows all origins. |

Frontend, in `frontend/.env.local`:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | URL of the FastAPI backend, for example `http://localhost:8000`. |

### Run

Start the backend. It listens on port 8000:

```bash
cd backend
uvicorn main:app --reload
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

```text
backend/
  main.py          # FastAPI app, POST /api/converse (SSE)
  supervisor.py    # LangGraph StateGraph: human_feedback -> research -> write
frontend/src/
  app/(dashboard)/   # Dashboard page, ActivityStream, AgentConsole, FeedbackPanel
  app/api/copilot/route.ts  # CopilotKit route forwarding to the backend
  lib/agent-store.ts        # Zustand store
  lib/client.ts             # fetchStream helper using NEXT_PUBLIC_BACKEND_URL
```

The LangGraph workflow:

```python
builder = StateGraph(AgentState)
builder.add_node("research", research_agent)
builder.add_node("write", writing_agent)
builder.add_node("human_feedback", human_feedback)
builder.set_entry_point("human_feedback")
builder.add_edge("human_feedback", "research")
builder.add_edge("research", "write")
```

The `/api/converse` endpoint streams each graph state as an SSE `data:` line. The frontend `initiateTask` action posts the task to `/api/copilot`, which forwards it to the backend and streams the reply into the activity feed.

The original README also describes `/api/feedback` and `/ws` endpoints, state version history and multi-agent visualisation. Those are not implemented in the code yet.

## Resources

- [CopilotKit docs](https://docs.copilotkit.ai): actions, readables and the runtime.
- [CopilotKit](https://copilotkit.ai): the copilot framework used here.
- [Build an AI travel planner with CopilotKit, LangGraph and Google Maps API](https://dev.to/copilotkit/build-an-ai-travel-planner-with-copilotkit-langgraph-google-maps-api-32fm): the tutorial this project was inspired by.
- [LangGraph docs](https://langchain-ai.github.io/langgraph/): the agent workflow library.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [CopilotKit](https://copilotkit.ai).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
