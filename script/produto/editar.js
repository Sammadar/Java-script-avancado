const campoNome = document.getElementById('campoNome');
const campoPreco = document.getElementById('campoPreco');
const campoCategoria = document.getElementById('campoCategoria');

const urlAPI = "https://public.franciscosensaulas.com"


const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

async function consultarDadosProdutosPorNome() {
    const urlParaConsultarProdutos = `${urlAPI}/api/v1/empresa/produtos/${id}`
    console.log(urlParaConsultarProdutos);
    const resposta = await fetch(urlParaConsultarProdutos);

    if (resposta.ok == false) {
        alert("Produto não encontrada");
        window.location.href = "produto/lista-de-produtos.html";
    }

    const dadosProduto = await resposta.json();
    console.log(dadosProduto);

    campoNome.value = dadosProduto.nome;
    campoPreco.value = dadosProduto.preco;
    campoCategoria.value = dadosProduto.categoria;
}
async function editar(evento) {
    evento.preventDefault();

    let nome = campoNome.value;
    let preco = campoPreco.value;
    let categoria = campoCategoria.value;


    const dados = {
        nome: nome,
        preco: preco,
        categoria: categoria
    }
    let url = `${urlAPI}/api/v1/empresa/produtos/${id}`;
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível alterar")
    } else {
        location.href = '/produto/lista-de-produto.html';
    }
}

const botaoEditar = document.getElementById("botao-alterar");
botaoEditar.addEventListener("click", editar);

consultarDadosEmpresaPorId();