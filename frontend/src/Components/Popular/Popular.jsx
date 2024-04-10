import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

export const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('https://kvvbackend.onrender.com/popularcategory')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  }, [])


  return (
    <div>
        <div className="popular">
          <h1>POPULAR COLLECTIONS</h1>
          <hr />
          <div className="popular-item">
            {popularProducts.map((item, i)=>{
              return <Item key={i} id={item.id} name ={item.name} image={item.image} new_price = {item.new_price} old_price = {item.old_price}/>
            })}
          </div>
        </div>
    </div>
  )
}
