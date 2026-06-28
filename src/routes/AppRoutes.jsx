import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ListarClientes from '../pages/ListarClientes';
import DetalharCliente from '../pages/DetalharCliente';
import EditarCliente from '../pages/EditarCliente';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<ListarClientes />} />
      <Route path="/cliente/:id" element={<DetalharCliente />} />
      <Route path="/editar/:id" element={<EditarCliente />} />
      <Route path="*" element={<div className="text-center mt-5"><h1>404</h1><p>Página não encontrada.</p></div>} />
    </Routes>
  );
};

export default AppRoutes;