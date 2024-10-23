// @ts-nocheck

const jainamSelectorBtn = document.querySelector('#jainam-selector');
const foramSelectorBtn = document.querySelector('#foram-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Jainam' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
}

let messageSender = 'Jainam';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'Jainam') {
    jainamSelectorBtn.classList.add('active-person');
    foramSelectorBtn.classList.remove('active-person');
  }
  if (name === 'Foram') {
    foramSelectorBtn.classList.add('active-person');
    jainamSelectorBtn.classList.remove('active-person');
  }

  /* auto-focus the input field */
  chatInput.focus();
}

jainamSelectorBtn.onclick = () => updateMessageSender('Jainam');
foramSelectorBtn.onclick = () => updateMessageSender('Foram');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message);

  /* Clear input field */
  chatInputForm.reset();

  /* Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
