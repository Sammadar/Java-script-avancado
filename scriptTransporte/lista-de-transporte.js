let tabelaTransporte = document.getElementById("tabela-transporte");
let botaoConsultarTransporte = document.getElementById("consultar-transporte");

let urlAPI = "https://public.franciscosensaulas.com"

function atribuirCliqueBotoesApagar() {
   
    let botoesApagar = document.getElementsByClassName("botao-apagar");
    
    Array.from(botoesApagar).forEach((botao) => {
        
        botao.addEventListener('click', apagar);
    });
}


async function apagar(evento) {

    const botaoClique = evento.target;

    const Veiculo = document.getAttribute("data-Veiculo");
    const motorista = document.getAttribute("data-motorista");
    const carga = document.getAttribute("data-carga");
    const pesoCarga = document.getAttribute("data-pesoCarga");
    const destino = document.getAttribute("data-destino");
    const tempoEstimado = document.getAttribute("data-tempoEstimado");

    Swal.fire({
        title: `Deseja apagar o cadastro de'${motorista}'?`,
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
            apagarTransporte(id);
        }
    });
}

async function apagarTransporte(id) {
    let url = `${urlAPI}/api/v1/trabalho/transportes/${id}`
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
    consultarTransporte();
}


async function consultarTransporte() {

    let url = `${urlAPI}/api/v1/trabalho/transportes`
    const resposta = await fetch(url);

    if (resposta.ok == false) {
        alert("Não foi possível carregar os dados")
    }

    const transporte = await resposta.json();

    let tbody = tabelaTransporte.querySelector("tbody");
    tbody.innerHTML = "";

    transporte.forEach(veiculo => {
        const colunas = `
        <td>${veiculo.veiculo}</td>
        <td>${veiculo.motorista}</td>
        <td>${veiculo.carga}</td>
        <td>${veiculo.PesoCarga}</td>
        <td>${veiculo.destino}</td>
        <td>${veiculo.tempoEstimado}</td>

        <td>
        <a href="editar.html?id=${veiculo.motorista}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
        <button class="btn btn-danger botao-apagar" 
        data-id="${veiculo.motorista}"
         data-nome="${veiculo.motorista}"\><i class="fas fa-trash"></i> Apagar</button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(veiculo);
    });

    atribuirCliqueBotoesApagar();

}

botaoConsultarTransporte.addEventListener("click", consultarTransporte);

consultarTransporte();







