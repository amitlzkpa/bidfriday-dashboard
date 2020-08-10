require('dotenv').config();
const ngrok = require('ngrok');
const clipboardy = require('clipboardy');

// const PORT = process.env.PORT || 8080;
const PORT = 3001;

(async function() {
  const url = await ngrok.connect(PORT);
  console.log(`Copying URL to clipboard: ${url}`);
  clipboardy.writeSync(url);
})();
