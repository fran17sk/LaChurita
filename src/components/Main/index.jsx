import {Routes,Route} from 'react-router-dom';
import { Carrousel } from '../Carrousel';
import { NewPart } from '../NewPart';

const Main = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<Carrousel/>}></Route>
                <Route path='/seccion_new_pedido' element={<NewPart/>}></Route>
            </Routes>
        </>
    )
}
export {Main}