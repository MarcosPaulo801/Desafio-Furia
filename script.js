document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const tabs = document.querySelectorAll('.tab-button');
    const botChat = document.getElementById('botChat');
    const communityChat = document.getElementById('communityChat');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const usernameElement = document.getElementById('username');
  
    // Nome aleatório
    const randomNames = ['FURIA_FAN', 'CS_Player', 'Fallen_Lover', 'KSCERATO_Fan'];
    usernameElement.textContent = randomNames[Math.floor(Math.random() * randomNames.length)] + Math.floor(Math.random() * 100);
  
    // Trocar abas
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.tab === 'bot-chat') {
          botChat.classList.remove('hidden');
          communityChat.classList.add('hidden');
        } else {
          botChat.classList.add('hidden');
          communityChat.classList.remove('hidden');
        }
      });
    });
  
    // Adicionar mensagem
    function addMessage(area, user, text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', isUser ? 'user-msg' : (user === 'FURIA_BOT' ? 'bot-msg' : 'community-msg'));
      
      messageDiv.innerHTML = `
        <span class="user">${user}:</span>
        <span class="text">${text}</span>
        <span class="time">${new Date().toLocaleTimeString().slice(0, 5)}</span>
      `;
      
      area.appendChild(messageDiv);
      area.scrollTop = area.scrollHeight;
    }
  
    // Respostas do bot
    function getBotResponse(msg) {
      if (msg.includes('!ajuda')) return "Comandos: !jogos, !time, !trocar-nome";
      if (msg.includes('!jogos')) return "Próximo jogo: 20/07 vs MIBR - 19h";
      if (msg.includes('!time')) return "Time: FalleN, KSCERATO, yuurih, YEKINDAR, MOLODOY";
      if (msg.includes('!trocar-nome')) {
        usernameElement.textContent = prompt("Novo nome:") || usernameElement.textContent;
        return `Nome alterado para ${usernameElement.textContent}!`;
      }
      
      const responses = [
        "FURIA é pica! #VEMPRACIMA",
        "Você viu o último jogo?",
        "Siga @furiagg no Twitter!",
        "Compre nosso novo uniforme na shop.furia.gg"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  
    // Enviar mensagem
    function sendMessage() {
      const text = userInput.value.trim();
      if (!text) return;
      
      const activeTab = document.querySelector('.tab-button.active').dataset.tab;
      const targetArea = activeTab === 'bot-chat' ? botChat : communityChat;
      
      addMessage(targetArea, usernameElement.textContent, text, true);
      
      if (activeTab === 'bot-chat') {
        setTimeout(() => {
          addMessage(botChat, 'FURIA_BOT', getBotResponse(text));
        }, 800);
      } else {
        // Simulação de resposta da comunidade
        setTimeout(() => {
          const fakeUsers = ['FURIA_FAN123', 'CS_GOAT', 'YuurihLover'];
          const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
          const replies = ["Concordo!", "Eu vou!", "Hahaha", "🔥🔥"];
          addMessage(communityChat, randomUser, replies[Math.floor(Math.random() * replies.length)]);
        }, 1200);
      }
      
      userInput.value = '';
    }
  
    // Eventos
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  });