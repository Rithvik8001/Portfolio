const http = require("http");
const https = require("https");
const url = require("url");
const querystring = require("querystring");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\x1b[31mError: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in your .env file.\x1b[0m"
  );
  console.error(
    "Make sure you run this script with: node --env-file=.env src/scripts/generate-spotify-token.js"
  );
  process.exit(1);
}

const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/callback") {
    const code = parsedUrl.query.code;
    if (code) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<h1>Success!</h1><p>You can close this window and check your terminal for the Refresh Token.</p>"
      );
      getToken(code);
    } else {
      res.writeHead(400);
      res.end("Error: No code found in query parameters.");
    }
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(8888, () => {
  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
    });

  console.log("\n\x1b[36m=== Spotify Refresh Token Generator ===\x1b[0m\n");
  console.log(
    "1. Go to your Spotify Developer Dashboard (https://developer.spotify.com/dashboard)"
  );
  console.log('2. Select your app and go to "Settings"');
  console.log("3. Add this Redirect URI to your app settings and save:");
  console.log(`   \x1b[33m${REDIRECT_URI}\x1b[0m`);
  console.log("\n4. Open this URL in your browser to authorize:");
  console.log(`   \x1b[34m${authUrl}\x1b[0m`);
  console.log("\nWaiting for callback...");
});

function getToken(code) {
  const postData = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  const options = {
    hostname: "accounts.spotify.com",
    port: 443,
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Length": postData.length,
    },
  };

  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.refresh_token) {
          console.log("\n\x1b[32mSUCCESS! Here is your Refresh Token:\x1b[0m");
          console.log("=========================================");
          console.log(parsed.refresh_token);
          console.log("=========================================");
          console.log("\nAdd this to your .env file as:");
          console.log(`SPOTIFY_REFRESH_TOKEN=${parsed.refresh_token}`);
        } else {
          console.error("\n\x1b[31mError getting token:\x1b[0m", parsed);
        }
      } catch (e) {
        console.error("Error parsing response:", e);
      }
      server.close();
      process.exit(0);
    });
  });

  req.on("error", (e) => {
    console.error("Request error:", e);
    server.close();
  });

  req.write(postData);
  req.end();
}
