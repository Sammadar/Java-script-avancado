const campoVeiculo = document.getElementById("campoVeiculo");
const campoMotorista = document.getElementById("campoMotorista");
const campoCarga = document.getElementById("campoCarga");
const campoPesoCarga = document.getElementById("campoPesoCarga");
const campoDestino = document.getElementById("campoDestino");
const campoTempoEstimado = document.getElementById("campoTempoEstimado");
const urlAPI = "https://public.franciscosensaulas.com";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

async function consultarDadosTransportePorId() {
    const urlParaConsultarTransporte = `${urlAPI}/api/v1/trabalho/transportes/${idParaEditar}`;
    console.log(urlParaConsultarTransporte);
    const resposta = await fetch(urlParaConsultarTransporte);

    if (!resposta.ok) {
        alert("Cadastro de transporte não encontrada");
        window.location.href = "/TrabalhoTransporte/index.html";
        return;
    }

    const dadosTransporte = await resposta.json();
    console.log(dadosTransporte );


    campoVeiculo.value = dadosTransporte .Veiculo;
    campoMotorista.value = dadosTransporte .Motorista;
    campoCarga.value = dadosTransporte .Carga;
    campoPesoCarga.value = dadosTransporte .PesoCarga;
    campoDestino.value = dadosTransporte .Destino;
    campoTempoEstimado.value = dadosTransporte .TempoEstimado;
}

async function editar(evento) {
    evento.preventDefault();


    let Veiculo = campoVeiculo.value;
    let Motorista = campoMotorista.value;
    let Carga = campoCarga.value;
    let PesoCarga = campoPesoCarga.value;
    let Destino = campoDestino.value;
    let TempoEstimado = campoTempoEstimado.value;

    const dados = {
        Veiculo: Veiculo,
        Motorista: Motorista,
        Carga: Carga,
        PesoCarga: PesoCarga,
        Destino: Destino,
        TempoEstimado: TempoEstimado
    };


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
        location.href = '/TrabalhoTransporte/index.html';
    }
}


const botaoEditar = document.getElementById("btn-ajustar");
botaoEditar.addEventListener("click", editar);


consultarDadosTransportePorId();
