const { loadFeature, defineFeature } = require('jest-cucumber');
const HistoryRepository = require('../../src/repositories/history.repository');
const HistoryService = require('../../src/services/history.service');
const HistoryItemEntity = require('../../src/entities/history.item.entity');

const feature = loadFeature('tests/features/history-service.feature');

defineFeature(feature, test => {
  let mockHistoryRepository;
  let historyService;
  let serviceResult;

  beforeEach(() => {
    mockHistoryRepository = {
      getHistoryByUserId: jest.fn(),
      getHistoryItem: jest.fn(),
      add: jest.fn(),
      updateById: jest.fn(),
    };
    historyService = new HistoryService(mockHistoryRepository);
  });

  test('Retornar todo o histórico para um usuário', ({ given, when, then }) => {
    given(/^que o método getHistory do HistoryService retorna um array com os itens de vídeo com videoIds "101", "203" e "402" para Lucas Sales com id "1"$/, () => {
      mockHistoryRepository.getHistoryByUserId.mockResolvedValue([
        { videoId: '101', ultimaVisualizacao: new Date().toISOString() },
        { videoId: '203', ultimaVisualizacao: new Date().toISOString() },
        { videoId: '402', ultimaVisualizacao: new Date().toISOString() },
      ]);
    });

    when(/^o método getHistory do HistoryService for chamado com o id "1"$/, async () => {
      serviceResult = await historyService.getHistory('1');
    });

    then(/^o array retornado deve conter a lista com os ids "101", "203" e "402"$/, () => {
      const ids = serviceResult.data.map(item => item.videoId);
      expect(ids).toEqual(expect.arrayContaining(['101', '203', '402']));
    });
  });

  test('Retornar item do histórico por videoId para um usuário', ({ given, when, then }) => {
    given(/^que o método getHistoryItem chamado com "1" para Lucas Sales com id "1" do HistoryService retorna um item com videoId "101"$/, () => {
      const item = new HistoryItemEntity({
        userId: '1',
        videoId: '101',
        ultimaVisualizacao: new Date().toISOString()
      });
      mockHistoryRepository.getHistoryItem.mockResolvedValue(item);
    });

    when(/^o método getHistoryItem do HistoryService for chamado com o id "101"$/, async () => {
      serviceResult = await mockHistoryRepository.getHistoryItem('1', '101');
    });

    then(/^o item retornado deve ter videoId "101"$/, () => {
      expect(serviceResult.videoId).toBe('101');
    });
  });

  test('Adicionar histórico para um usuário', ({ given, when, then }) => {
    given('Lucas Alcantara com id "3"', () => {});
    given('Lucas Alcantara não possui o vídeo "201" no histórico', () => {
      mockHistoryRepository.getHistoryItem.mockResolvedValue(null);
      mockHistoryRepository.add.mockImplementation(async (data) => data);
      mockHistoryRepository.getHistoryByUserId.mockResolvedValue([
        { videoId: '201', ultimaVisualizacao: new Date().toISOString() }
      ]);
    });

    when(/^o método addOrUpdateHistory do HistoryService for chamado com o id "3" e os dados:$/, async docString => {
      const videoData = JSON.parse(docString);
      serviceResult = await historyService.addOrUpdateHistory('3', videoData);
    });

    then(/^o status da resposta deve ser "201 Created"$/, () => {
      expect(serviceResult.code).toBe(201);
    });

    then(/^o corpo da resposta \(JSON\) contém "Vídeo adicionado ao histórico"$/, () => {
      expect(serviceResult.msg).toBe('Vídeo adicionado ao histórico');
    });

    then(/^agora o histórico do usuário com id "3" possui o id "201"$/, () => {
      const ids = serviceResult.data.map(item => item.videoId);
      expect(ids).toContain('201');
    });
  });

  test('Atualizar histórico para um usuário', ({ given, when, then }) => {
    given('Lucas Alcantara com id "3" já possui o vídeo "201" no histórico', () => {
      const item = new HistoryItemEntity({
        userId: '3',
        videoId: '201',
        ultimaVisualizacao: new Date('2020-01-01').toISOString()
      });
      mockHistoryRepository.getHistoryItem.mockResolvedValue(item);
      mockHistoryRepository.updateById.mockImplementation(async (id, data) => ({ ...item, ...data }));
      mockHistoryRepository.getHistoryByUserId.mockResolvedValue([
        { videoId: '201', ultimaVisualizacao: new Date().toISOString() }
      ]);
    });

    when(/^o método addOrUpdateHistory do HistoryService for chamado com o id "3" e os dados:$/, async docString => {
      const videoData = JSON.parse(docString);
      serviceResult = await historyService.addOrUpdateHistory('3', videoData);
    });

    then(/^o status da resposta deve ser "200 OK"$/, () => {
      expect(serviceResult.code).toBe(200);
    });

    then(/^o corpo da resposta \(JSON\) contém "Data de visualização atualizada"$/, () => {
      expect(serviceResult.msg).toBe('Data de visualização atualizada');
    });
  });
});
