# 📝 Lista de Tarefas (To-Do List)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> Aplicação de gerenciamento de tarefas com persistência de dados local.

## 💻 Sobre o Projeto

Este projeto é uma aplicação clássica de "To-Do List" (Lista de Tarefas), mas com um diferencial técnico importante: o uso do **Local Storage** do navegador. Isso permite que o usuário adicione tarefas, feche a aba ou recarregue a página, e suas anotações continuem salvas.

O foco do desenvolvimento foi a lógica de manipulação de Arrays de Objetos e a conversão de dados para JSON.

## ✨ Funcionalidades

* **Adicionar Tarefas:** Input de texto com validação (não permite tarefas vazias).
* **Marcar como Concluída:** Clique na tarefa para riscar o texto (toggle visual).
* **Excluir Tarefa:** Botão específico para remover o item da lista.
* **Persistência de Dados:** As tarefas ficam salvas na memória do navegador (`localStorage`).

## 📸 Preview

<div align="center">
  <img src="./print-inicial.png" width="600px" alt="Lista de Tarefas funcionando">
  <img src="./print-resultado.png" width="600px" alt="Lista de Tarefas funcionando">
</div>

---

## 🛠 Tecnologias e Conceitos

* **HTML5 & CSS3:** Estrutura e estilização da lista.
* **JavaScript (ES6+):**
    * **Manipulação do DOM:** Criação dinâmica de elementos `<li>` e `<button>`.
    * **Local Storage:** Uso de `setItem` e `getItem` para salvar dados no navegador.
    * **JSON:** Uso de `JSON.stringify()` (para salvar) e `JSON.parse()` (para ler).
    * **Eventos:** `click`, `stopPropagation` (para evitar conflito de cliques entre o botão de remover e a tarefa).
    * **Manipulação de Arrays:** Métodos como `push`, `splice` e `forEach`.

---

## 👩‍💻 Autora

**Isabelle Christina**

---
*Projeto desenvolvido para estudo de Lógica de Programação e Armazenamento Local.* 💾
