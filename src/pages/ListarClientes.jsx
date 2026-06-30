import { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { apiService } from '../mocks/ApiService';
import CardCliente from '../components/CardCliente';

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        const dados = await apiService.listar();
        setClientes(dados);
      } catch (error) {
        console.error("Erro ao carregar listagem:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.email.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="container">
      <div className="mb-4">
        <h2 className="fw-bold text-dark">📋 Listagem de Clientes</h2>
        <p className="text-muted">Gerencie os cadastros ativos e inativos da sua base de dados.</p>
      </div>

      <Form className="mb-4">
        <InputGroup className="shadow-sm">
          <InputGroup.Text bg="light" id="search-icon">🔍</InputGroup.Text>
          <Form.Control
            placeholder="Buscar cliente por nome ou e-mail..."
            aria-label="Buscar cliente"
            aria-describedby="search-icon"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </InputGroup>
      </Form>

      {loading ? (
        <div className="text-center my-5 p-5">
          <Spinner animation="border" variant="primary" role="status" className="mb-2">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p className="text-muted">Consultando servidor fictício...</p>
        </div>
      ) : (
        <>
          {clientesFiltrados.length === 0 ? (
            <Alert variant="warning" className="text-center shadow-sm">
              🚩 Nenhum cliente encontrado para o termo: <strong>"{termoBusca}"</strong>
            </Alert>
          ) : (
            <Row className="g-4">
              {clientesFiltrados.map((cliente) => (
                <Col key={cliente.id} xs={12} sm={6} md={4}>
                  <CardCliente cliente={cliente} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default ListarClientes;