const campoVeiculo = document.getElementById("campoVeiculo");
const campoMotorista = document.getElementById("campoMotorista");
const campoCarga = document.getElementById("campoCarga");
const campoPesoCarga = document.getElementById("campoPesoCarga");
const campoDestino = document.getElementById("campoDestino");
const campoTempoEstimado = document.getElementById("campoTempoEstimado");
const feedback = document.getElementById("feedback");
const botaoEditar = document.getElementById("btn-ajustar");

const urlAPI = "https://public.franciscosensaulas.com";
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");


async function consultarDadosTransportePorId() {
    const urlParaConsultarTransporte = `${urlAPI}/api/v1/trabalho/transportes/${idParaEditar}`;
    const resposta = await fetch(urlParaConsultarTransporte);

    if (!resposta.ok) {
        alert("Cadastro de transporte não encontrado");
        window.location.href = "/TrabalhoTransporte/index.html";
        return;
    }

    const dadosTransporte = await resposta.json();


    campoVeiculo.value = dadosTransporte.veiculo;
    campoMotorista.value = dadosTransporte.motorista;
    campoCarga.value = dadosTransporte.carga;
    campoPesoCarga.value = dadosTransporte.pesoCarga;
    campoDestino.value = dadosTransporte.destino;
    campoTempoEstimado.value = dadosTransporte.tempoEstimadoHoras;


    botaoEditar.disabled = false;
}

async function editar(evento) {
    evento.preventDefault();


    if (!campoVeiculo.value || !campoMotorista.value || !campoCarga.value || !campoPesoCarga.value || !campoDestino.value || !campoTempoEstimado.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let Veiculo = campoVeiculo.value;
    let Motorista = campoMotorista.value;
    let Carga = campoCarga.value;
    let PesoCarga = campoPesoCarga.value;
    let Destino = campoDestino.value;
    let TempoEstimado = campoTempoEstimado.value;

    const dados = {
        veiculo: Veiculo,
        motorista: Motorista,
        carga: Carga,
        pesoCarga: PesoCarga,
        destino: Destino,
        tempoEstimadoHoras: TempoEstimado
    };


    feedback.innerHTML = "Atualizando...";


    let url = `${urlAPI}/api/v1/trabalho/transportes/${idParaEditar}`;
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });


    if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.message || "Não foi possível alterar");
    } else {
        feedback.innerHTML = "<strong>Cadastro atualizado com sucesso!</strong>";
        setTimeout(() => {
            location.href = '/TrabalhoTransporte/index.html';
        }, 2000);
    }
}


botaoEditar.addEventListener("click", editar);


consultarDadosTransportePorId();


function aplicarMascaras() {

    IMask(document.getElementById('campoPesoCarga'), {
        mask: Number,
        min: 0,
        max: 999999,
        thousandsSeparator: '.',
        radix: ',',
        mapToRadix: ['.']
    });


    IMask(document.getElementById('campoTempoEstimado'), {
        mask: '00:00',
        blocks: {
            '00': { mask: IMask.MaskedRange, from: 0, to: 23 },
            '00': { mask: IMask.MaskedRange, from: 0, to: 59 },
        }
    });
}


window.onload = aplicarMascaras;
