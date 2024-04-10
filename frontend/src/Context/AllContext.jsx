import React, { createContext, useEffect, useState } from "react";

export const AllContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for(let i= 0; i<=300+1; i++){
        cart[i] = 0;
    }
    return cart;
}

const AllContextProvider = (props)=>{


    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('https://kvvbackend.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('https://kvvbackend.onrender.com/getcart',{
                method:'POST',
                headers:{
                    Accept :'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    
    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));

        if(localStorage.getItem('auth-token')){
            fetch('https://kvvbackend.onrender.com/addtocart', {
                method:'POST',
                headers:{
                    Accept :'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('https://kvvbackend.onrender.com/removefromcart', {
                method:'POST',
                headers:{
                    Accept :'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const i in cartItems){
            if(cartItems[i]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(i) )  
                totalAmount+=(itemInfo.new_price * cartItems[i]); 
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const i in cartItems){
            if(cartItems[i]>0){
                totalItem+=cartItems[i];
            }
        }
        return totalItem;
    }


    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};
    
    return(
        <AllContext.Provider value = {contextValue}>
            {props.children}
        </AllContext.Provider>
    )
};

export default AllContextProvider;