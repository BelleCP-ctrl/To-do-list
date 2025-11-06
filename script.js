// 1. Encontrando os elementos HTML
const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefasUL = document.getElementById('lista-de-tarefas');
// 2. Array Central (O Caderninho de Anotações do JS)
// Tenta carregar do localStorage. Se não houver nada, inicializa como array vazio.
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
// 3. Funções de Persistência (Guardar/Ler)
function salvarTarefas() {
    // Transforma o Array (tarefas) em TEXTO PURO (JSON.stringify) e guarda no localStorage.
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// 4. Função que Cria o Visual da Tarefa (HTML)
// AGORA RECEBEMOS O ÍNDICE DA TAREFA NO ARRAY PRINCIPAL
function criarTarefaVisual(itemTarefa, index) {
    // itemTarefa é um objeto: { texto: "...", concluida: false }
    const li = document.createElement('li');
    li.textContent = itemTarefa.texto;
    // IMPORTANTE: Se a tarefa já está concluída no nosso Array, aplica a classe visual.
    if (itemTarefa.concluida) {
        li.classList.add('concluida');
    }
    // A. Lógica para MARCAR/DESMARCAR (ao clicar na tarefa)
    li.addEventListener('click', () => {
        li.classList.toggle('concluida'); // Alterna a classe no visual
        //ATUALIZAÇÃO SEGURA: Usa o índice para alterar o objeto no array
        tarefas[index].concluida = li.classList.contains('concluida');
        // Salva a mudança no localStorage
        salvarTarefas();
    });
    // B. Cria o Botão de Remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede que o clique no botão ative a função de Marcar (no li)
        // REMOÇÃO SEGURA: Usa o índice para remover o objeto exato no array
        tarefas.splice(index, 1);
        // Remove o visual da tela
        li.remove();
        // Salva a lista nova
        salvarTarefas();
        // Necessário para manter os índices corretos após a remoção:
        // Limpa a lista visual e a constrói novamente a partir do array 'tarefas'.
        recarregarListaVisual();
    });
    // Monta a estrutura
    li.appendChild(btnRemover);
    listaTarefasUL.appendChild(li);
}
// 5. Função para Limpar e Reconstruir a Lista (Necessário após a remoção)
function recarregarListaVisual() {
    listaTarefasUL.innerHTML = ''; // Limpa todos os <li> atuais
    carregarTarefas(); // Constrói a lista visual com os itens restantes e seus novos índices
}

// 6. Evento de Adicionar (Clique no botão)
btnAdicionar.addEventListener('click', function () {
    const textoDigitado = inputTarefa.value.trim();
    if (textoDigitado === "") {
        alert("Por favor, digite algo antes de adicionar.");
        return;
    }
    // 1. Cria o NOVO OBJETO da tarefa
    const novaTarefa = {
        texto: textoDigitado,
        concluida: false
    };
    // 2. Adiciona ao Array Central
    tarefas.push(novaTarefa);
    // 3. Salva a lista atualizada
    salvarTarefas();
    // 4. Recarrega a lista visual para incluir o novo item (e definir o índice correto)
    recarregarListaVisual();
    // 5. Limpa o campo de texto
    inputTarefa.value = "";
    inputTarefa.focus();
});

// 7. Função para Carregar Tarefas Salvas (Ao Abrir a página)
function carregarTarefas() {
    // Percorre cada objeto no Array Central (tarefas)
    tarefas.forEach((itemTarefa, index) => {
        // Passa o objeto e seu índice
        criarTarefaVisual(itemTarefa, index);
    });
}
// --- INÍCIO DA INTEGRAÇÃO DA API ---

function buscarCitacao() {
    // 1. Faz a requisição para a API
    fetch('https://stoicismquote.com/api/v1/quote/random')
        .then(response => {
            // Verifica se a resposta foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error('Erro na rede ou na API: ' + response.statusText);
            }
            return response.json(); // Transforma o corpo da resposta em objeto JS
        })
        .then(data => {
            // 2. Encontra o elemento onde a citação será exibida
            const container = document.querySelector('.container');
            let citacaoElement = document.getElementById('citacao-do-dia');

            // 3. Cria o elemento P se ele ainda não existir
            if (!citacaoElement) {
                citacaoElement = document.createElement('p');
                citacaoElement.id = 'citacao-do-dia';
                // Insere antes da área de input, logo abaixo do H1
                container.insertBefore(citacaoElement, container.querySelector('.input-area')); 
            }

            // 4. Preenche o conteúdo com a citação e o autor
            citacaoElement.innerHTML = `***"${data.content}"*** *— ${data.author}*`;
        })
        .catch(error => {
            console.error('Erro ao buscar citação:', error);
            // Opcional: Mostrar uma mensagem de erro na tela
            const citacaoElement = document.getElementById('citacao-do-dia');
            if (citacaoElement) {
                citacaoElement.textContent = 'Não foi possível carregar a citação. 😔';
            }
        });
}

// --- FIM DA INTEGRAÇÃO DA API ---


// INÍCIO DO PROJETO: Roda as funções necessárias!
// Certifica-se de que a função é chamada assim que o script é carregado
carregarTarefas();

// NOVO: Chama a função da API logo no carregamento
buscarCitacao();
// INÍCIO DO PROJETO: Roda a função para mostrar o que já estava salvo!
// Certifica-se de que a função é chamada assim que o script é carregado
carregarTarefas();