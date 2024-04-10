import React, { useContext } from 'react'
import { AllContext } from '../Context/AllContext'
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const {all_product} = useContext(AllContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId));
  return (
    <div>
      <Breadcrum product ={product}/>
      <ProductDisplay product = {product}/>
      {/* <DescriptionBox/> */}
      <RelatedProducts/>
    </div>
  )
}
