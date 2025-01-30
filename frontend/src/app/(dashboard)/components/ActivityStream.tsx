'use client'
import { Message } from '@/lib/agent-store'
import { AnimatePresence, motion } from 'framer-motion'

export default function ActivityStream({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-lg ${
              msg.type === 'agent' ? 'bg-blue-50' : 
              msg.type === 'user' ? 'bg-green-50' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block w-2 h-2 rounded-full ${
                msg.type === 'agent' ? 'bg-blue-500' : 
                msg.type === 'user' ? 'bg-green-500' : 'bg-gray-500'
              }`} />
              <span className="text-sm font-medium">
                {msg.type === 'agent' ? 'Agent' : 
                 msg.type === 'user' ? 'User' : 'System'}
              </span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{msg.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}