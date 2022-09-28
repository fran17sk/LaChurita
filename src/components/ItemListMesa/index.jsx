import { ItemMesa } from "../ItemMesa"

const ItemListMesa = ({pedidos}) => {
    console.log(pedidos)
    return (
        <>
            {pedidos.forEach(pedido => {
                <ItemMesa pedido={pedido} />
                console.log('pedidopasado',pedido)
            })}
        </>
    )
}

export {ItemListMesa}