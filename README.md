# 🏙️ Around The U.S. (Edição Integrada com API)

Um projeto interativo de rede social onde os usuários podem compartilhar fotos de lugares incríveis, curtir postagens, deletar seus próprios cartões e personalizar suas informações de perfil. Esta versão marca a conclusão avançada do projeto dentro do currículo da TripleTen, integrando o front-end a uma API RESTful real através de Programação Orientada a Objetos (POO).

---

## 🚀 Novas Funcionalidades e Implementações (Sprint Atual)

* **Persistência com API REST:** Todos os dados (perfil do usuário, cartões e curtidas) agora são sincronizados em tempo real com um servidor remoto, sobrevivendo a recarregamentos de página.
* **Atualização de Foto de Perfil (Avatar):** Implementação de um novo pop-up que permite alterar a foto de perfil enviando um link de imagem diretamente para o servidor via método `PATCH`.
* **Efeito Hover Interativo no Avatar:** Interface refinada de acordo com o Figma, exibindo um ícone de edição (lápis) e uma camada escurecida ao passar o mouse sobre a foto do usuário.
* **Controle Estrito de Exclusão (Lixeiras Dinâmicas):** O sistema agora identifica o ID exclusivo do usuário logado. O ícone da lixeira é exibido **apenas** nos cartões criados por você, impedindo a exclusão de postagens de outros usuários.
* **Pop-up de Confirmação de Exclusão:** Antes de deletar um cartão permanentemente do servidor, um pop-up de segurança com medidas exatas do Figma ($430px \times 181px$) é aberto para confirmar a ação.
* **Aperfeiçoamento Geral de UX ("Salvando..."):** Todos os formulários de envio (Perfil, Novo Card e Avatar) agora alteram dinamicamente o texto do botão de envio para "Salvando..." enquanto a requisição assíncrona está em andamento, fornecendo feedback visual instantâneo.
* **Sincronização Inicial Inteligente (`Promise.all`):** Os cartões só são renderizados na tela após o aplicativo receber com sucesso as informações do usuário do servidor, garantindo que o controle de lixeiras e curtidas funcione perfeitamente desde o primeiro milissegundo.

---

## 🛠️ Tecnologias e Conceitos Avançados Utilizados

* **Arquitetura Baseada em Classes (POO):** Organização robusta do código através de classes reutilizáveis e com responsabilidades únicas:
    * `Api`: Responsável por isolar todas as requisições à rede (`fetch`, cabeçalhos, rotas e tratamento de erros).
    * `Card`, `FormValidator`, `Section`, `UserInfo` e a árvore de extensões de `Popup` (`PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`).
* **Manipulação de Requisições HTTP (Fetch API):** Uso pleno dos métodos HTTP para gerenciamento do banco de dados:
    * `GET` para buscar o perfil e o feed de cartões.
    * `PATCH` para atualizar as informações textuais e a foto do avatar.
    * `POST` para a criação de novos locais.
    * `PUT` e `DELETE` para adicionar ou remover curtidas e excluir cartões do servidor.
* **Tratamento Assíncrono Seguro:** Centralização da validação de respostas do servidor através de um método utilitário privado (`_checkResponse`), fazendo o uso correto de `Promise.reject()` e capturando falhas de rede de forma limpa em blocos `.catch()`.

---

## 📱 Responsividade e Design

O design foi totalmente mantido e adaptado às novas regras do Figma. O novo pop-up de confirmação de exclusão e o container de avatar foram estruturados de forma fluida, garantindo consistência desde monitores desktop até dispositivos móveis de 320px.
