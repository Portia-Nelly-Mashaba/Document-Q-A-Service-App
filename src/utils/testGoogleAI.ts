/**
 * Test utility for Google AI API integration
 * This file helps verify that the Google Generative AI API is working correctly
 */

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

export interface AITestResult {
  success: boolean;
  message: string;
  responseTime: number;
  response?: string;
  error?: string;
}

export async function testGoogleAIAPI(): Promise<AITestResult> {
  const startTime = Date.now();

  if (!GOOGLE_API_KEY) {
    return {
      success: false,
      message: 'Google API key is not configured',
      responseTime: 0,
      error: 'REACT_APP_GOOGLE_API_KEY environment variable is missing'
    };
  }

  try {
    const response = await fetch(`${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: 'Hello, please respond with a short greeting to confirm you are working.'
              }
            ]
          }
        ]
      })
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: `API request failed with status ${response.status}`,
        responseTime,
        error: JSON.stringify(errorData)
      };
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        success: true,
        message: 'Google AI API is working correctly!',
        responseTime,
        response: data.candidates[0].content.parts[0].text
      };
    } else {
      return {
        success: false,
        message: 'Invalid response format from Google AI',
        responseTime,
        error: JSON.stringify(data)
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      success: false,
      message: 'Failed to connect to Google AI API',
      responseTime,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
