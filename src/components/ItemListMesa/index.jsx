import { ItemMesa } from "../ItemMesa"

const ItemListMesa = ({pedidos}) => {
    console.log(pedidos)
    let pedidos_muestra = pedidos.sort( (a, b) => {
        if(a.hora < b.hora) {
            return -1;
        }
        if(a.hora > b.hora) {
            return 1;
        }})
    return (
        <>
            <div className="PedidosFlex">
                <h2>PEDIDOS</h2>
            </div>
            <div className="CardsFlex">
                {pedidos_muestra.map(pedido =><ItemMesa pedido={pedido} key={pedido.mesa} />)}
            </div>
            
        </>
    )
}

export {ItemListMesa}