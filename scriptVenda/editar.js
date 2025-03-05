const campoProduto = document.getElementById("campoProduto");
const campoQuantidade = document.getElementById("campoQuantidade");
const campoValorTotal = document.getElementById("campoValorTotal");
const urlAPI = "https://public.franciscosensaulas.com";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

async function consultarDadosVendaPorId() {
    const urlParaConsultarVenda = `${urlAPI}/api/v1/trabalho/vendas/${idParaEditar}`;
    console.log(urlParaConsultarVenda);
    const resposta = await fetch(urlParaConsultarVenda);

    if (!resposta.ok) {
        alert("Venda não encontrada");
        window.location.href = "/TrabalhoVenda/index.html";
        return;
    }

    const dadosVenda = await resposta.json();
    console.log(dadosVenda);


    campoProduto.value = dadosVenda.Produto;
    campoQuantidade.value = dadosVenda.Quantidade;
    campoValorTotal.value = dadosVenda.ValorTotal;
}

async function editar(evento) {
    evento.preventDefault();


    let Produto = campoProduto.value;
    let Quantidade = campoQuantidade.value;
    let ValorTotal = campoValorTotal.value;


    if (!Produto || !Quantidade || !ValorTotal) {
        alert("Por favor, preencha todos os campos.");
        return;
    }


    const dados = {
        Produto: Produto,
        Quantidade: Quantidade,
        ValorTotal: ValorTotal
    };


    let url = `${urlAPI}/api/v1/trabalho/vendas/${idParaEditar}`;
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.message || "Não foi possível alterar");
    } else {
        location.href = '/TrabalhoVenda/index.html';
    }
}


const botaoEditar = document.getElementById("btn-ajustar");
botaoEditar.addEventListener("click", editar);


consultarDadosVendaPorId();
