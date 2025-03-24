import React from 'react';
import { Link } from 'react-router-dom';
import {
  headerStyle,
  leftContainer,
  titleStyle,
  subtitleStyle,
  rightContainer,
  searchInput,
  searchButton,
} from '../styles/headerStyles';

export default function HeaderHome() {
  return (
    <header style={headerStyle}>
      <div style={leftContainer}>
        <h1 style={titleStyle}>
          <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            CINEvideo
          </Link>
        </h1>
        <h2 style={subtitleStyle}>Home</h2>
        {/* Botão para ir ao histórico */}
        <Link to="/history" style={styles.historyButton}>
          Histórico
        </Link>
      </div>
      <div style={rightContainer}>
        <input type="text" placeholder="Pesquisar" style={searchInput} />
        <button style={searchButton}>🔍</button>
      </div>
    </header>
  );
}

const styles = {
  historyButton: {
    backgroundColor: '#C00',
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    marginTop: '10px',
    display: 'inline-block',
  },
};
