import React from 'react';
import HeaderHome from '../components/HeaderHome';

export default function HomePage() {
  return (
    <div>
      <HeaderHome />
      <h2 style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
        Home – Simulação
      </h2>
    </div>
  );
}
