import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsCloudUpload } from "react-icons/bs"
import { imgToBase64 } from "../utils/imgToBase64"

const NewProduct = () => {
  const [data, setData] = useState({
    productName: "",
    category: "",
    productImage: "",
    price: "",
    description: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    });

  }

  const uploadImage = async (e) => {
    const data = await imgToBase64(e.target.files[0])

    setData((preve) => {
      return {
        ...preve,
        productImage: data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, productImage, category, price } = data;

    if (productName && productImage && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      });

      const fetchRes = await fetchData.json();

      toast(fetchRes.message);

      setData(() => {
        return {
          productName: "",
          category: "",
          productImage: "",
          price: "",
          description: ""
        }
      });
    }
    else {
      toast("Enter required Fields");
    }


  }
  return (
    <div className="p-4">
      <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Product Name:</label>
        <input type={"text"} id='name' name="productName" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.productName} />

        <label htmlFor='category'>Category:</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={""}></option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"Grocery"}>Grocery</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>South Indian Snacks</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"cake"}>Cake</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor='image'>Image:
          <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data.productImage ? <img src={data.productImage} className="h-full" alt='' /> : <span className='text-5xl'><BsCloudUpload /></span>
            }


            <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden" />
          </div>
        </label>


        <label htmlFor='price' className='my-1'>Price:</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price} />

        <label htmlFor='description'>Description:</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct