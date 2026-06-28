import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioCliente from '../components/FormularioCliente';
import { apiService } from '../mocks/apiService';

const Home = () => {
  const navigate = useNavigate(); // Hook de navegação obrigatório

  const handleIncluir = async (novoCliente) => {
    try {
      // Executa a chamada assíncrona para a API simulada
      await apiService.incluir(novoCliente);
      
      // Feedback visual simples e direto
      alert('Cliente incluído com sucesso no sistema!');
      
      // Redirecionamento de fluxo exigido pelos critérios de roteamento
      navigate('/clientes');
    } catch (error) {
      console.error("Erro ao incluir cliente:", error);
    }
  };

  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <header className="mb-4">
        <h2 className="fw-bold text-dark">➕ Incluir Novo Cliente</h2>
        <p className="text-muted fs-6">Preencha os campos abaixo para registrar um novo cadastro na base de dados.</p>
      </header>
      
      {/* O componente genérico recebe a função assíncrona via props */}
      <FormularioCliente onSubmit={handleIncluir} textoBotao="Cadastrar Cliente" />
    </div>
  );
};

export default Home;