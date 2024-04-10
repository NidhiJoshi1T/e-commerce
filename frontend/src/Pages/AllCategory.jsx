import React, { useContext } from 'react'
import './CSS/AllCategory.css'
import { AllContext } from '../Context/AllContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

export const AllCategory = (props) => {
  const {all_product} = useContext(AllContext);
  return (
      <div className="all-category">
      <div className="allcategory-indexSort">
        <p>
          <span>Showing 1-12</span> Out of 55 products
        </p>
        <div className="allcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="allcategory-products">
        {
          all_product.map((item, i)=>{
            if(props.category===item.category){
              return <Item key={i} id={item.id} name ={item.name} image={item.image} new_price = {item.new_price} old_price = {item.old_price}/>
            }
            else{
              return null;
            }
          })
        }
      </div>
      <div className="allcategory-loadmore">
        Explore more
      </div>
    </div>
  )
}
