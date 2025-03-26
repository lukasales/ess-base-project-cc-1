Feature: Página de Histórico
  Como um usuário
  Quero acessar a página de histórico de vídeos assistidos
  Para que eu possa verificar quais vídeos já vi e paginar entre eles

  Background:
    Dado que estou na página "/history"

  Scenario: Exibir título e subtítulo
    Então deve exibir o título "CINEvideo"
    E deve exibir o subtítulo "Histórico"

  Scenario: Exibir mensagem de histórico vazio
    Dado que o endpoint retorna nenhum vídeo
    Quando a página de histórico for carregada
    Então deve aparecer a mensagem "Seu histórico está vazio!"
    E a mensagem "Comece a explorar nossos vídeos."

  Scenario: Filtrar vídeos pelo termo "Pearl"
    Dado que o endpoint retorna 4 vídeos, incluindo "Pearl"
    Quando eu digitar "Pearl" no campo de pesquisa
    E clicar no botão de pesquisa
    Então deve exibir apenas o card do vídeo "Pearl"

  Scenario: Navegar pelas páginas do histórico
    Dado que o endpoint retorna mais de 2 vídeos
    Quando estiver na primeira página
    Então o botão "Anterior" deve estar desabilitado
    E o botão "Próximo" deve estar habilitado

    Quando clicar no botão "Próximo"
    Então deve carregar a segunda página do histórico
    E se não houver mais páginas seguintes
      o botão "Próximo" deve ficar desabilitado

    Quando clicar no botão "Anterior"
    Então deve voltar para a página anterior
    E se estiver na primeira página
      o botão "Anterior" deve ficar desabilitado

  Scenario: Voltar para Home pelo link "CINEvideo"
    Quando clicar no link "CINEvideo"
    Então deve navegar para a página "/home"

  Scenario: Limpar o campo de busca deve resetar para a primeira página
    Dado que o endpoint retorna múltiplos vídeos
    Quando eu digitar "Breaking Bad" no campo de pesquisa
    E clicar no botão de pesquisa
    Então deve aparecer somente "Breaking Bad - Piloto"
    Quando eu apagar o campo de pesquisa
    Então deve voltar a mostrar todos os vídeos
    E deve exibir a primeira página do histórico

  Scenario: Clicar no card do vídeo
    Dado que o endpoint retorna pelo menos um vídeo "Stranger Things - Piloto"
    Quando eu clicar no card "Stranger Things - Piloto"
    Então deve navegar para a página "/video/101"

  Scenario: Exibir barra de pesquisa e botão de lupa
    Então deve exibir um campo de pesquisa
    E deve exibir o botão de pesquisa "🔍"

  Scenario: Exibir botões de paginação
    Então deve exibir o botão "Anterior"
    E deve exibir o botão "Próximo"