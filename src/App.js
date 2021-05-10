import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ApplicationNavigator from './pages';

function App() {
  return (
    <Provider store={store}>
      <ApplicationNavigator />
    </Provider>
  );
}

export default App;
