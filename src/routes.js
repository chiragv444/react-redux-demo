import { Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const routes = [
  {
    path: '/',
    children: [
      { path: '/', element: <Navigate to="/libraries/test/programs" /> },
      { path: 'libraries/:id/programs', element: <Dashboard /> }
    ]
  }
];

export default routes;