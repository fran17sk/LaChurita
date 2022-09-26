import {Item} from "../Item"

const ItemList = (list) => {
    return (
        <div className="productosFlex" id="productos">
            <div className='ItemFlexTag'>
                <h1 className="ItemTagname">NOMBRE PRODUCTOS</h1>
                <h2 className="ItemTagname">PRECIOS</h2>
                <h2 className="ItemTagname">CANTIDAD</h2>
            </div>
            {list.list.map(product=><Item key={product.cod} product={product}/>)}
        </div>
    )
}
export {ItemList}