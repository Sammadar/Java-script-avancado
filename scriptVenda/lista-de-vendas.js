let tabelaVenda = document.getElementById("tabela-venda");
let botaoConsultarVenda = document.getElementById("consultar-venda");

let urlAPI = "https://public.franciscosensaulas.com"

function atribuirCliqueBotoesApagar() {
    // pegar a lista de elementos que contém a class="botao-apagar"
    let botoesApagar = document.getElementsByClassName("botao-apagar");
    // foreach percorre cada um dos elementos da lista
    Array.from(botoesApagar).forEach((botao) => {
        // cada um dos botões atribuiremos o evento de click que executará a função apagar
        botao.addEventListener('click', apagar);
    });
}

// Função responsável por questionar o usuário se o mesmo deseja realmente apagar aquele registro
async function apagar(evento) {

    const botaoClique = evento.target;

    const produto = botaoClique.getAttribute("data-produto");
    const id = botaoClique.getAttribute("data-id");

    Swal.fire({
        title: `Deseja apagar o cadastro da Venda '${produto}'?`,
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
            apagarVenda(id);
        }
    });
}

async function apagarVenda(id) {
    let url = `${urlAPI}/api/v1/trabalho/vendas/${id}`
    console.log(url);

    const resposta = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    
        if (resposta.ok == false) {
            alert("Não foi possível apagar");
            return;
        }

    Swal.fire({
        title: "Apagado!",
        text: "Empresa removida com sucesso!",
        icon: "success"
    });
    consultarVenda();
}


async function consultarVenda() {
    
    let url = `${urlAPI}/api/v1/trabalho/vendas`
    const resposta = await fetch(url);
    
    if (resposta.ok == false) {
        alert("Não foi possível carregar os dados")
    }

    const produto = await resposta.json();

    let tbody = tabelaVenda.querySelector("tbody");
    tbody.innerHTML = "";

    produto.forEach(produto => {
        const colunas = `
        <td>${produto.id}</td>
        <td>${produto.produto}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.valorTotal}</td>

        <td>
        <a href="editar.html?id=${produto.id}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
        <button class="btn btn-danger botao-apagar" 
        data-id="${produto.id}"
         data-nome="${produto.produto}"\><i class="fas fa-trash"></i> Apagar</button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(produto);
    });

    atribuirCliqueBotoesApagar();

}

botaoConsultarVenda.addEventListener("click", consultarVenda);

consultarVenda();







