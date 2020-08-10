require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const DIR = 'dist';
// const PORT = process.env.PORT || 8080;
const PORT = 3000;

const app = express();
app.use(express.static(DIR));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.get('/api/test', async (req, res) => {
  return res.send('fooo');
})

const base = path.join(__dirname, '../');
const indexFilePath = path.join(base, '/dist/index.html');
app.use('/*', (req, res) => res.sendFile(indexFilePath));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
