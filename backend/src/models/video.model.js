class VideoModel {
  constructor(video) {
    this.videoId = video.videoId;
    this.titulo = video.titulo;
    this.duracao = video.duracao;
    this.views = video.views;
    this.likes = video.likes;
    this.videoLink = video.videoLink;
    this.posterLink = video.posterLink;
  }
}

module.exports = VideoModel;
