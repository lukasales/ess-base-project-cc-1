const { loadFeature, defineFeature } = require('jest-cucumber');
const VideoService = require('../../src/services/video.service');
const VideoRepository = require('../../src/repositories/video.repository');
const db = require('../../src/database');

const feature = loadFeature('tests/features/video-service.feature');

defineFeature(feature, (test) => {
  let serviceResult;
  let errorCaught;
  let videoService;

  beforeAll(async () => {
    const instance = await db.getInstance();
    await instance.seed();
    const videoRepo = new VideoRepository();
    await videoRepo.init();
    videoService = new VideoService(videoRepo);
  });

  test('Retornar vídeo por videoId', ({ given, when, then }) => {
    given('que o método getVideo do VideoService retorna um vídeo com videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"', () => {
    });

    when('o método getVideo do VideoService for chamado com o id "101"', async () => {
      try {
        serviceResult = await videoService.getVideo('101');
      } catch (err) {
        errorCaught = err;
      }
    });

    then('o vídeo retornado deve ter videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"', () => {
      if (errorCaught) throw errorCaught;
      expect(serviceResult.videoId).toBe('101');
      expect(serviceResult.titulo).toBe('Stranger Things - Piloto');
      expect(serviceResult.duracao).toBe('45 minutos');
    });
  });
});
