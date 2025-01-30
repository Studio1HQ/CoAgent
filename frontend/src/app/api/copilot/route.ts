// frontend/src/app/api/copilot/route.ts
import { CopilotRuntime } from '@copilotkit/backend'
import { fetchStream } from '@/lib/client'
import { z } from 'zod'

export const runtime = 'edge'

// Define Zod schema
const AgentRequestSchema = z.object({
  input: z.string().describe("User input for the agent system")
})

export async function POST(req: Request): Promise<Response> {
  const copilotRuntime = new CopilotRuntime()

  return copilotRuntime.response(req, {
    actions: [
      {
        name: "processAgentRequest",
        description: "Handle agent system requests",
        parameters: AgentRequestSchema,
        handler: async ({ input }: z.infer<typeof AgentRequestSchema>) => {
          try {
            const stream = await fetchStream('/api/converse', {
              method: 'POST',
              body: JSON.stringify({ prompt: input }),
            })
            
            return new Response(stream, {
              headers: { 
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache'
              }
            })
          } catch (error) {
            console.error('API Error:', error)
            throw new Error('Failed to process agent request')
          }
        }
      }
    ]
  })
}