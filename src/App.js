// import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import Store from './redux';

const App = () => {
  const content = useRoutes(routes);
  return (
    <Provider store={Store}>
      {content}
    </Provider>
  );
};

export default App;
