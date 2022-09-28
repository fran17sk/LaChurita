import {Routes,Route} from 'react-router-dom';
import { Carrousel } from '../Carrousel';
import { NewPart } from '../NewPart';
import { MosoContainer } from '../MosoContainer';
import { NewPartMoso } from '../NewPartMoso'

const Main = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<Carrousel/>}></Route>
                <Route path='/seccion_new_pedido' element={<NewPart/>}></Route>
                <Route path='/seccion_mozo' element={<MosoContainer/>}></Route>
                <Route path='/new_pedido_mesa' element={<NewPartMoso/>}></Route>
            </Routes>
        </>
    )
}
export {Main}