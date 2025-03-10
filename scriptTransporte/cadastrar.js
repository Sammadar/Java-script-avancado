const urlAPI = "https://public.franciscosensaulas.com";
let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault();

    let campoVeiculo = document.getElementById("campoVeiculo");
    let Veiculo = campoVeiculo.value;

    let campoMotorista = document.getElementById("campoMotorista");
    let Motorista = campoMotorista.value;

    let campoCarga = document.getElementById("campoCarga");
    let Carga = campoCarga.value;

    let campoPesoCarga = document.getElementById("campoPesoCarga");
    let PesoCarga = campoPesoCarga.value;

    let campoDestino = document.getElementById("campoDestino");
    let Destino = campoDestino.value;

    let campoTempoEstimado = document.getElementById("campoTempoEstimado");
    let TempoEstimado = campoTempoEstimado.value;

    if (!Veiculo || !Motorista || !Carga || !PesoCarga || !Destino || !TempoEstimado) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    PesoCarga = parseFloat(PesoCarga.replace(',', '.')); 
    TempoEstimado = parseInt(TempoEstimado.split(':')[0], 10); 

    const dados = {
        veiculo: Veiculo,       
        motorista: Motorista,
        carga: Carga,
        pesoCarga: PesoCarga,
        destino: Destino,
        tempoEstimadoHoras: TempoEstimado, 
    };

    let url = `${urlAPI}/api/v1/trabalho/transportes`;
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível cadastrar");
    } else {
        location.href = '/TrabalhoTransporte/index.html';
    }
}


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
