require('dotenv').config();
const router = require('express').Router();


router.get('/test', async (req, res) => {
  return res.send('Bidfriday backend test route');
});



module.exports = router;