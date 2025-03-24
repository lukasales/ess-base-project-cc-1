import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HistoryList from '../components/HistoryList';
import { getUserHistory, getVideoById } from '../services/api';

export default function HistoryPage() {
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const rawHistory = await getUserHistory('1');
        const videosCompletos = await Promise.all(
          rawHistory.map(async (videoId) => {
            const info = await getVideoById(videoId);
            return {
              ...info,
              ultimaVisualizacao: new Date().toLocaleDateString(),
            };
          })
        );
        setVideosData(videosCompletos);
      } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        setVideosData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const filtered = videosData.filter((v) =>
    v.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <Header setSearchTerm={setSearchTerm} />
        <p style={styles.loadingText}>Carregando...</p>
      </div>
    );
  }

  if (searchTerm && filtered.length === 0) {
    return (
      <div>
        <Header setSearchTerm={setSearchTerm} />
        <p style={styles.notFound}>Esse filme ainda não foi assistido.</p>
      </div>
    );
  }

  return (
    <div>
      <Header setSearchTerm={setSearchTerm} />
      {}
      <HistoryList videos={filtered} resetKey={searchTerm} />
    </div>
  );
}

const styles = {
  loadingText: {
    textAlign: 'center',
    marginTop: '50px',
    color: 'red',
    fontSize: '24px',
  },
  notFound: {
    textAlign: 'center',
    marginTop: '50px',
    color: 'red',
    fontSize: '24px',
  },
};
