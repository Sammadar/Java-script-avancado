const campoProduto = document.getElementById("campoProduto");
const campoQuantidade = document.getElementById("campoQuantidade");
const campoValorTotal = document.getElementById("campoValorTotal");
const urlAPI = "https://public.franciscosensaulas.com";

// Obtendo o parâmetro 'id' da URL
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

async function consultarDadosVendaPorId() {
    // Verifica se existe um 'id' válido na URL
    if (!idParaEditar) {
        alert("ID de venda não encontrado na URL.");
        window.location.href = "/TrabalhoVenda/index.html"; // Redireciona caso o id esteja faltando
        return;
    }

    // URL para consulta da venda
    const urlParaConsultarVenda = `${urlAPI}/api/v1/trabalho/vendas/${idParaEditar}`;
    console.log("Consultando dados da venda na URL:", urlParaConsultarVenda);

    try {
        // Requisição GET para consultar os dados da venda
        const resposta = await fetch(urlParaConsultarVenda);

        // Verifica se a resposta da API foi bem-sucedida (status 200)
        if (!resposta.ok) {
            console.error("Erro ao consultar dados:", resposta.status, resposta.statusText);
            alert("Venda não encontrada.");
            window.location.href = "/TrabalhoVenda/index.html"; // Redireciona caso a venda não seja encontrada
            return;
        }

        // Converte a resposta para JSON
        const dadosVenda = await resposta.json();
        console.log("Estrutura dos dados recebidos:", dadosVenda);

        // Verifica se os dados esperados estão presentes
        if (dadosVenda.produto && dadosVenda.quantidade && dadosVenda.valorTotal) {
            campoProduto.value = dadosVenda.produto;   // Nome do campo "produto" conforme a API
            campoQuantidade.value = dadosVenda.quantidade; // Nome do campo "quantidade"
            campoValorTotal.value = dadosVenda.valorTotal; // Nome do campo "valorTotal"
        } else {
            console.error("Erro: Dados da venda incompletos ou inesperados", dadosVenda);
            alert("Erro ao carregar os dados da venda.");
        }
    } catch (erro) {
        // Captura e exibe qualquer erro no processo de requisição
        console.error("Erro ao consultar os dados da venda:", erro);
        alert("Erro ao tentar obter os dados da venda.");
    }
}

async function editar(evento) {
    // Previne o comportamento padrão do formulário (evita o envio)
    evento.preventDefault();

    // Captura os dados inseridos pelo usuário nos campos do formulário
    let Produto = campoProduto.value;
    let Quantidade = campoQuantidade.value;
    let ValorTotal = campoValorTotal.value;

    // Valida se todos os campos foram preenchidos
    if (!Produto || !Quantidade || !ValorTotal) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria um objeto com os dados para enviar à API
    const dados = {
        Produto: Produto,
        Quantidade: Quantidade,
        ValorTotal: ValorTotal
    };

    // URL para a requisição PUT para editar a venda
    let url = `${urlAPI}/api/v1/trabalho/vendas/${idParaEditar}`;

    try {
        // Envia os dados para editar a venda
        const resposta = await fetch(url, {
            method: "PUT", // Método PUT para atualização
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados) // Envia os dados no corpo da requisição
        });

        // Verifica se a requisição foi bem-sucedida
        if (!resposta.ok) {
            const erro = await resposta.json();
            alert(erro.message || "Não foi possível alterar");
        } else {
            alert("Venda ajustada com sucesso!");
            location.href = '/TrabalhoVenda/index.html'; // Redireciona para a página inicial após sucesso
        }
    } catch (erro) {
        // Captura qualquer erro durante a requisição PUT
        console.error("Erro ao editar dados da venda:", erro);
        alert("Erro ao tentar editar os dados.");
    }
}

// Adiciona o evento ao botão de editar
const botaoEditar = document.getElementById("btn-ajustar");
botaoEditar.addEventListener("click", editar);

// Chama a função para preencher os dados da venda ao carregar a página
consultarDadosVendaPorId();
