const BaseEntity = require('./base.entity');

class VideoEntity extends BaseEntity {
  constructor({ 
    videoId, 
    titulo, 
    duracao, 
    views, 
    likes, 
    videoLink = '', 
    posterLink = ''  // <-- declare aqui
  }) {
    super();
    this.videoId = videoId;
    this.titulo = titulo;
    this.duracao = duracao;
    this.views = views;
    this.likes = likes;
    this.videoLink = videoLink;
    this.posterLink = posterLink; // <-- agora existe no construtor
  }
}

module.exports = VideoEntity;
