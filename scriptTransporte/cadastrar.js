const urlAPI = "https://public.franciscosensaulas.com"
let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault();

    let campoVeiculo = document.getElementById("campoVeiculo");
    let Veiculo = campoVeiculo.value

    let campoMotorista = document.getElementById("campoMotorista");
    let Motorista = campoMotorista.value

    let campoCarga = document.getElementById("campoCarga");
    let Carga = campoCarga.value

    let campoPesoCarga = document.getElementById("campoPesoCarga");
    let PesoCarga = campoPesoCarga.value
    
    let campoDestino = document.getElementById("campoDestino");
    let Destino = campoDestino.value

    let campoTempoEstimado = document.getElementById("campoTempoEstimado");
    let TempoEstimado = campoTempoEstimado.value

    const dados = {
        Veiculo: Veiculo,
        Motorista: Motorista,
        Carga: Carga,
        PesoCarga: PesoCarga,
        Destino: Destino,
        TempoEstimado: TempoEstimado

    }
    let url = `${urlAPI}/api/v1/trabalho/transportes`;
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível cadastrar")
    } else {
        location.href = '/TrabalhoTransporte/index.html';
    }
} 