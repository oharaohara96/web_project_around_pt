🏙️ Around The U.S. (Versão com Integração de API)

Uma aplicação web interativa de rede social onde os usuários podem compartilhar fotos de lugares incríveis, curtir publicações, excluir seus próprios cards e personalizar as informações do perfil. Esta versão representa um estágio avançado do currículo da TripleTen, integrando totalmente o front-end a uma API RESTful real por meio de Programação Orientada a Objetos (POO).

🚀 Novas Funcionalidades e Implementações (Último Sprint)

Persistência de dados via REST API: Todos os dados, incluindo perfil de usuário, cards e curtidas, são sincronizados em tempo real com um servidor remoto, mantendo o estado mesmo após recarregar a página.

Atualização da imagem de perfil (Avatar): Implementado um novo pop-up para alterar a foto do avatar enviando a URL da imagem diretamente ao servidor via método PATCH.

Efeito hover interativo no avatar: UI refinada com base nas diretrizes do Figma, exibindo um ícone de edição (lápis) e uma sobreposição escura ao passar o mouse.

Controle rigoroso de permissões de exclusão (Ícone de lixeira dinâmico): Identifica o ID exclusivo do usuário conectado e exibe o ícone de lixeira apenas nos cards criados por ele, impedindo a exclusão acidental de publicações de outros usuários.

Pop-up de confirmação de exclusão: Antes de remover permanentemente um card do servidor, é exibido um pop-up de confirmação ajustado rigorosamente às especificações do Figma (430px × 181px).

Melhoria na UX (Indicador "Salvando..."): Durante o processamento de requisições assíncronas, o texto do botão de envio em todos os formulários (perfil, novo card, avatar) muda dinamicamente para "Salvando...", fornecendo feedback imediato ao usuário.

Sincronização inicial eficiente de dados (Promise.all): Os cards só são renderizados na tela após obter com sucesso as informações do usuário no servidor, garantindo que o controle de exibição da lixeira e o estado das curtidas funcionem com precisão desde o primeiro carregamento.

🛠️ Tecnologias Utilizadas e Conceitos Avançados

Design baseado em classes (POO): Estrutura de código robusta, baseada em classes reutilizáveis com princípio de responsabilidade única:

Api: Gerencia e modulariza todas as requisições de rede (fetch, configuração de cabeçalhos, roteamento e tratamento de erros).

Classes e heranças: Card, FormValidator, Section, UserInfo e Popup (PopupWithForm, PopupWithImage, PopupWithConfirmation).

Manipulação de requisições HTTP (Fetch API): Utilização de diversos métodos HTTP essenciais para o gerenciamento do banco de dados:

GET: Obtenção das informações do perfil e do feed de cards.

PATCH: Atualização das informações de texto e da imagem do avatar.

POST: Criação de novos cards de locais.

PUT / DELETE: Adição/remoção de curtidas e exclusão de cards do servidor.

Processamento assíncrono seguro: Centralização da verificação de respostas do servidor por meio do método privado _checkResponse, implementando um tratamento de erros adequado com Promise.reject() e blocos .catch().

📱 Design Responsivo

Totalmente em conformidade com as novas regras de design do Figma, mantendo a consistência visual. O novo pop-up de confirmação de exclusão e o contêiner do avatar foram desenvolvidos de forma fluida, garantindo uma visualização confortável desde ambientes desktop até dispositivos móveis de 320px.
