Feature: Histórico de Visualizações (Serviço)

  Scenario: Obter histórico com sucesso (não vazio)
    Given Lucas Sales com id "1"
    And Lucas Sales possui os vídeos "101" e "102" no histórico
    When faço uma requisição GET para "/users/1/history"
    Then o status da resposta é "200 OK"
    And o corpo da resposta (JSON) contém os vídeos "101" e "102"

  Scenario: Obter histórico vazio
    Given Francisco com id "2"
    And Francisco não possui nenhum vídeo no histórico
    When faço uma requisição GET para "/users/2/history"
    Then o status da resposta é "200 OK"
    And o corpo da resposta (JSON) contém uma lista vazia

  Scenario: Obter histórico de usuário inexistente
    Given o id "999" não está no sistema
    When faço uma requisição GET para "/users/999/history"
    Then o status da resposta é "404 Not Found"
    And o corpo da resposta (JSON) indica "Usuário não encontrado"

  Scenario: Adicionar vídeo ao histórico
    Given Lucas Alcantara com id "3"
    And Lucas Alcantara não possui o vídeo "201" no histórico
    When faço uma requisição PUT para "/users/3/history" com o corpo:
      """
      {
        "videoId": "201",
        "titulo": "The Office - Episódio 3"
      }
      """
    Then o status da resposta deve ser "201 Created"
    And o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"
    And agora o histórico do usuário com id "3" possui o vídeo "201"

  Scenario: Atualizar histórico para um usuário
    Given Lucas Alcantara com id "3" já possui o vídeo "201" no histórico
    When faço uma requisição PUT para "/users/3/history" com o corpo:
      """
      {
        "videoId": "201",
        "titulo": "The Office - Episódio 3"
      }
      """
    Then o status da resposta deve ser "200 OK"
    And o corpo da resposta (JSON) contém "Data de visualização atualizada"
