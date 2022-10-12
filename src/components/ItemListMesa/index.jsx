import { ItemMesa } from "../ItemMesa"

const ItemListMesa = ({pedidos}) => {
    console.log(pedidos)
    pedidos.sort( (a, b) => {
        if(a.hora.toDate() < b.hora.toDate()) {
            return -1;
        }
        if(a.hora.toDate() > b.hora.toDate()) {
            return 1;
        }})
    return (
        <>
            <div className="PedidosFlex">
                <h2 className="PedidosTitle">PEDIDOS DE MESAS</h2>
            </div>
            <div className="CardsFlex">
                {pedidos.map(pedido =><ItemMesa pedido={pedido} key={pedido.mesa} />)}
            </div>
            
        </>
    )
}

export {ItemListMesa}