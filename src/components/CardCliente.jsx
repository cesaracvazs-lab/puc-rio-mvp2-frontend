import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CardCliente = ({ cliente }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm border-0 transition-all">
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="fw-bold fs-5 mb-0 text-truncate" style={{ maxWidth: '70%' }}>
              {cliente.nome}
            </Card.Title>
            <Badge bg={cliente.status === 'Ativo' ? 'success' : 'secondary'} className="px-2 py-1">
              {cliente.status}
            </Badge>
          </div>

          <Card.Text className="text-muted mb-1 small">
            <strong>Cidade:</strong> {cliente.cidade || '—'}
          </Card.Text>
          <Card.Text className="text-muted mb-1 small">
            <strong>Sexo:</strong> {cliente.sexo || '—'}
          </Card.Text>
          <Card.Text className="text-muted mb-3 small">
            <strong>Nasc.:</strong> {cliente.dataNascimento ? new Date(cliente.dataNascimento).toLocaleDateString('pt-BR') : '—'}
          </Card.Text>
        </div>

        <Button
          variant="outline-primary"
          size="sm"
          className="w-100 fw-semibold mt-2"
          onClick={() => navigate(`/cliente/${cliente.id}`)}
        >
          🔍 Detalhar Cliente
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardCliente;