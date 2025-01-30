export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchStream(
  endpoint: string,
  options: RequestInit
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.body!;
}