Feature: Página de Visualização de Vídeo
  Como um usuário
  Quero abrir a página de vídeo e conseguir reproduzir o conteúdo
  Para que eu possa pausar, curtir e compartilhar

  Background:
    Dado que estou na página "/video/101"

  Scenario: Exibir título e subtítulo
    Então deve exibir o título "CINEvideo"
    E deve exibir o subtítulo "Visualização"

  Scenario: Clicar no link "CINEvideo" deve ir para a Home
    Quando eu clicar no link "CINEvideo"
    Então deve navegar para a página "/home"

  Scenario: Exibir botão "Histórico" que redireciona
    Então deve exibir o botão "Histórico"
    Quando clicar no botão "Histórico"
    Então deve navegar para a página "/history"

  Scenario: Exibir barra de pesquisa e lupa
    Então deve exibir um campo de pesquisa
    E deve exibir o botão de pesquisa "🔍"

  Scenario: Player do YouTube e botões de play/pause
    Quando a página de vídeo for carregada
    Então deve exibir um player de vídeo do YouTube
    E deve exibir o botão "Play"
    Quando clicar no botão "Play"
    Então o vídeo deve começar a tocar
    Quando clicar no botão "Pause"
    Então o vídeo deve pausar

  Scenario: Hover e clique nos botões
    Então o botão "Curtir" deve ficar vermelho ao passar o mouse
    E o botão "Compartilhar" deve ficar vermelho ao passar o mouse
    Quando eu clicar no botão "Curtir"
    Então ele deve ficar vermelho permanentemente
    Quando eu clicar no botão "Compartilhar"
    Então ele deve ficar vermelho permanentemente
    E deve copiar o link do vídeo para a área de transferência

    Scenario: Exibir botões principais
      Então deve exibir o botão "Curtir"
      E deve exibir o botão "Compartilhar"
      E deve exibir o botão "Play"