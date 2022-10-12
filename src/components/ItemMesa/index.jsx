

const ItemMesa = ({pedido}) => {
        let date = pedido.hora.toDate() // convierte a un objeto Date de JS
        // Hours part from the timestamp
        let hours = date.getHours()
        let minutes = date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes()
        
        let fecha = hours + ":" + minutes
        console.log(fecha)
    

    return (
        <div className="CardPedido">
            <div>
                <h1>N° de mesa: {pedido.mesa}</h1>
                {
                    pedido.preparacion ? <h2>EN HORNO</h2> : <h2>EN COCINA</h2>
                }
                <div className="empanadas_card">
                    <h3>Empanada</h3>
                    <h3>Cantidad</h3>
                </div>
                {
                    pedido.Empanadas.map(empanada=>
                    <div className="empanadas_card">
                    <h3>{empanada.type}</h3>
                    <h3>{empanada.quantity}</h3>
                    </div>
                    )
                }
                {
                    pedido.Plato.length > 0 
                    ?
                    <div className="empanadas_card">
                        <h3>Comida al Plato</h3>
                        <h3>Cantidad</h3>
                    </div>
                    :
                    <></>
                }
                {
                    pedido.Plato.map(plato=>
                    <div className="empanadas_card">
                        <h3>{plato.type}</h3>
                        <h3>{plato.quantity}</h3>
                    </div>
                    )
                }
                <div className="empanadas_card">
                    <h3>Bebida</h3>
                    <h3>Cantidad</h3>
                </div>
                {
                    pedido.Bebida.map(bebida=>
                    <div className="empanadas_card">
                        <h3>{bebida.type}</h3>
                        <h3>{bebida.quantity}</h3>
                    </div>
                    )
                }
            </div>
            <div>
                <h3 className="pedidoHora">El pedido se hizo a las: {fecha}</h3>
            </div>
        </div>
    )
}

export {ItemMesa}