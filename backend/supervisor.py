from langgraph.graph import StateGraph, END
from typing import TypedDict, List, Optional
import logging

logger = logging.getLogger(__name__)

class AgentState(TypedDict):
    messages: List[str]
    feedback: Optional[str]
    status: str

def create_supervisor():
    builder = StateGraph(AgentState)
    
    def research_agent(state: AgentState):
        try:
            new_message = f"🔍 Researching: {state['messages'][-1]}"
            return {
                "messages": [*state['messages'], new_message],
                "status": "researching"
            }
        except Exception as e:
            logger.error(f"Research error: {str(e)}")
            return {"messages": state['messages'], "status": "error"}

    def writing_agent(state: AgentState):
        try:
            new_message = f"✍️ Drafting: {state['messages'][-1]}"
            return {
                "messages": [*state['messages'], new_message],
                "status": "writing"
            }
        except Exception as e:
            logger.error(f"Writing error: {str(e)}")
            return {"messages": state['messages'], "status": "error"}

    def human_feedback(state: AgentState):
        try:
            if state.get('feedback'):
                new_message = f"💡 Feedback: {state['feedback']}"
                return {
                    "messages": [*state['messages'], new_message],
                    "status": "awaiting_feedback"
                }
            return state
        except Exception as e:
            logger.error(f"Feedback error: {str(e)}")
            return state

    builder.add_node("research", research_agent)
    builder.add_node("write", writing_agent)
    builder.add_node("human_feedback", human_feedback)

    builder.set_entry_point("human_feedback")
    builder.add_edge("human_feedback", "research")
    builder.add_edge("research", "write")
    builder.add_conditional_edges(
        "write",
        lambda state: END if "Drafting" in state['messages'][-1] else "human_feedback"
    )
    
    return builder.compile()