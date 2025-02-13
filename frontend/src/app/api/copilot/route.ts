import { CopilotRuntime, CopilotKitServiceAdapter } from '@copilotkit/backend'
import { fetchStream } from '@/lib/client'
import { z } from 'zod'

export const runtime = 'edge'

// Define the type of forwardedProps based on your payload structure.
interface ProcessAgentRequestPayload { 
  input: string; 
  // Add other properties as needed based on your agent's requirements
  // Example: model?: string; temperature?: number;  etc.
}

interface ForwardedProps {
  actionName: string;
  payload: ProcessAgentRequestPayload; 
}

const AgentRequestSchema = z.object({
  input: z.string().describe("User input for the agent system"),
});

const processAgentRequest = async (
  payload: ProcessAgentRequestPayload
): Promise<Response> => { 
  try {
    const stream = await fetchStream('/api/converse', {
      method: 'POST',
      body: JSON.stringify({ prompt: payload.input }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return new Response(stream, { 
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process agent request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

const serviceAdapter: CopilotKitServiceAdapter = {
  getResponse: async (forwardedProps: ForwardedProps): Promise<Response> => {
    const { actionName, payload } = forwardedProps;

    if (actionName === 'processAgentRequest') {
      const parsed = AgentRequestSchema.safeParse(payload);
      if (!parsed.success) {
        return new Response(JSON.stringify({ error: 'Invalid payload: ' + parsed.error.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return await processAgentRequest(parsed.data);
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${actionName}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

const copilotRuntime = new CopilotRuntime();

export async function POST(req: Request): Promise<Response> {
  try {
    return await copilotRuntime.response(req, serviceAdapter);
  } catch (error) {
    console.error('CopilotRuntime Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}