import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { NavVar} from './components/NavVar'
import {BrowserRouter} from 'react-router-dom'
import {CartContextProvider}  from './context/cartContext';
import {Carrousel} from './components/Carrousel'
import {Footer} from './components/Footer'
import { Main } from './components/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartContextProvider>
          <NavVar/>
          <Main></Main>
          <Footer/>
        </CartContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
