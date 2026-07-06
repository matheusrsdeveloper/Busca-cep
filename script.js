const inputCep = document.getElementById("cep");
const botaoBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

const Mensagens = {
    vazio: "Digite o CEP.",
    invalido: "CEP invalido.",
    naoEncontrado: "CEP não encontrado.",
    erro: "Erro ao buscar o CEP. Tente Novamente"
}

botaoBuscar.addEventListener("click", buscarCep);

inputCep.addEventListener("keydown", (event) => { 
    if (event.key === 'Enter') buscarCep(); 
    });

inputCep.setAttribute('inputmode', 'numeric');

async function buscarCep() {
  const cepDigits = inputCep.value.replace(/\D/g, '');

  if (!cepDigits) {
    resultado.textContent = Mensagens.vazio;
    return;
  }

  if (cepDigits.length !== 8) {
    resultado.textContent = Mensagens.invalido;
    return;
  }

  botaoBuscar.disabled = true;
  botaoBuscar.textContent = 'Buscando...';
  resultado.textContent = 'Buscando endereço.';

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);

    if (!response.ok) throw new Error('Erro de rede');
    const dados = await response.json();

    if (dados.erro) {
      resultado.textContent = Mensagens.naoEncontrado;
      return;
    }
    
    mostrarResultado(dados);

  } catch (erro) {
    resultado.textContent = Mensagens.erro;
  } finally {
    botaoBuscar.disabled = false;
    botaoBuscar.textContent = 'Buscar';
  }
}

function mostrarResultado(dados) {
    resultado.innerHTML = `
        <h3>📍 Endereço encontrado</h3>
        <p><strong>Rua:</strong> ${dados.logradouro || "-"}</p>
        <p><strong>Bairro:</strong> ${dados.bairro || "-"}</p>
        <p><strong>Cidade:</strong> ${dados.localidade || "-"}</p>
        <p><strong>Estado:</strong> ${dados.uf || "-"}</p>
    `;
}
