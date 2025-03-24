export const container = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
};

export const videoBox = {
  width: '840px',          // 800 de player + 40 de padding
  margin: '50px auto',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  padding: '20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

// Se você quiser “videoContainer”, pode remover. Aqui não precisamos.
  
export const controlsContainer = {
  marginTop: '20px',
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
};

export const actionButton = {
  border: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export const loadingText = {
  textAlign: 'center',
  color: 'red',
  marginTop: '50px',
};
