Feature: History Service

  Scenario: Retornar todo o histórico para um usuário
    Given que o método getHistory do HistoryService retorna um array com os itens de vídeo com videoIds "101", "203" e "402" para Lucas Sales com id "1"
    When o método getHistory do HistoryService for chamado com o id "1"
    Then o array retornado deve conter a lista com os ids "101", "203" e "402"

  Scenario: Retornar item do histórico por videoId para um usuário
    Given que o método getHistoryItem chamado com "1" para Lucas Sales com id "1" do HistoryService retorna um item com videoId "101"
    When o método getHistoryItem do HistoryService for chamado com o id "101"
    Then o item retornado deve ter videoId "101"

  Scenario: Adicionar histórico para um usuário
    Given Lucas Alcantara com id "3"
    And Lucas Alcantara não possui o vídeo "201" no histórico
    When o método addOrUpdateHistory do HistoryService for chamado com o id "3" e os dados:
      """
      {
        "videoId": "201",
        "titulo": "The Office - Episódio 3"
      }
      """
    Then o status da resposta deve ser "201 Created"
    And o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"
    And agora o histórico do usuário com id "3" possui o id "201"

  Scenario: Atualizar histórico para um usuário
    Given Lucas Alcantara com id "3" já possui o vídeo "201" no histórico
    When o método addOrUpdateHistory do HistoryService for chamado com o id "3" e os dados:
      """
      {
        "videoId": "201",
        "titulo": "The Office - Episódio 3"
      }
      """
    Then o status da resposta deve ser "200 OK"
    And o corpo da resposta (JSON) contém "Data de visualização atualizada"
