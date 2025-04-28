// netlify/functions/auth.js (CommonJS format)
exports.handler = async function(event, context) {
  const params = event.queryStringParameters;
  const code = params ? params.code : null;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No code provided" }),
    };
  }

  const client_id = process.env.GITHUB_CLIENT_ID_TEMPLATE;
  const client_secret = process.env.GITHUB_CLIENT_SECRET_TEMPLATE;

  try {
    const fetch = require('node-fetch'); // You may need to install this package
    
    const tokenRequest = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
      }),
    });

    const tokenData = await tokenRequest.json();

    if (tokenData.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: tokenData.error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(tokenData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", message: error.message }),
    };
  }
}