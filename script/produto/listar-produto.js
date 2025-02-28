let tabelaProdutos = document.getElementById("tabela-produtos");
let botaoConsultarProdutos = document.getElementById("consultar-produtos");

const urlAPI = "https://public.franciscosensaulas.com"


function atribuirCliqueBotoesApagar() {
    
    let botoesApagar = document.getElementsByClassName("botao-apagar");
    Array.from(botoesApagar).forEach((botao) => {
        botao.addEventListener('click', apagar);
    });
}

async function apagar(evento) {

    const botaoClique = evento.target;

    const nome = botaoClique.getAttribute("data-nome");
    const preco = botaoClique.getAttribute("data-preco");
    const categoria = botaoClique.getAttribute("data-categoria");

    Swal.fire({
        title: `Deseja apagar o cadastro da empresa '${nome}'?`,
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim apagar!",
        cancelButtonText: "Não",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            apagarProduto(id);
        }
    });
}

async function apagarProduto(id) {
    let url = `${urlAPI}/api/v1/empresa/produtos/${id}`
    console.log(url);

    const resposta = await fetch(url, { method: "DELETE" });
    if (resposta.ok == false) {
        alert("Não foi possível apagar");
        return;
    }

    Swal.fire({
        title: "Apagado!",
        text: "Produto removida com sucesso!",
        icon: "success"
    });
    consultarProduto();
}

async function consultarProduto() {
    let url = `${urlAPI}/api/v1/empresa/produtos`
    // fetch vai realizar a requisição, na variável resposta teremos os dados do response como: status, response em si(dados que o back-end retornou)  
    const resposta = await fetch(url);
    // Verificar se a requisição falhou por algum motivo
    if (resposta.ok == false) {
        alert("Não foi possível carregar os dados")
    }

    // Obter o response da requisição, que neste cenário será uma lista de objetos
    const produto = await resposta.json();

    let tbody = tabelaProdutos.querySelector("tbody");
    tbody.innerHTML = "";

    
    produto.forEach(produto => {
        const colunas = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.categoria}</td>
        <td>
        <a href="editar.html?id=${produto.nome}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
        <button class="btn btn-danger botao-apagar" 
        data-id="${produto.nome}"
         data-nome="${produto.nome}"\><i class="fas fa-trash"></i> Apagar</button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(produto);
    });

    atribuirCliqueBotoesApagar();

}


botaoConsultarProdutos.addEventListener("click", consultarProduto);

consultarProduto();















