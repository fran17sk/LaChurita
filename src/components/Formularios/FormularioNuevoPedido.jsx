import { useState } from "react"
import { db } from "../Firebase"
import { collection,getDocs,getDoc,query,serverTimestamp} from "firebase/firestore"
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
        this.totalPrice=totalPrice;
    }
}

const FormularioNuevoPedido = () => {
    const [value,setValue]= useState(true)
    const [empanadasList,setempanadasList]= useState([])
    const [platoList,setplatoList]= useState([])
    const [bebidaList,setbebidaList]= useState([])
    const [load,setload]= useState(true)
    const [total,setTotal]= useState([])
    const nro_pedido = parseInt(window.localStorage.getItem('nro_pedido'))||1;
    const [client,setClient]= useState(true)
    const [cliente,setCliente]= useState()
    const [faltaCliente,setFatltaCliente] = useState(true)

    const ValidationClient=(e)=>{
        setCliente(e.target.value)
        e.target.value.length>0 ? setClient(false)&&setCliente(e.target.value) : setClient(true)
    }
    useEffect(()=>{
        const productosCollection = collection(db,'ProductosVenta')
        const consulta = getDocs(productosCollection)
        consulta
            .then(snapshot=>{
                setload(false)
                const productos=snapshot.docs.map(doc=>{
                return {
                    ...doc.data(),
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
    
        
    },[])


    
    const GenerarPedido = (e) => {
        e.preventDefault()
        if (cliente.length > 0) {
            setFatltaCliente(false)
            let Empanadas = []
            let Total_Price = 0
            let inputs = document.querySelectorAll('.ItemQuantity')
            inputs.forEach(input => {
                if(input.value>0){
                    const Item = {
                        type: input.id,
                        quantity: input.value,
                        category: input.name,
                        price: input.size,
                        subtotal: input.value*input.size
                    }
                    Empanadas.push(Item)
                    console.log(Empanadas)
                }
            })
            Empanadas.forEach(item => Total_Price += item.subtotal)
            setTotal(Total_Price)
            console.log(nro_pedido,cliente,Empanadas)
            let pedido = new Pedido(nro_pedido,cliente,Empanadas.filter(prod=>prod.category=='empanada'),Empanadas.filter(prod=>prod.category=='plato'),Empanadas.filter(prod=>prod.category=='bebida'),serverTimestamp(),Total_Price)
            console.log(pedido)
            window.localStorage.removeItem('nro_pedido')
            window.localStorage.setItem('nro_pedido',nro_pedido+1)
            }
            else{
                setFatltaCliente(true)
            }
        
    }

    const CancelarPedido = (e) => {
        document.getElementByClassName('formulario').reset()
    }

    const total_actual = (e) => {
        e.preventDefault()
        console.log('estoyaqui')
    }

    return (
        <form className="formulario">
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
                <button onClick={total_actual}>Calcular Total</button>
                <output className="total_pedido">{total}</output><br></br>
                <button type="submit" onClick={GenerarPedido}>GENERAR PEDIDO</button>
                <button onClick={CancelarPedido}>CANCELAR PEDIDO</button>
                {
                    client ? <h2>Falta Ingresar Cliente</h2> : null
                }
            </div>
        </form>
    )
}

export {FormularioNuevoPedido}