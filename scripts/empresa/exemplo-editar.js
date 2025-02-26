const campoNome = document.getElementById('campoNome');
const campoCnpj = document.getElementById('campoCnpj');
const urlAPI = "https://public.franciscosensaulas.com"
const mascara = {
    mask: "00.000.000/0000-00"
};

const mask = IMask(campoCnpj, mascara);

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

async function consultarDadosEmpresaPorId() {
    const urlParaConsultarEmpresas = `${urlAPI}/api/v1/empresa/${idParaEditar}`
    console.log(urlParaConsultarEmpresas);
    const resposta = await fetch(urlParaConsultarEmpresas);

    if (resposta.ok == false) {
        alert("Empresa não encontrada");
        window.location.href = "/exemplo-requisicoes.html";
    }

    const dadosEmpresa = await resposta.json();
    console.log(dadosEmpresa);

    campoNome.value = dadosEmpresa.nome;
    campoCnpj.value = dadosEmpresa.cnpj;
}
async function editar(evento) {
    evento.preventDefault();

    let cnpj = campoCnpj.value;
    let nome = campoNome.value;

    const dados = {
        nome: nome,
        cnpj: cnpj
    }
    let url = `${urlAPI}/api/v1/empresa/${idParaEditar}`;
    const resposta = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possível alterar")
    } else {
        location.href = '/empresa/index.html';
    }
}

const botaoEditar = document.getElementById("botao-alterar");
botaoEditar.addEventListener("click", editar);

consultarDadosEmpresaPorId();