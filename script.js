// Mostra/esconde o aviso conforme os dias são marcados
const diasCheckboxes = document.querySelectorAll('input[name="dias"]');
const daysWarning = document.getElementById('daysWarning');

function atualizarAvisoDias() {
  const algumMarcado = Array.from(diasCheckboxes).some(cb => cb.checked);
  daysWarning.classList.toggle('visible', algumMarcado);
}

diasCheckboxes.forEach(cb => cb.addEventListener('change', atualizarAvisoDias));

// Mostra o aviso do horário assim que um horário é selecionado
const horarioRadios = document.querySelectorAll('input[name="horario"]');
const timeWarning = document.getElementById('timeWarning');

function atualizarAvisoHorario() {
  const algumSelecionado = Array.from(horarioRadios).some(radio => radio.checked);
  timeWarning.classList.toggle('visible', algumSelecionado);
}

horarioRadios.forEach(radio => radio.addEventListener('change', atualizarAvisoHorario));

// Lógica do Formulário de Newsletter
document.getElementById('newsletterForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('emailInput').value;
  const diasSelecionados = Array.from(
    document.querySelectorAll('input[name="dias"]:checked')
  ).map(input => input.value);

  const horarioInput = document.querySelector('input[name="horario"]:checked');
  const horarioSelecionado = horarioInput ? horarioInput.value : null;

  if (diasSelecionados.length === 0) {
    alert('Selecione pelo menos um dia para receber a newsletter.');
    return;
  }

  if (!horarioSelecionado) {
    alert('Selecione um horário para receber a newsletter.');
    return;
  }

  if (email) {
    const botao = event.target.querySelector('button[type="submit"]');
    const textoOriginalBotao = botao.textContent;

    botao.disabled = true;
    botao.textContent = 'Enviando...';

    try {
      const resposta = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, dias: diasSelecionados, horario: horarioSelecionado }),
      });

      if (resposta.status === 409) {
        alert('Este e-mail já está cadastrado!');
        return;
      }

      if (!resposta.ok) {
        throw new Error('Erro na resposta da API: ' + resposta.status);
      }

      alert('Obrigado por se inscrever com o e-mail: ' + email);
      document.getElementById('emailInput').value = '';

    } catch (erro) {
      console.error('Erro ao cadastrar:', erro);
      alert('A API NÃO ESTÁ RODANDO - NÃO TENHO VPS AINDA :(');
      //alert('Não foi possível concluir a inscrição. Tente novamente em instantes.');
    } finally {
      botao.disabled = false;
      botao.textContent = textoOriginalBotao;
    }
  }
});