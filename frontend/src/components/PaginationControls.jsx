import React from 'react';
import {
  paginationContainer,
  buttonBase,
  activeButton,
  disabledButton
} from '../styles/paginationStyles';

export default function PaginationControls({ currentPage, totalPages, onPrev, onNext }) {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div style={paginationContainer}>
      <button
        onClick={onPrev}
        disabled={isFirstPage}
        style={
          isFirstPage
            ? { ...buttonBase, ...disabledButton }
            : { ...buttonBase, ...activeButton }
        }
      >
        Anterior
      </button>

      <button
        onClick={onNext}
        disabled={isLastPage}
        style={
          isLastPage
            ? { ...buttonBase, ...disabledButton }
            : { ...buttonBase, ...activeButton }
        }
      >
        Próximo
      </button>
    </div>
  );
}
