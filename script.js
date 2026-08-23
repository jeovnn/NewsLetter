// 2. Lógica do Formulário de Newsletter
document.getElementById('newsletterForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('emailInput').value;

  if (email) {
    // Pega referência do botão pra dar feedback visual durante o envio
    const botao = event.target.querySelector('button[type="submit"]');
    const textoOriginalBotao = botao.textContent;

    botao.disabled = true;
    botao.textContent = 'Enviando...';

    try {
      const resposta = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!resposta.ok) {
        throw new Error('Erro na resposta da API: ' + resposta.status);
      }

      alert('Obrigado por se inscrever com o e-mail: ' + email);
      document.getElementById('emailInput').value = ''; // limpa o campo após sucesso

    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      alert('Não foi possível concluir a inscrição. Tente novamente em instantes.');
    } finally {
      botao.disabled = false;
      botao.textContent = textoOriginalBotao;
    }
  }
});

// 3. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarNoticias();
});
