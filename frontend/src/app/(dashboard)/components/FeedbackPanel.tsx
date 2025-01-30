'use client'
import { useState } from 'react'
import { useCopilotAction } from '@copilotkit/react-core'

export default function FeedbackPanel({ 
  onSubmit 
}: { 
  onSubmit: (feedback: string) => void 
}) {
  const [feedback, setFeedback] = useState('')

  useCopilotAction({
    name: 'provideFeedback',
    parameters: [
      {
        name: 'feedback',
        type: 'string',
        description: 'User feedback for the agent system'
      }
    ],
    handler: ({ feedback }) => {
      handleSubmit(feedback)
    }
  })

  const handleSubmit = (text: string) => {
    if (text.trim()) {
      onSubmit(text)
      setFeedback('')
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter feedback for agents..."
        rows={4}
      />
      <button
        onClick={() => handleSubmit(feedback)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Submit Feedback
      </button>
    </div>
  )
}