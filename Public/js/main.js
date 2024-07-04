const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

//get username from URL
const {username} = Qs.parse(location.search,{
  ignoreQueryPrefix:true
});
console.log(username);


//message from server
socket.on('message', message=>{
  console.log(message);
  outputMessage(message);


  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit
chatform.addEventListener('submit',(e)=>{
  e.preventDefault();

  //get message text
  const msg = e.target.elements.msg.value;


  //emit msg to server
  socket.emit('chatMessage',msg);

  //clear Input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});




//output msg to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}