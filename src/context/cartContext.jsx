import { createContext,useState,useContext } from "react"

const CartContext = createContext([])
export const useCartContext = () => useContext(CartContext)
const aux = JSON.parse(window.localStorage.getItem('carrito')) || []
export function CartContextProvider ({children}) {

    const [cartList,setCartList]=useState(
        aux
    )
    
    const setLocalStorage = value => {
        try{
            setCartList(value)
            window.localStorage.setItem('carrito',JSON.stringify(value))
        }catch(e){
            console.log('error')
        }
    }

    const isInCart = (cod) => cartList.find(prod => prod.cod === cod)

    const addToCart = (item,quantity) => {
        if (isInCart(item.cod)){
            const newCart = cartList.map( prod => {
                if(item.cod===prod.cod){
                    const newQuantity = prod.quantity + quantity
                    return{...prod,quantity:newQuantity}
                }else{
                    return prod;
                }
                
            })
            setLocalStorage(newCart)
        }else{
            const newProduct = {...item,quantity:quantity}
            setLocalStorage([...cartList,newProduct])
        }
    }

    const removeProduct = (cod) => {
        setLocalStorage(cartList.filter(prod=>prod.cod!=cod))
    }

    const cleanCartList = () => {
        setCartList([])
        window.localStorage.removeItem('carrito')
    }
    const totalPrice = () => {
        return cartList.reduce((acc,product)=>acc+=(product.precio*product.quantity),0)
    }

    const totalProducts = () => {
        return cartList.reduce((acc,product)=>acc+=(product.quantity),0)
    }

    return (
        <CartContext.Provider value = {{
            addToCart,
            removeProduct,
            cleanCartList,
            totalPrice,
            totalProducts,
            setCartList,
            cartList
        }}>{children}</CartContext.Provider>
    )
}