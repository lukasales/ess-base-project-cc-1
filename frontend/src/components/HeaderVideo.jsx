import React from 'react';
import { Link } from 'react-router-dom';
import {
  headerStyle,
  leftContainer,
  titleStyle,
  subtitleStyle,
  rightContainer,
  searchInput,
  searchButton
} from '../styles/headerStyles';

export default function HeaderVideo() {
  return (
    <header style={headerStyle}>
      <div style={leftContainer}>
        <h1 style={titleStyle}>
          {/* "CINEvideo" vira um Link para "/home" */}
          <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            CINEvideo
          </Link>
        </h1>
        <h2 style={subtitleStyle}>Visualização</h2>
      </div>
      <div style={rightContainer}>
        <input
          type="text"
          placeholder="Pesquisar"
          style={searchInput}
        />
        <button style={searchButton}>🔍</button>
      </div>
    </header>
  );
}
