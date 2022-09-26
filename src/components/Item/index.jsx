const Item = ({key,product}) => {
    return (
        <div key={key} className='ItemFlex prod' >
            <h1 className="Itemname">{product.name}</h1>
            <h2 className="Itemname">{product.price}(c/u) {product.price*12}(12u)</h2>
            <input className="ItemQuantity" type="number" id={product.name+'Quantity'} placeholder='0' min={0}></input>
        </div>
    )
}
export {Item}