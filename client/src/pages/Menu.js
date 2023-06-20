import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import AllProduct from '../components/AllProduct';
import { addCartItem } from '../redux/productsSlice';

function Menu() {
  const params = useParams();
  const filterby = params.filterby;

  const productData = useSelector((state) => state.products.productsList);
  var productDisplay = productData.filter(el => el._id === filterby);
  productDisplay = productDisplay[0];

  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  };

  return (
    <div className="p-2 md:p-4">
    <div className="w-full max-w-4xl m-auto md:flex bg-white">
      <div className="max-w-sm  overflow-hidden w-full p-5">
        <img
          src={productDisplay.productImage}
          className="hover:scale-105 transition-all h-full" alt=''
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
          {productDisplay.productName}
        </h3>
        <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
        <p className=" font-bold md:text-2xl">
          <span className="text-red-500 ">₹</span>
          <span>{productDisplay.price}</span>
        </p>
        <div className="flex gap-3">
        <button 
        // onClick={handleBuy} 
        className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Buy</button>
        <button 
         onClick={handleAddCartProduct}
         className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Add Cart</button>
        </div>
        <div>
          <p className="text-slate-600 font-medium">Description : </p>
          <p>{productDisplay.description}</p>
        </div>
      </div>
    </div>

    <AllProduct heading={"Related Product"}/>
  </div>
  )
}

export default Menu