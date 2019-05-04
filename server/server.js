const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {getRecs, connect} = require('../dbs/SDC/MongoDB/index.js')
const cors = require('cors')

const port = 3001;
const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/loaderio-26279a00fd1f7e11bb0a2aa9e783d9e5', (req, res) => {
  res.send('loaderio-26279a00fd1f7e11bb0a2aa9e783d9e5')
})

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


connect();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
