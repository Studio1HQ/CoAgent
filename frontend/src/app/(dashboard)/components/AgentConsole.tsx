import ActivityStream from './ActivityStream'
import FeedbackPanel from './FeedbackPanel'
import { Message } from '@/lib/agent-store'

export default function AgentConsole({ 
  messages,
  onFeedback
}: {
  messages: Message[]
  onFeedback: (feedback: string) => void
}) {
  return (
    <div className="grid grid-cols-3 h-screen gap-6 p-6">
      <div className="col-span-2 bg-background rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Agent Activity</h2>
        <ActivityStream messages={messages} />
      </div>
      
      <div className="col-span-1 bg-background rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Supervisor Controls</h2>
        <FeedbackPanel onSubmit={onFeedback} />
      </div>
    </div>
  )
}