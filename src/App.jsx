import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const menuLinks = [
    { label: 'Início / Incluir', path: '/' },
    { label: 'Listar Clientes', path: '/clientes' }
  ];

  return (
    <Router>
      <Header links={menuLinks} />

      <main className="container my-5">
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;