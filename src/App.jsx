import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Links que vão aparecer no seu Header genérico
  const menuLinks = [
    { label: 'Início / Incluir', path: '/' },
    { label: 'Listar Clientes', path: '/clientes' }
  ];

  return (
    <Router>
      {/* O Header fica visível em todas as páginas */}
      <Header logoText="👥 CRM Clientes" links={menuLinks} notificationCount={0} />
      
      {/* O conteúdo das páginas muda dinamicamente aqui dentro */}
      <main className="container my-5">
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;