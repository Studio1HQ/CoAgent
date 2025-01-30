'use client'
import { useCopilotAction } from '@copilotkit/react-core'
import AgentConsole from './components/AgentConsole'
import { useAgentStore } from '@/lib/agent-store'

export default function DashboardPage() {
  // Access store methods directly from the root
  const { messages, addMessage, submitFeedback } = useAgentStore()
  
  useCopilotAction({
    name: "initiateTask",
    parameters: [
      {
        name: "task",
        type: "string",
        description: "Task for the agent team to complete"
      }
    ],
    handler: async ({ task }) => {
      addMessage(task, 'user')
      const response = await fetch('/api/copilot', {
        method: 'POST',
        body: JSON.stringify({ prompt: task }),
      })
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        addMessage(decoder.decode(value), 'agent')
      }
    }
  })

  return <AgentConsole messages={messages} onFeedback={submitFeedback} />
}