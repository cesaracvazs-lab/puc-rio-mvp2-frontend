import { Card } from 'react-bootstrap';

const BlocoInfo = ({ icone, rotulo, valor }) => {
  return (
    <Card className="bg-light border-0 h-100 shadow-sm">
      <Card.Body className="d-flex align-items-center p-3">
        <div className="fs-3 me-3 text-primary bg-white p-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
          {icone || '🔹'}
        </div>
        <div className="text-truncate">
          <small className="text-muted d-block text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.75rem' }}>
            {rotulo}
          </small>
          <span className="fs-5 fw-semibold text-dark text-wrap">
            {valor || 'Não informado'}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlocoInfo;