import { useState } from "react"

const Item = ({key,product}) => {
    const [total,setTotal]= useState(0)
    const CalcularTotal = (e) => {
        let total = 0;
        total = e.target.value*product.price
        setTotal(total)
        console.log(total)
    }

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
            <input className="ItemQuantity" type="number" size={product.price} name={product.category} id={product.name} min={0} onChange={CalcularTotal}></input>
        </div>
    )
}
export {Item}