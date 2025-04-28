// netlify/functions/auth-test.js
export async function handler(event, context) {
    console.log("Auth test function triggered", JSON.stringify(event.queryStringParameters));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Auth test completed",
        params: event.queryStringParameters
      }),
    };
  }