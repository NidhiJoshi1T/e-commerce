import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'


const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('https://backend-of-kvv-1.onrender.com/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }


  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('https://backend-of-kvv-1.onrender.com/removeproduct',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
        <h1>All Products List</h1>
        <div className="list-product-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="list-product-allproduct">
          <hr />
          {allproducts.map((product, index)=>{
            return <><div key={index} className="list-product-format-main list-product-format">
              <img src={product.image} alt="" className="list-product-icon" />
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className='list-product-remove-icon' src={cross_icon} alt="" />
            </div>

            <hr />
            </>
          
          })}
        </div>
    </div>
  )
}

export default ListProduct