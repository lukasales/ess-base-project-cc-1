import React from 'react';
import {
  cardStyle,
  posterStyle,
  placeholderStyle
} from '../styles/videoCardStyles';

export default function VideoCard({ titulo, duracao, ultimaVisualizacao, poster }) {
  return (
    <div style={cardStyle}>
      {poster ? (
        <img src={poster} alt={titulo} style={posterStyle} />
      ) : (
        <div style={placeholderStyle}>Sem imagem</div>
      )}

      <h3>{titulo}</h3>
      <p><strong>Duração:</strong> {duracao}</p>
      {ultimaVisualizacao && (
        <p><strong>Data de última visualização:</strong> {ultimaVisualizacao}</p>
      )}
    </div>
  );
}
