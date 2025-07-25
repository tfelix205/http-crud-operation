

const studentDb = require('./database.json');
const http = require('http');
const fs = require('fs')
const PORT = 8080;



const server = http.createServer((req, res)=>{
    const {url, method} = req;
    const uuid = require('uuid').v4();
    
    


    if (url === '/create-student' && method === 'POST') {
        let body = '';
        req.on('data', (chunks) => {
            console.log('i am chunk', chunks);
            
            body += chunks
            console.log('i am raw body', body);
            
        });

        req.on('end', ()=>{
            const data = JSON.parse(body);

            const student = {
                id: uuid,
                name: data.name,
                gender: data.gender,
                age: data.age
            };
            studentDb.push(student);
            fs.writeFile('./database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error, data) => {
                if (error) {
                    res.writeHead(400, {"content-type": "text/plain"});
                    res.end('bad request')
                } else {
                    res.writeHead(201, {"content-type": "application/json"});
                    res.end(JSON.stringify({
                        message: "student created successfully",
                        data: student
                    }))
                }
            })
        });
    } 
else if (url.startsWith('/student') && method === "GET"){
    const id = url.split('/')[2];
    const student = studentDb.find((e)=>{
        return e.id === id
    });
    if (!student){
        res.writeHead(404, {"content-type": "text/plain"});
        res.end('student not found')
    }else {
        res.writeHead(200,{"content-type":"aplication/json"});
        res.end(JSON.stringify({
            message: 'student below',
            data: student
        }))
    }
}
//GETTING ALL STUDENT
else if (url.startsWith('/students') && method ==="GET"){
    if(studentDb.length < 1){
        res.writeHead(404, {"content-type": "text/plain"});
        res.end('no student found')

    }else{
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({
            message: 'all student below',
            total: studentDb.length,
            data: studentDb
        }))
    }
} 
else if (url.startsWith('/update-student') && method === 'PATCH') {
    let body = '';
    res.on('data', (chunks) => {
        body += chunks
    });
    req.on('end', ()=>{
        const update = JSON.parse(body);
        const id = url.split('/')[2];
        const stundent = studentDb.find((e) => e.id === student.id);
    })
}
});
server.listen(PORT, () => {
    console.log('server is running on port', PORT)
    
});
   