import React, { useState, useEffect } from 'react';
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

export default function Header({ setSearchTerm }) {
  const [localTerm, setLocalTerm] = useState('');

  useEffect(() => {
    if (localTerm === '') {
      setSearchTerm('');
    }
  }, [localTerm, setSearchTerm]);

  const handleSearchClick = () => {
    setSearchTerm(localTerm);
  };

  return (
    <header style={headerStyle}>
      <div style={leftContainer}>
        <h1 style={titleStyle}>
          {/* "CINEvideo" vira um Link para "/home" */}
          <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            CINEvideo
          </Link>
        </h1>
        <h2 style={subtitleStyle}>Histórico</h2>
      </div>

      <div style={rightContainer}>
        <input
          type="text"
          placeholder="Pesquisar"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          style={searchInput}
        />
        <button style={searchButton} onClick={handleSearchClick}>
          🔍
        </button>
      </div>
    </header>
  );
}
