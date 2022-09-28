import { useState } from "react"
import { db } from "../Firebase"
import { collection,getDocs,getDoc,query,serverTimestamp,addDoc} from "firebase/firestore"
import { useEffect } from "react"
import { Loader } from "../Loader"
import {ItemList} from "../ItemList"
import { ToastContainer, toast } from 'react-toastify';


const FormularioNuevoPedidoMesa = () => {
    const [value,setValue]= useState(true)
    const [domicilio,setDomicilio]= useState()
    const [referencia,setReferencia]= useState()
    const [empanadasList,setempanadasList]= useState([])
    const [platoList,setplatoList]= useState([])
    const [bebidaList,setbebidaList]= useState([])
    const [load,setload]= useState(true)
    const [total,setTotal]= useState([])
    const nro_pedido = parseInt(window.localStorage.getItem('nro_pedido'))||1;
    const [client,setClient]= useState(true)
    const [cliente,setCliente]= useState()
    const [Mesa,setMesa]= useState()
    const [faltaCliente,setFatltaCliente] = useState(true)

    const ValidationMesa=(e)=>{
        setMesa(e.target.value)
        e.target.value.length>0 ? setClient(false)&&setMesa(e.target.value) : setClient(true)
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
            let pedido = {
                nro_pedido:nro_pedido,
                mesa:Mesa,
                Empanadas:Empanadas.filter(prod=>prod.category=='empanada'),
                Plato:Empanadas.filter(prod=>prod.category=='plato'),
                Bebida:Empanadas.filter(prod=>prod.category=='bebida'),
                hora:serverTimestamp(),
                envio:value,
                domicilio:domicilio,
                referencia:referencia,
                totalPrice:Total_Price,
            }

            console.log(pedido)
            const pedidosCollection = collection(db,'pedidosLocal')
            const consulta = addDoc(pedidosCollection,pedido)
            consulta
            .then((res)=>{
                toast.success(`🦄 PEDIDO N° ${nro_pedido} GENERADO CON EXITO`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                toast.success(`Orden ${res.id} generada con exito!!!`)
                CancelarPedido()
            })
            
            window.localStorage.removeItem('nro_pedido')
            window.localStorage.setItem('nro_pedido',nro_pedido+1)
            }
            else{
                setFatltaCliente(true)
            }
        
    }

    const actualizar_domicilio = (e) => {
        console.log(e.target.innerHTML)
        setDomicilio(e.target.value)
    }
    const actualizar_referencia = (e) => {
        setReferencia(e.target.value)
    }
    const CancelarPedido = (e) => {
        document.getElementByClassName('formulario').reset()
    }

    const total_actual = (e) => {
        e.preventDefault()
        console.log('estoyaqui')
    }

    const newP = (e) => {
        console.log('new')
    }

    return (
        <form className="formulario">
            <div className="formulario-nuevo-pedido">
                <div className="grupo-cliente">
                    <label className="grupo-cliente-text">NUMERO DE MESA: </label>
                    <input onChange={ValidationMesa} className="grupo-cliente-input-moso" type="text" placeholder="Ej: 1"></input>
                    {
                        client
                        ?
                        <p className="mensaje-cliente-activo">Este campo no puede quedar vacio!!</p>
                        :
                        <p className="mensaje-cliente-oculto">Este campo no puede quedar vacio!!</p>
                    }
                </div>
                {
                    ! value
                    ?
                    <div className="grupo-envio-domicilio-oculto">
                        <label className='grupo-cliente-text'>INGRESE DOMICILIO</label>
                        <input onChange={actualizar_domicilio} className="grupo-cliente-input" type="text" placeholder="Ej: Leandro N Alem N°120 B° San Jose" />
                        <br></br>
                        <label className='grupo-cliente-text'>REFERENCIA DOMICILIO</label>
                        <input onChange={actualizar_referencia} className="grupo-cliente-input" type="text" placeholder="Ej: Casa Blanca 2 pisos" />
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
                <div className="TotalFlex">
                    <h2 className="total_pedido" >TOTAL:</h2>
                    <h2 className="total_pedido">${total}</h2><br></br>
                </div>
                <button type="submit" onClick={GenerarPedido} className='buttonForm'>GENERAR PEDIDO</button>
                <button onClick={CancelarPedido} className='buttonForm'>CANCELAR PEDIDO</button>
                {
                    client ? <h2 className="faltaCliente">¡¡¡¡Falta Ingresar Cliente!!!!</h2> : null
                }
                <br></br>
                <button onClick={newP} className='buttonForm'>NUEVO PEDIDO</button>
            </div>
        </form>
    )
}

export {FormularioNuevoPedidoMesa}