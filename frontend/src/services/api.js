const API_BASE_URL = 'http://localhost:5001/api'; 

export async function getUserHistory(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/history`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar histórico do usuário ${userId}. Status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

export async function getVideoById(videoId) {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar videoId ${videoId}. Status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

export async function likeVideo(videoId) {
  const response = await fetch(`${API_BASE_URL}/videos/${videoId}/like`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Erro ao curtir vídeo');
  const json = await response.json();
  return json.data;
}
