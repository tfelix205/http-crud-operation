// const studentDb = require('./database.json');
// const http = require('http');
// const fs = require('fs')
// const PORT = 8080;



// const server = http.createServer((req, res)=>{
//     const {url, method} = req;

//     if (url === '/create-student' && method === 'POST') {
//         let body = '';
//         req.on('data', (chunks) => {
//             console.log('i am chunk', chunks);
            
//             body += chunks
//             console.log('i am raw body', body);
            
//         });

//         req.on('end', () => {
//             const data = JSON.parse(body);

//             const student = {
//                 id: studentDb.length +1,
//                 name: data.name,
//                 gender: data.gender,
//                 age: data.age
//             };
//             studentDb.push(student);
//             fs.writeFile('./database.json', JSON.stringify(student, null, 2), 'utf-8', (error, data) => {
//                 if (error) {
//                     res.writeHead(400, {"content-type": "text/plain"});
//                     res.end('bad request')
//                 } else {
//                     res.writeHead(201, {"content-type": "application/json"});
//                     res.end(JSON.stringify({
//                         message: "student created successfully",
//                         data: student
//                     }))
//                 }
//             })
//         });
//     }
// });
// server.listen(PORT, () => {
//     console.log('server is running on port', PORT)
    
// });



// const studentDb = require('./database.json'); // studentDb now holds an array containing the content of 'databasej.son 
// const http = require('http'); //loads the http module & passing it to a variable
// const fs = require('fs'); // loads the file system module  & passing it to a variable
// const PORT = 8080; // passing the port number to a variable for a cleaner code

// const server = http.createServer((req, res) => { //creating a server , and a callback that handles 
// // request & response
// const uuid = require('uuid')
//     const { url, method } = req;// destructuring the request object to get 'url', 'method' properties

//     if (url === '/create-student' && method === 'POST') {// passing a condition using req properties
//         let body = ''; // preparing container that holds the chunk of data from the req

//         req.on('data', (chunk) => {// listening for incoming data 
//             console.log('Received chunk:', chunk.toString()); // checking for received data 
//             body += chunk;// passing the chunks of data into the body container (variable)
//         });

//         req.on('end', () => {// listen for when all data are received and ready for parsing
//             try {
//                 const data = JSON.parse(body);// trying to the data into a JSON object
//                 const student = { // also creating a new student object with the data gotten from the request
//                     id: uuid,// creating uniqueness by incrementing the number 
//                     name: data.name,// name as gotten from data value
//                     gender: data.gender,// gender as gotten from data value
//                     age: data.age// age as gotten from data value
//                 };

//                 studentDb.push(student);// pushing the newly acquired data into the array of database.json

//                 fs.writeFile('./database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (err) => {//updates database.json
//                     if (err) { //checks and handle error 
//                         res.writeHead(500, { 'Content-Type': 'text/plain' }); // returning error 500 & formating
//                         res.end('Failed to write to database');// error message
//                     } else { //incase of no error
//                         res.writeHead(201, { 'Content-Type': 'application/json' }); //created & formating
//                         res.end(JSON.stringify({
//                             message: "Student created successfully",
//                             data: student
//                         }));//configuring and coverting success messages and newly added student object
//                     }
//                 });
//             } catch (err) { // error handling 
//                 console.error('Error parsing JSON:', err);
//                 res.writeHead(400, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: 'Invalid JSON format' }));
//             }
//         });

//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
    
//     } elseif ( url.startwith('/student') && method === 'GET') {
//         if (studentDb.length < 1) {
//             res.writeHead(404, {"content-type": "text/plain"});
//             res.end('no student found')

//         }else {
//             res.writeHead(200, {"content-type": "application/json"});
//             res.end(JSON.stringify({
//                 message: 'All students below',
//                 total: studentDb.length,
//                 data: studentDb
//             }))
//         }
//     }
// });

// server.listen(PORT, () => { //starting the server on port 8080
//     console.log('Server is running on port', PORT);// message that confirms that the server is running
// });


// const studentDb = require('./database.json');
// const http = require('http');
// const fs = require('fs')
// const PORT = 8080;



// const server = http.createServer((req, res)=>{
//     const {url, method} = req;
//     const uuid = require('uuid').v4();
    
    


//     if (url === '/create-student' && method === 'POST') {
//         let body = '';
//         req.on('data', (chunks) => {
//             console.log('i am chunk', chunks);
            
//             body += chunks
//             console.log('i am raw body', body);
            
//         });

//         req.on('end', ()=>{
//             const data = JSON.parse(body);

//             const student = {
//                 id: uuid,
//                 name: data.name,
//                 gender: data.gender,
//                 age: data.age
//             };
//             studentDb.push(student);
//             fs.writeFile('./database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error, data) => {
//                 if (error) {
//                     res.writeHead(400, {"content-type": "text/plain"});
//                     res.end('bad request')
//                 } else {
//                     res.writeHead(201, {"content-type": "application/json"});
//                     res.end(JSON.stringify({
//                         message: "student created successfully",
//                         data: student
//                     }))
//                 }
//             })
//         });
//     } 
// else if (url.startsWith('/student') && method === "GET"){
//     const id = url.split('/')[2];
//     const student = studentDb.find((e)=>{
//         return e.id === id
//     });
//     if (!student){
//         res.writeHead(404, {"content-type": "text/plain"});
//         res.end('student not found')
//     }else {
//         res.writeHead(200,{"content-type":"aplication/json"});
//         res.end(JSON.stringify({
//             message: 'student below',
//             data: student
//         }))
//     }
// }
// //GETTING ALL STUDENT
// else if (url.startsWith('/students') && method ==="GET"){
//     if(studentDb.length < 1){
//         res.writeHead(404, {"content-type": "text/plain"});
//         res.end('no student found')

//     }else{
//         res.writeHead(200, {"content-type": "application/json"});
//         res.end(JSON.stringify({
//             message: 'all student below',
//             total: studentDb.length,
//             data: studentDb
//         }))
//     }
// } 
// else if (url.startsWith('/update-student') && method === 'PATCH') {
//     let body = '';
//     res.on('data', (chunks) => {
//         body += chunks
//     });
//     req.on('end', ()=>{
//         const update = JSON.parse(body);
//         const id = url.split('/')[2];
//         const stundent = studentDb.find((e) => e.id === student.id);
//     })
// }
// });
// server.listen(PORT, () => {
//     console.log('server is running on port', PORT)
    
// });