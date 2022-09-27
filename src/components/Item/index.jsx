

const Item = ({key,product}) => {

    return (
        <div key={key} className='ItemFlex prod' >
            <h1 className="Itemname">{product.name}</h1>
            {
                product.category==='bebida'
                ?
                <h2 className="Itemname">{product.price}(c/u)</h2>
                :
                <h2 className="Itemname">{product.price}(c/u) {product.price*12}(12u)</h2>
            }
            <input className="ItemQuantity" type="number" size={product.price} name={product.category} id={product.name} min={0}></input>
        </div>
    )
}
export {Item}