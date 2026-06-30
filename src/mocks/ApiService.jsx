import dadosMock from './dadosMock.json';

if (!window.bancoEmMemoria) {
  window.bancoEmMemoria = dadosMock;
}

export const apiService = {
  listar: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...bancoEmMemoria]);
      }, 600);
    });
  },

  buscarPorId: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cliente = bancoEmMemoria.find(c => c.id === id.toString());
        resolve(cliente ? { ...cliente } : null);
      }, 400);
    });
  },

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