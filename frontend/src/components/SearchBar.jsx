import React from 'react';
import { searchContainer, searchInput, searchButton } from '../styles/searchBarStyles';

export default function SearchBar() {
  return (
    <div style={searchContainer}>
      <input
        type="text"
        placeholder="Pesquisar"
        style={searchInput}
      />
      <button style={searchButton}>🔍</button>
    </div>
  );
}
