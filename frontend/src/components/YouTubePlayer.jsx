import React, { useState } from 'react';
import YouTube from 'react-youtube';

/**
 * Componente que exibe o player do YouTube em 800×450,
 * chamando play/pause sem remover o iframe.
 */
export default function YouTubePlayer({ videoId }) {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Quando o player estiver pronto, guardamos a instância
  const onReady = (event) => {
    setPlayer(event.target);
  };

  // Se quiser callbacks de estado do player (opcional)
  const onStateChange = (event) => {
    // event.data => 1=playing, 2=paused, etc.
  };

  // Botão Play/Pause do snippet
  const handlePlayPause = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  // Configurações do player: 800×450
  const opts = {
    width: '800',
    height: '450',
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };

  return (
    <div style={styles.container}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <button onClick={handlePlayPause} style={styles.playButton}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  playButton: {
    marginTop: '10px',
    backgroundColor: '#C00',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
};
