import dadosMock from './dadosMock.json';

if (!window.bancoEmMemoria) {
  window.bancoEmMemoria = JSON.parse(JSON.stringify(dadosMock)); // Cópia limpa e profunda do JSON
}

export const apiService = {
  // Simula o método GET (Listagem) com atraso de rede
  listar: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...bancoEmMemoria]);
      }, 600); // 600ms de atraso para forçar a renderização do Spinner de carregamento
    });
  },

  // Simula o método GET por ID (Detalhes/Edição)
  buscarPorId: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cliente = bancoEmMemoria.find(c => c.id === id.toString());
        resolve(cliente ? { ...cliente } : null);
      }, 400);
    });
  },

  // Simula o método POST (Inclusão)
  incluir: (novoCliente) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const clienteComId = {
          ...novoCliente,
          id: String(bancoEmMemoria.length + 1)
        };
        bancoEmMemoria.push(clienteComId);
        resolve(clienteComId);
      }, 500);
    });
  },

  // Simula o método PUT (Edição)
  editar: (id, dadosAtualizados) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        bancoEmMemoria = bancoEmMemoria.map(c => 
          c.id === id.toString() ? { ...c, ...dadosAtualizados, id: id.toString() } : c
        );
        resolve(true);
      }, 500);
    });
  }
};