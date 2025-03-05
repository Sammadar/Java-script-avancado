const urlAPI = "https://public.franciscosensaulas.com"
let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault();

    let campoProduto = document.getElementById("campoProduto");
    let Produto = campoProduto.value

    let campoQuantidade = document.getElementById("campoQuantidade");
    let Quantidade = campoQuantidade.value

    let campoValorTotal = document.getElementById("campoValorTotal");
    let ValorTotal = campoValorTotal.value

    const dados = {
        Produto: Produto,
        Quantidade: Quantidade,
        ValorTotal: ValorTotal
    }
    let url = `${urlAPI}/api/v1/trabalho/vendas`;
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível cadastrar")
    } else {
        location.href = '/TrabalhoVenda/index.html';
    }
} 