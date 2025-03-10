let tabelaTransporte = document.getElementById("tabela-transporte");
let botaoConsultarTransporte = document.getElementById("consultar-transporte");

let urlAPI = "https://public.franciscosensaulas.com";

// Função para atribuir o clique nos botões de apagar
function atribuirCliqueBotoesApagar() {
    let botoesApagar = document.getElementsByClassName("botao-apagar");

    Array.from(botoesApagar).forEach((botao) => {
        botao.addEventListener('click', apagar);
    });
}

// Função para confirmar e apagar o transporte
async function apagar(evento) {
    const botaoClique = evento.target;

    const veiculo = botaoClique.getAttribute("data-veiculo");
    const id = botaoClique.getAttribute("data-id");

    // Se veiculo for nulo ou indefinido, exibimos um valor padrão
    const nomeVeiculo = veiculo || "Nome não disponível"; // Evita null ou undefined

    // Exibindo a caixa de confirmação com o SweetAlert
    Swal.fire({
        title: `Deseja apagar o transporte '${nomeVeiculo}'?`,
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Não",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            apagarTransporte(id); // Se confirmado, chama a função para excluir
        }
    });
}

// Função para enviar o pedido de exclusão para a API
async function apagarTransporte(id) {
    let url = `${urlAPI}/api/v1/trabalho/transportes/${id}`;
    console.log(url);

    const resposta = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (resposta.ok === false) {
        alert("Não foi possível apagar");
        return;
    }

    // Exibe o sucesso da operação de exclusão
    Swal.fire({
        title: "Apagado!",
        text: "Transporte removido com sucesso!",
        icon: "success"
    });

    consultarTransporte(); // Recarrega a tabela com os dados atualizados
}

// Função para consultar os transportes e renderizar na tabela
async function consultarTransporte() {
    let url = `${urlAPI}/api/v1/trabalho/transportes`;
    const resposta = await fetch(url);

    if (resposta.ok === false) {
        alert("Não foi possível carregar os dados");
        return;
    }

    const transporte = await resposta.json();
    console.log('Resposta da API:', transporte);  // Verifique a resposta completa da API

    let tbody = tabelaTransporte.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os novos dados

    if (transporte.length === 0) {
        // Se não houver transportes, mostre uma mensagem
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">Nenhum transporte encontrado.</td></tr>`;
    }

    transporte.forEach(veiculo => {
        // Verifique o valor de tempoEstimadoHoras para cada veículo
        console.log('Veículo:', veiculo);
        console.log('Nome do veículo:', veiculo.veiculo); // Certifique-se de que este valor está correto

        // Agora verificamos se o tempoEstimadoHoras existe e é maior que 0
        const tempoEstimado = (veiculo.tempoEstimadoHoras && veiculo.tempoEstimadoHoras > 0)
            ? veiculo.tempoEstimadoHoras + 'h'  // Exibe a hora estimada com "h"
            : 'Não informado'; // Se for 0 ou não informado, mostra "Não informado"

        // Se o nome do veículo for null ou undefined, exibe um valor padrão
        const nomeVeiculo = veiculo.veiculo || "Nome não disponível"; // Evita null ou undefined

        const colunas = `
            <td>${nomeVeiculo}</td>
            <td>${veiculo.motorista}</td>
            <td>${veiculo.carga}</td>
            <td class="campo-peso">${veiculo.pesoCarga}</td>
            <td>${veiculo.destino}</td>
            <td class="campo-tempo">${tempoEstimado}</td>
            <td>
                <a href="editar.html?id=${veiculo.id}" class="btn btn-warning">
                    <i class="fas fa-pencil"></i> Editar
                </a>
                <button class="btn btn-danger botao-apagar" 
                    data-id="${veiculo.id}"
                    data-veiculo="${veiculo.veiculo}">
                    <i class="fas fa-trash"></i> Apagar
                </button>
            </td>
        `;

        const linha = document.createElement("tr");
        linha.innerHTML = colunas;
        tbody.appendChild(linha);
    });

    atribuirCliqueBotoesApagar(); // Atribui o clique nos novos botões de apagar
    aplicarMascaras(); // Aplica as máscaras nos campos
}

// Função para aplicar as máscaras nos campos de número
function aplicarMascaras() {
    // Máscara para Peso Carga (Kg) com 2 casas decimais
    IMask(document.getElementById('campoPesoCarga'), {
        mask: Number,
        min: 0,
        max: 999999,
        thousandsSeparator: '.',
        radix: ',',
        mapToRadix: ['.']
    });

    // Máscara para Tempo Estimado no formato HH:mm
    IMask(document.getElementById('campoTempoEstimado'), {
        mask: '00:00',
        blocks: {
            '00': { mask: IMask.MaskedRange, from: 0, to: 23 }, // Para horas
            '00': { mask: IMask.MaskedRange, from: 0, to: 59 }, // Para minutos
        }
    });
}

botaoConsultarTransporte.addEventListener("click", consultarTransporte);

consultarTransporte(); // Carrega os dados ao inicializar a página
