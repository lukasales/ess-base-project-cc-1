import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import PaginationControls from './PaginationControls';
import { container, videoGrid, emptyMessage } from '../styles/historyListStyles';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 2;

export default function HistoryList({ videos, resetKey }) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!resetKey) {
      setCurrentPage(0);
    }
  }, [resetKey]);

  if (!videos || videos.length === 0) {
    return (
      <div style={emptyMessage}>
        Seu histórico está vazio! <br />
        Comece a explorar nossos vídeos.
      </div>
    );
  }

  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = videos.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={container}>
      <div style={videoGrid}>
        {currentItems.map((video) => (
          <Link
            key={video.videoId}
            to={`/video/${video.videoId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <VideoCard
              titulo={video.titulo}
              duracao={video.duracao}
              ultimaVisualizacao={video.ultimaVisualizacao}
              poster={video.posterLink}
            />
          </Link>
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
