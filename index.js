const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

let defaultPoll = {
    question: 'What is your favourite programming language?',
    options: [
      { option: 'C++', votes: 0 },
      { option: 'Java', votes: 0 },
      { option: 'Python', votes: 0 },
    ]
};

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('default' , defaultPoll);
    

    socket.on('poll update', (optionName, checked) => {
        const option = defaultPoll.options.find(option => option.option === optionName);
        if (option) {
            option.votes += checked ? -1 : 1;
            io.emit('default', defaultPoll);
           
        }
    });
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});