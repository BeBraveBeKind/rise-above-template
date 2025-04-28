export async function handler(event, context) {
  console.log("Auth function triggered", JSON.stringify({
    queryParams: event.queryStringParameters,
    path: event.path,
    httpMethod: event.httpMethod
  }));
  
  const params = event.queryStringParameters;
  const code = params ? params.code : null;

  console.log("Code parameter:", code);

  if (!code) {
    console.log("No code parameter found in request");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No code provided" }),
    };
  }

  console.log("Retrieving environment variables");
  const client_id = process.env.GITHUB_CLIENT_ID_TEMPLATE;
  const client_secret = process.env.GITHUB_CLIENT_SECRET_TEMPLATE;
  
  console.log("Client ID available:", !!client_id);
  console.log("Client Secret available:", !!client_secret);

  try {
    console.log("Making token request to GitHub");
    const tokenRequest = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
      }),
    });

    console.log("Token response received");
    const tokenData = await tokenRequest.json();
    console.log("Token data processed", tokenData.error ? "with error" : "successfully");

    if (tokenData.error) {
      console.log("Token error:", tokenData.error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: tokenData.error }),
      };
    }

    console.log("Returning successful response");
    return {
      statusCode: 200,
      body: JSON.stringify(tokenData),
    };
  } catch (error) {
    console.log("Exception in auth function:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", message: error.message }),
    };
  }
}