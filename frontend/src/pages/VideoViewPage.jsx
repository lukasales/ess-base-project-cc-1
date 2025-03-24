import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderVideo from '../components/HeaderVideo';
import YouTubePlayer from '../components/YouTubePlayer';
import { getVideoById } from '../services/api';
import {
  container,
  videoBox,
  controlsContainer,
  actionButton,
  loadingText,
} from '../styles/videoViewStyles';

export default function VideoViewPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para Curtir e Compartilhar
  const [isLiked, setIsLiked] = useState(false);
  const [hoverLike, setHoverLike] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [hoverShare, setHoverShare] = useState(false);

  useEffect(() => {
    async function fetchVideo() {
      try {
        setLoading(true);
        const data = await getVideoById(id);
        setVideo(data);
      } catch (err) {
        console.error('Erro ao buscar vídeo:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, [id]);

  // Extrai o ID do link "youtube.com/watch?v=XXX"
  function extractVideoId(link) {
    if (!link.includes('youtube.com/watch')) return '';
    const parts = link.split('v=');
    return parts[1].split('&')[0];
  }

  if (loading) {
    return (
      <div>
        <HeaderVideo />
        <p style={loadingText}>Carregando vídeo...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div>
        <HeaderVideo />
        <p style={loadingText}>Vídeo não encontrado.</p>
      </div>
    );
  }

  const ytVideoId = extractVideoId(video.videoLink);

  // Toggle “Curtir”
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  // Toggle “Compartilhar”
  const handleShareClick = () => {
    setIsShared((prev) => !prev);
    if (!isShared && video && video.videoLink) {
      navigator.clipboard.writeText(video.videoLink).catch((err) => {
        console.error('Erro ao copiar link:', err);
      });
    }
  };

  return (
    <div>
      <HeaderVideo />
      <div style={container}>
        <div style={videoBox}>
          {/* Player fixo (800×450) com “Play/Pause” dentro do snippet */}
          <YouTubePlayer videoId={ytVideoId} />

          {/* Botões Curtir e Compartilhar abaixo */}
          <div style={controlsContainer}>
            <button
              onMouseEnter={() => !isLiked && setHoverLike(true)}
              onMouseLeave={() => setHoverLike(false)}
              onClick={handleLikeClick}
              style={{
                ...actionButton,
                backgroundColor: isLiked
                  ? '#C00'
                  : hoverLike
                    ? 'red'
                    : '#ccc',
                color: isLiked || hoverLike ? '#fff' : '#000',
              }}
            >
              Curtir
            </button>

            <button
              onMouseEnter={() => !isShared && setHoverShare(true)}
              onMouseLeave={() => setHoverShare(false)}
              onClick={handleShareClick}
              style={{
                ...actionButton,
                backgroundColor: isShared
                  ? '#C00'
                  : hoverShare
                    ? 'red'
                    : '#ccc',
                color: isShared || hoverShare ? '#fff' : '#000',
              }}
            >
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
