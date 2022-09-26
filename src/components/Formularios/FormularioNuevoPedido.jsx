import { useState } from "react"
import { db } from "../Firebase"
import { collection,getDocs,query } from "firebase/firestore"
import { useEffect } from "react"
import { Loader } from "../Loader"
import {ItemList} from "../ItemList"

class Pedido {
    constructor(nro_pedido,cliente,empanadas,plato,bebbida,hora,totalPrice){
        this.nro_pedido=nro_pedido;
        this.cliente=cliente;
        this.empanadas=empanadas;
        this.plato=plato;
        this.bebbida=bebbida;
        this.hora=hora;
        this.coltotalPriceor=totalPrice;
    }
}

const FormularioNuevoPedido = () => {
    const [value,setValue]= useState(true)
    const [empanadasList,setempanadasList]= useState([])
    const [platoList,setplatoList]= useState([])
    const [bebidaList,setbebidaList]= useState([])
    const [load,setload]= useState(true)
    const [price,setPrice]= useState()
    const [client,setClient]= useState(true)
    const [cliente,setCliente]= useState()

    const ValidationClient=(e)=>{
        setCliente(e.target.value)
        e.target.value.length>0 ? setClient(false) : setClient(true)
    }
    useEffect(()=>{
        setTimeout(()=>{
            const productosCollection = collection(db,'ProductosVenta')
        const precio = collection(db,'precio')
        const consultaprice = getDocs(precio)
        consultaprice
            .then(snapshot=>{
                const price=snapshot.docs.map(doc=>{
                return {
                    ...doc.data()
                }
            })
            setPrice(price)

        })
        .catch(err=>{
            console.log(err)
        })
        const consulta = getDocs(productosCollection)
        consulta
            .then(snapshot=>{
                setload(false)
                const productos=snapshot.docs.map(doc=>{
                return {
                    ...doc.data(),
                    price:price[0].price,
                    cod:doc.id
                }
            })
            setempanadasList(productos.filter(product=>product.category==='empanada'))
            setplatoList(productos.filter(product=>product.category==='plato'))
            setbebidaList(productos.filter(product=>product.category==='bebida'))
        })
        .catch(err=>{
            console.log(err)
        })
        },2000)
        
    },[])
    
    const GenerarPedido = (e) => {
        e.preventDefault()

        let pedido = new Pedido()
    }

    return (
        <form action="formulario-nuevo-pedido" className="formulario">
            <div className="formulario-nuevo-pedido">
                <div className="grupo-cliente">
                    <label className="grupo-cliente-text">NOMBRE DEL CLIENTE: </label>
                    <input onChange={ValidationClient} className="grupo-cliente-input" type="text" placeholder="Ej: Mateo Cruz"></input>
                    {
                        client
                        ?
                        <p className="mensaje-cliente-activo">Este campo no puede quedar vacio!!</p>
                        :
                        <p className="mensaje-cliente-oculto">Este campo no puede quedar vacio!!</p>
                    }
                </div>
                <div className="grupo-dropdawn">    
                    <label className='grupo-cliente-text'>MODALIDAD DE ENTREGA</label><br></br>
                    <input type="radio" name="op-pedido" value={0} onClick={()=>{setValue(true)}}/>Retiro en el local<br></br>
                    <input type="radio" name="op-pedido" value={1} onClick={()=>{setValue(false)}}/>Envio a Domicilio
                </div>
                {
                    ! value
                    ?
                    <div className="grupo-envio-domicilio-oculto">
                        <label className='grupo-cliente-text'>INGRESE DOMICILIO</label>
                        <input className="grupo-cliente-input" type="text" placeholder="Ej: Leandro N Alem N°120 B° San Jose" />
                        <br></br>
                        <label className='grupo-cliente-text'>REFERENCIA DOMICILIO</label>
                        <input className="grupo-cliente-input" type="text" placeholder="Ej: Casa Blanca 2 pisos" />
                    </div>
                    :
                    <div></div>
                }
            </div>
            {
                load
                ?
                <Loader></Loader>
                :
                <>
                    <ItemList list={empanadasList}></ItemList>
                    <ItemList list={platoList}></ItemList>
                    <ItemList list={bebidaList}></ItemList>
                </>
            }
            <div className="OrdenNewGenerate">
                <button type="submit" onClick={GenerarPedido}>GENERAR PEDIDO</button>
            </div>
        </form>
    )
}

export {FormularioNuevoPedido}