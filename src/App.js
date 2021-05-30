import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ApplicationNavigator from './pages';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ApplicationNavigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
