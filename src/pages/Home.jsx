import { useNavigate } from 'react-router-dom';
import FormularioCliente from '../components/FormularioCliente';
import { apiService } from '../mocks/ApiService';

const Home = () => {
  const navigate = useNavigate();

  const handleIncluir = async (novoCliente) => {
    try {
      await apiService.incluir(novoCliente);

      alert('Cliente incluído com sucesso!');

      navigate('/clientes');
    } catch (error) {
      console.error("Erro ao incluir cliente:", error);
    }
  };

  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <section className="mb-4">
        <h2 className="fw-bold text-dark">➕ Incluir Novo Cliente</h2>
        <p className="text-muted fs-6">Preencha os campos abaixo para registrar um novo cadastro na base de dados.</p>
      </section>

      <FormularioCliente onSubmit={handleIncluir} textoBotao="Cadastrar Cliente" />
    </div>
  );
};

export default Home;