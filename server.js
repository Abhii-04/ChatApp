const express = require('express');
const path = require('path');
const http = require('http');
const socketio= require('socket.io');
const formatMessage= require('./Utils/messages');

const app = express();  
const server = http.createServer(app);
const io = socketio(server);


//Static folder
app.use(express.static(path.join(__dirname,'public')))
const bot ='Intruder';

//Run when client connects
io.on('connection',socket =>{
    console.log('New WS connection');

    socket.emit('message', formatMessage(bot,'welcome to chatcord'));

    //broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(bot,'A user has joined the chat'));

    //runs when client disconnects
    socket.on('disconnect', ()=>{
        io.emit('message', formatMessage(bot,'A user has left the chat')); 
    })


    //listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMessage('USER',msg)); 
    })
})

const port = 3000 ||process.env.port;
server.listen(port,()=>console.log('server is running on port ${port}'));
