import express from 'express';
import posts from './routes/posts';
import fs from 'fs';
import wav from 'wav';
import Speaker from 'speaker';


const app = express();

let port = 3000;
app.use('/', (req, res, next) => {
  let bell = fs.createReadStream(__dirname + '/../bell.wav');
  let reader = new wav.Reader();
  reader.on('format', function (format) {
    // the WAVE header is stripped from the output of the reader
    console.log(format); 
    reader.pipe(new Speaker(format));
  });
  bell.pipe(reader);
  next();
});

app.use('/', express.static(__dirname + '/../public'));

app.get('/hello', (req, res) => {
  return res.send('Hello world!');
});

app.use('/posts', posts);

const server = app.listen(port, () => {
  console.log('Server is listening on port ', port);
});