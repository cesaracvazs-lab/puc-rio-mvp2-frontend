import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spinner, Alert, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { apiService } from '../mocks/apiService';
import BlocoInfo from '../components/BlocoInfo';
import BotaoAcao from '../components/BotaoAcao';

const DetalharCliente = () => {
  const { id } = useParams(); // Hook obrigatório: captura o ID dinâmico da URL
  const navigate = useNavigate(); // Hook obrigatório: gerencia a navegação reversa

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        setLoading(true);
        const dados = await apiService.buscarPorId(id);
        setCliente(dados);
      } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarCliente();
  }, [id]);

  // Renderiza o indicador de carregamento assíncrono (Usabilidade)
  if (loading) {
    return (
      <div className="text-center my-5 p-5">
        <Spinner animation="border" variant="primary" className="mb-2" />
        <p className="text-muted">Buscando ficha cadastral do cliente...</p>
      </div>
    );
  }

  // Tratamento caso o ID digitado na URL não exista no JSON em memória (Usabilidade)
  if (!cliente) {
    return (
      <Alert variant="danger" className="text-center shadow-sm">
        <h4>⚠️ Registro Não Encontrado</h4>
        <p>O cliente com ID #{id} não foi localizado em nossa base de dados corrente.</p>
        <BotaoAcao texto="Voltar para a Lista" variante="danger" icone="⬅️" onClick={() => navigate('/clientes')} />
      </Alert>
    );
  }

  return (
    <div className="container">
      {/* Cabeçalho de Ações rápidas */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">🔍 Ficha do Cliente</h2>
          <p className="text-muted mb-0">ID do registro: <code className="fw-bold">#{cliente.id}</code></p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-sm-0">
          <BotaoAcao texto="Voltar" variante="outline-secondary" icone="⬅️" onClick={() => navigate('/clientes')} />
          
          {/* Requisito de Usabilidade avançada: Tooltip explicativo no botão crítico */}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-editar">Modificar dados cadastrais deste cliente</Tooltip>}
          >
            <div> {/* Div necessária para o Tooltip funcionar em componentes customizados */}
              <BotaoAcao 
                texto="Editar Cadastro" 
                variante="warning" 
                icone="📝" 
                onClick={() => navigate(`/editar/${cliente.id}`)} 
              />
            </div>
          </OverlayTrigger>
        </div>
      </div>

      {/* Grid Responsivo consumindo os Blocos de Informação Genéricos */}
      <Row className="g-4">
        <Col xs={12} md={6}>
          <BlocoInfo icone="👤" rotulo="Nome Completo" valor={cliente.nome} />
        </Col>
        <Col xs={12} md={6}>
          <BlocoInfo icone="⚡ Status" rotulo="Situação Cadastral" valor={cliente.status} />
        </Col>
        <Col xs={12} md={6}>
          <BlocoInfo icone="📧" rotulo="Endereço de E-mail" valor={cliente.email} />
        </Col>
        <Col xs={12} md={6}>
          <BlocoInfo icone="📞" rotulo="Número de Telefone" valor={cliente.telefone} />
        </Col>
      </Row>
    </div>
  );
};

export default DetalharCliente;