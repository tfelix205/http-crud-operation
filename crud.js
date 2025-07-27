

const studentDb = require('./database.json');
const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = 8080;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    // CREATE STUDENT
    if (url === '/create-student' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const data = JSON.parse(body);
          const student = {
                id: uuidv4(),
              name: data.name,
                gender: data.gender,
                age: data.age
         };
            studentDb.push(student);
            fs.writeFile('./database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error) => {
                if (error) {
                    res.writeHead(400, { "content-type": "text/plain" });
                    res.end('bad request');
                } else {
                    res.writeHead(201, { "content-type": "application/json" });
                    res.end(JSON.stringify({
                        message: "Student created successfully",
                        data: student
                    }));
                }
            });
        });

    // GET SINGLE STUDENT BY ID
    } else if (url.startsWith('/student/') && method === "GET") {
        const id = url.split('/')[2];
        const student = studentDb.find((e) => e.id === id);

        if (!student) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('Student not found');
        } else {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: 'Student found',
                data: student
            }));
        }

    // GET ALL STUDENTS
    } else if (url === '/students' && method === "GET") {
        if (studentDb.length < 1) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('No students found');
        } else {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: 'All students',
                total: studentDb.length,
                data: studentDb
            }));
        }

    // UPDATE STUDENT
    } else if (url.startsWith('/update-student/') && method === 'PATCH') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const update = JSON.parse(body);
            const id = url.split('/')[2];
            const student = studentDb.find((e) => e.id === id);

            if (!student) {
                res.writeHead(404, { "content-type": "text/plain" });
                res.end('Student not found');
            } else {
                // Update fields if present
                student.name = update.name || student.name;
                student.gender = update.gender || student.gender;
                student.age = update.age || student.age;

                fs.writeFile('./database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error) => {
                    if (error) {
                        res.writeHead(500, { "content-type": "text/plain" });
                        res.end('Failed to update student');
                    } else {
                        res.writeHead(200, { "content-type": "application/json" });
                        res.end(JSON.stringify({
                            message: "Student updated successfully",
                            data: student
                        }));
                    }
                });
            }
        });

    // DELETE STUDENT
    } else if (url.startsWith('/delete-student/') && method === 'DELETE') {
        const id = url.split('/')[2];
        const studentIndex = studentDb.findIndex((e) => e.id === id);

        if (studentIndex === -1) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end('Student not found');
        } else {
            const deletedStudent = studentDb[studentIndex];
            studentDb.splice(studentIndex, 1);

            fs.writeFile('./database.json', JSON.stringify(studentDb, null, 2), 'utf-8', (error) => {
                if (error) {
                    res.writeHead(500, { "content-type": "text/plain" });
                    res.end('Failed to delete student');
                } else {
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify({
                        message: "Student deleted successfully",
                        data: deletedStudent
                    }));
                }
            });
        }

    // DEFAULT ROUTE FOR UNHANDLED PATHS
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end('Route not found');
    }
});

// START SERVER
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});