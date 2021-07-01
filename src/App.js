import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ApplicationNavigator from './pages';
import { BrowserRouter } from 'react-router-dom';
import { Toast } from 'components';

function App() {
  console.log('App Rerender');
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toast />
        <ApplicationNavigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
