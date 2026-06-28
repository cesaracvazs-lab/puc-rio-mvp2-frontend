import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import FormularioCliente from '../components/FormularioCliente';
import BotaoAcao from '../components/BotaoAcao';
import { apiService } from '../mocks/ApiService';

const EditarCliente = () => {
  const { id } = useParams(); // Hook obrigatório: captura o ID do cliente na URL
  const navigate = useNavigate(); // Hook obrigatório: redireciona após a ação

  // Estados para controle de ciclo de vida e renderização condicional
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efeito assíncrono para carregar os dados atuais do cliente ao montar a tela
  useEffect(() => {
    const obterDadosCliente = async () => {
      try {
        setLoading(true);
        const dados = await apiService.buscarPorId(id);
        setCliente(dados);
      } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
      } finally {
        setLoading(false); // Remove o indicador visual de carregamento
      }
    };

    obterDadosCliente();
  }, [id]);

  // Função disparada pelo componente de formulário após as validações
  const handleEditar = async (dadosAtualizados) => {
    try {
      // Envia a atualização assíncrona para o nosso banco em memória
      await apiService.editar(id, dadosAtualizados);
      
      alert('Cadastro modificado com sucesso!');
      
      // Redireciona o usuário para a ficha detalhada do cliente atualizado
      navigate(`/cliente/${id}`);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  // Condicional 1: Exibe o Spinner durante a busca inicial (Requisito de Usabilidade)
  if (loading) {
    return (
      <div className="text-center my-5 p-5">
        <Spinner animation="border" variant="primary" className="mb-2" />
        <p className="text-muted">Carregando informações do registro para edição...</p>
      </div>
    );
  }

  // Condicional 2: Exibe Alerta se o usuário forçar na URL um ID inexistente
  if (!cliente) {
    return (
      <Alert variant="danger" className="text-center shadow-sm my-4">
        <h4>⚠️ Falha na Operação</h4>
        <p>Não foi possível abrir a edição pois o ID #{id} não corresponde a nenhum cliente cadastrado.</p>
        <BotaoAcao texto="Voltar para a Lista" variante="danger" icone="⬅️" onClick={() => navigate('/clientes')} />
      </Alert>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      {/* Cabeçalho da Página */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">📝 Editar Cadastro</h2>
          <p className="text-muted mb-0">Atualize os campos necessários para o cliente: <strong className="text-primary">{cliente.nome}</strong></p>
        </div>
        <div className="mt-3 mt-sm-0">
          <BotaoAcao texto="Cancelar" variante="outline-secondary" icone="❌" onClick={() => navigate(`/cliente/${id}`)} />
        </div>
      </div>

      {/* 
        Injeta o FormularioCliente reutilizável passando os dados iniciais. 
        O componente interno sabe que deve se comportar em modo "Edição" 
        por causa da presença da prop `dadosIniciais`.
      */}
      <FormularioCliente 
        key={cliente.id}
        dadosIniciais={cliente} 
        onSubmit={handleEditar} 
        textoBotao="💾 Salvar Alterações" 
      />
    </div>
  );
};

export default EditarCliente;