import FormularioCliente from '../components/FormularioCliente';

const IncluirCliente = () => {
  const handleIncluir = (novoCliente) => {
    console.log('Enviando para a API fictícia (JSON):', novoCliente);
    alert('Cliente cadastrado com sucesso!');
  };

  return (
    <div className="container mt-4">
      <h2>Área de Inclusão de Clientes</h2>
      <FormularioCliente 
        onSubmit={handleIncluir} 
        textoBotao="➕ Cadastrar Novo Cliente" 
      />
    </div>
  );
};

export default IncluirCliente;