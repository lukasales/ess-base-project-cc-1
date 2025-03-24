const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

class Database {
  static async getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
      await Database.instance._init();
    }
    return Database.instance;
  }

  async _init() {
    const dbPath = process.env.ENV === 'TEST'
      ? ':memory:'
      : path.resolve(process.cwd(), 'database.sqlite');
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    await this.db.exec('PRAGMA foreign_keys = ON;');
    await this.initialize();
  }

  async initialize() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        nome TEXT
      );
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        videoId TEXT,
        titulo TEXT,
        duracao TEXT,
        views INTEGER,
        likes INTEGER,
        videoLink TEXT,
        posterLink TEXT
      );
      CREATE TABLE IF NOT EXISTS histories (
        id TEXT PRIMARY KEY,
        userId TEXT,
        videoId TEXT,
        ultimaVisualizacao TEXT,
        FOREIGN KEY(userId) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS lists (
        id TEXT PRIMARY KEY,
        userId TEXT,
        videoIds TEXT,
        titulo TEXT
      );
    `);
  }  

  static async reset() {
    const instance = await Database.getInstance();
    await instance.db.exec(`
      DROP TABLE IF EXISTS videos;
      DROP TABLE IF EXISTS histories;
      DROP TABLE IF EXISTS users;
    `);
    await instance.initialize();
  }

  async seed() {
    await this.db.exec(`
      INSERT OR IGNORE INTO users (id, nome) VALUES 
        ('1', 'User 1'),
        ('2', 'User 2'),
        ('3', 'User 3');
    `);
  
    await this.db.exec(`
      INSERT OR IGNORE INTO videos (id, videoId, titulo, duracao, views, likes, videoLink, posterLink) VALUES
        ('${Date.now()}-101', '101', 'Stranger Things - Piloto', '45 minutos', 0, 0, 'https://www.youtube.com/watch?v=RMmGQNNl164', 'https://uauposters.com.br/media/catalog/product/2/0/201906131341-uau-posters-series-seriado-stranger-things.jpg'),
        ('${Date.now()}-102', '102', 'Breaking Bad - Piloto', '60 minutos', 0, 0, 'https://www.youtube.com/watch?v=HhesaQXLuRY', 'https://upload.wikimedia.org/wikipedia/pt/e/e9/Breaking_bad_2_temporada_poster.jpg'),
        ('${Date.now()}-103', '103', 'Homem-Aranha: Através do Aranha Verso', '2 Horas', 0, 0, 'https://www.youtube.com/watch?v=_4is7I_ZxTg', 'https://img.elo7.com.br/product/zoom/4AF71AF/big-poster-homem-aranha-atraves-do-aranhaverso-90x60-cm-004-poster-de-filme.jpg'),
        ('${Date.now()}-104', '104', 'Pearl', '2 Horas', 0, 0, 'https://www.youtube.com/watch?v=7MRcuN9_Pfo', 'https://uauposters.com.br/media/catalog/product/cache/1/thumbnail/800x930/9df78eab33525d08d6e5fb8d27136e95/4/6/468220230615-uau-posters-pearl-filmes-3.jpg');
    `);
  
    const now = new Date().toISOString();
    await this.db.exec(`
      INSERT OR IGNORE INTO histories (id, userId, videoId, ultimaVisualizacao) VALUES
        ('${Date.now()}-h1', '1', '101', '${now}'),
        ('${Date.now()}-h2', '1', '102', '${now}'),
        ('${Date.now()}-h3', '1', '103', '${now}'),
        ('${Date.now()}-h4', '1', '104', '${now}');
    `);
  }
}

module.exports = Database;
