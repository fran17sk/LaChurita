import { NavLink } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import { db } from "../Firebase"
import { collection,getDocs,getDoc,query,serverTimestamp,addDoc} from "firebase/firestore"
import { ItemListMesa } from '../ItemListMesa'


const MosoContainer = () => {

    const [PedidosMesa,setPedidosMesa] = useState([])

    useEffect(()=>{
        const productosCollection = collection(db,'pedidosLocal')
        const consulta = getDocs(productosCollection)
        consulta
            .then(snapshot=>{
                const productos=snapshot.docs.map(doc=>{
                return {
                    ...doc.data(),
                    cod:doc.id
                }
                
            })
            setPedidosMesa(productos)
            console.log(PedidosMesa)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    return (
        <>
            <NavLink to='/new_pedido_mesa'><p className='PedidoNewMoso'>Nuevo Pedido</p></NavLink>
            <ItemListMesa pedidos={PedidosMesa}/>
        </>
    )
}

export {MosoContainer}