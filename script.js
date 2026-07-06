const inputCep = document.getElementById("cep");
const botaoBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

botaoBuscar.addEventListener("click", buscarCep);

async function buscarCep() {
    const cep = inputCep.value.trim();

    if(cep === "") {
        resultado.innerHTML = "Digite um CEP. ";
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if(dados.erro) {
            resultado.innerHTML = "CEP não encontrado.";
            return;
        }

        resultado.innerHTML = `
        <h3>Endereço encontrado</h3>
        <p><strong>Rua:</strong> ${dados.logradouro}</p>
        <p><strong>Bairro:</strong> ${dados.bairro}</p>
        <p><strong>Cidade:</strong> ${dados.localidade}</p>
        <p><strong>Estado:</strong> ${dados.uf}</p>
        `;
        
        console.log(dados);
        console.log(dados.logradouro);
        console.log(dados.bairro);
        console.log(dados.localidade);
        console.log(dados.uf);

    }  catch (erro) {

        resultado.innerHTML = "Erro ao buscar o CEP.";
    }

}
