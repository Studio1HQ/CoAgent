from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from supervisor import create_supervisor
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

supervisor = create_supervisor()

@app.post("/api/converse")
async def converse(prompt: str):
    async def stream_response():
        async for state in supervisor.astream({"messages": [prompt]}):
            yield f"data: {state['messages'][-1]}\n\n"
    
    return StreamingResponse(stream_response(), media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)