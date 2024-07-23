const http=reuire('http');
const fs = require('fs');

const users={};

http.createServer((req,res) => {
    if(req.method==='GET'){
        if(req.url === '/'){
            return fs.readFile('/restFront.html',(err,data) => {
                if(err){
                    throw err;
                }
                res.end(data);
            });
        }else if (req.url ==='/about'){
            return fs.readFile('./about.html',(err,data) => {
                if(err){
                    throw err;
                }
                res.end(data);
            });
        }else if(req.url === '/users') {
            return res.end(JSON.stringify(users));
        }
        return fs.readFile(`.${req.url}`,(err,data) => {
            if(err){
                res.writehead(404,'NOT Found');
                return res.end('Not Found');
            }
            return res.end(data);
        });
    }else if(req.method ==='POST'){
        if(req.url === '/users'){
            let body='';
            req.on('data',(data) => {
                body += data;
            });
            return req.on('end',()=> {
                console.log('POST 본문(Body):',body);
                const { name}=JSON.parse(body);
                const id=Date.now();
                users[id]=name;
                res.writehead(201);
                res.end('등록성공');
            });
        }
    }else if (req.method ==='PUT'){
        
    }
})