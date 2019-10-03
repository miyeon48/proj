const http = require('http');
const fs = require('fs');

const users = {};

var server = http.createServer((req, res) => {

  //GET METHOD
  if (req.method === 'GET') {
    if (req.url === '/') {
      return fs.readFile('./userMngt.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } 
    else if (req.url === '/users') {
      return res.end(JSON.stringify(users));
    }

    return fs.readFile('.${req.url}', (err, data) => {
      if (err) {
        res.writeHead(404, 'NOT FOUND');
        return res.end('NOT FOUND');
      }
      return res.end(data);
    });
  } 
  
  //POST METHOD
  else if (req.method === 'POST') {
    if (req.url === '/users') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        const { name } = JSON.parse(body);
        const id = Date.now();

        users[id] = name;
        res.writeHead(201);
        res.end('등록 성공');
      });
    }
  } 
  
  //PUT METHOD
  else if (req.method === 'PUT') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        console.log('PUT 본문(Body):', body);
        users[key] = JSON.parse(body).name;
        return res.end(JSON.stringify(users));
      });
    }
  } 
  
  //DELETE METHOD
  else if (req.method === 'DELETE') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      delete users[key];
      return res.end(JSON.stringify(users));
    }
  }

  res.writeHead(404, 'NOT FOUND');
  return res.end('NOT FOUND');
})
  
server.listen(8080, () => {
    console.log('Server is running');
});
