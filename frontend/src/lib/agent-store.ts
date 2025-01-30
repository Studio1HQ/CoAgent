import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  content: string
  type: 'user' | 'agent' | 'system'
  timestamp: Date
}

interface AgentStore {
  sessionId: string
  messages: Message[]
  status: 'idle' | 'processing' | 'error'
  // Moved actions to root level
  startSession: () => void
  addMessage: (content: string, type: Message['type']) => void
  updateStatus: (status: AgentStore['status']) => void
  submitFeedback: (feedback: string) => void
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      sessionId: '',
      messages: [],
      status: 'idle',
      
      // Directly define actions at root level
      startSession: () => {
        const sessionId = Math.random().toString(36).substring(2, 15)
        set({
          sessionId,
          messages: [],
          status: 'processing'
        })
      },
      
      addMessage: (content, type) => 
        set(state => ({
          messages: [...state.messages, {
            content,
            type,
            timestamp: new Date()
          }]
        })),
      
      updateStatus: (status) => set({ status }),
      
      submitFeedback: (feedback) => {
        set(state => ({
          messages: [...state.messages, {
            content: `Feedback: ${feedback}`,
            type: 'system',
            timestamp: new Date()
          }]
        }))
      }
    }),
    {
      name: 'agent-store',
      partialize: (state) => ({
        sessionId: state.sessionId,
        messages: state.messages
      })
    }
  )
)