import React, { useState } from 'react'
import loginSignupLogo from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import { imgToBase64 } from '../utils/imgToBase64'
import toast from 'react-hot-toast';


function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })
    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleProfilePic = async (e) => {
        const pic = await imgToBase64(e.target.files[0]);
        setData((prev) => {
            return {
                ...prev,
                profilePic: pic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, email, password, confirmPassword } = data;
        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {

                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                const resData = await fetchData.json();

                toast(resData.message);

                if (resData.alert) {
                    navigate('/login');
                }
            }
            else {
                toast("password & confirm password not matching");
            }
        }
        else {
            toast("Please fill all the mandatory field");
        }
    }

    return (
        <div className='p-3 md:p-4'>

            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative'>
                    <img src={data.profilePic ? data.profilePic : loginSignupLogo} alt='SignUp' className='w-full h-full' />

                    <label htmlFor='profilePic' className=''>
                        <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                            <p className='text-sm text-white p-1'>Upload</p>
                        </div>
                    </label>
                    <input type='file' id='profilePic' accept='image/*' className='hidden' onChange={handleProfilePic} />

                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type={'text'} id='firstName' name='firstName' value={data.firstName} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-none focus-within:outline-none' />

                    <label htmlFor='lastName'>Last Name:</label>
                    <input type={'text'} id='lastName' name='lastName' value={data.lastName} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-none focus-within:outline-none' />

                    <label htmlFor='email'>Email:</label>
                    <input type={'email'} id='email' name='email' value={data.email} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-none focus-within:outline-none' />

                    <label htmlFor='password'>Password:</label>
                    <div className='flex  bg-slate-200 mt-1 mb-2 px-2 rounded'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={data.password} onChange={handleOnChange} className=' w-full py-1 bg-slate-200 border-none outline-none' />
                        <span onClick={handleShowPassword} className='mt-2 cursor-pointer'> {showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type={'password'} id='confirmPassword' name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-none focus-within:outline-none' />

                    <button type='submit' className='bg-blue-500 m-auto rounded p-2 focus:bg-blue-700' >SignUp</button>
                </form>
                <p>Already have account? <Link to={'/login'} className='text-blue-600'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup