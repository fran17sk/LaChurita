

const ItemMesa = ({pedido}) => {
    console.log('peido recibido',pedido)

    return (
        <>
            <p>{pedido.mesa}</p>
        </>
    )
}

export { ItemMesa }