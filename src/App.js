import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { NavVar} from './components/NavVar'
import {BrowserRouter} from 'react-router-dom'
import {CartContextProvider}  from './context/cartContext';
import { ToastContainer, toast } from 'react-toastify';
import {Carrousel} from './components/Carrousel'
import {Footer} from './components/Footer'
import { Main } from './components/Main';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartContextProvider>
          <NavVar/>
          <Main></Main>
          <Footer/>
          <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        </CartContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
