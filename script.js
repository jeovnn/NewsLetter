// 1. Configuração da API da Planilha
const API_URL = 'https://script.google.com/macros/s/AKfycbycYFMp3wBmS7gSQyVU-rycwX4JUt4Q6tXXoBRI1pO3Wu30Q29JcXU251HCarPmMPv8rA/exec'; 

async function carregarNoticias() {
    const container = document.querySelector('.news-list');
    if (!container) return; // Evita erro se a seção não existir na página

    try {
        const resposta = await fetch(API_URL);
        const noticias = await resposta.json();
        
        container.innerHTML = ''; 

        noticias.forEach(item => {
            const div = document.createElement('div');
            div.className = 'news-item';
            div.innerHTML = `
                <span class="date">${item.data || ''}</span>
                <div>
                    <strong>${item.titulo}</strong>
                    <p>${item.corpo || ''}</p>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Erro ao carregar notícias:", erro);
    }
}

// 2. Lógica do Formulário de Newsletter
document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    
    if(email) {
        alert('Obrigado por se inscrever com o e-mail: ' + email);
        // Aqui você pode integrar com o seu n8n usando fetch() também, se desejar!
    }
});

// 3. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarNoticias();
});
