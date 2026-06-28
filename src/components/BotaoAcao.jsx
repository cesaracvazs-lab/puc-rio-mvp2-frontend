import React from 'react';
import { Button } from 'react-bootstrap';

const BotaoAcao = ({ texto, variante, icone, onClick, className }) => {
  return (
    <Button 
      variant={variante || 'primary'} 
      onClick={onClick} 
      className={`px-4 py-2 fw-bold shadow-sm rounded-3 transition-all d-inline-flex align-items-center justify-content-center ${className}`}
      style={{ gap: '8px' }}
    >
      {icone && <span>{icone}</span>}
      {texto}
    </Button>
  );
};

export default BotaoAcao;