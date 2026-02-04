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
// 5. Função para Limpar e Reconstruir a Lista
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
    // 4. Recarrega a lista visual para incluir o novo item
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

carregarTarefas();
