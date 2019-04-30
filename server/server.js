const express = require('express');
const morgan = require('morgan');
const path = require('path');
const getRecs = require('../dbs/SDC/MongoDB/index.js')
const cors = require('cors')

const port = 3001;
const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../public')));


app.get('/:room', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get('/room/:room', (req, res) => {
  getRecs(req.params.room, (err, results) => {
    if (err) console.error('Error querying database...');
    else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
