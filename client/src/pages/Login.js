import React from 'react'
import { useState } from 'react'
import loginSignupLogo from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();


    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleOnChange = (e)=>{
        const {name, value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {email, password} = data;
        if( email && password){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resData = await fetchData.json();

            toast(resData.message);

            if(resData.alert){
                dispatch(loginRedux(resData));

                navigate('/');
            }
        }
        else{
            toast("give all the fields")
        }
    }


  return (
    <div className='p-3 md:p-4'>

    <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
            <img src={loginSignupLogo} alt='SignUp' className='w-full' />
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
        
            <label htmlFor='email'>Email:</label>
            <input type={'email'} id='email' name='email' value={data.email} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:border-none focus-within:outline-none' />

            <label htmlFor='password'>Password:</label>
            <div className='flex  bg-slate-200 mt-1 mb-2 px-2 rounded'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={data.password} onChange={handleOnChange} className=' w-full py-1 bg-slate-200 border-none outline-none' />
                <span onClick={handleShowPassword} className='mt-2 cursor-pointer'> {showPassword ? <BiShow /> : <BiHide />}</span>
            </div>
    
            <button type='submit' className='bg-blue-500 m-auto rounded p-2 focus:bg-blue-700' >Login</button>
        </form>
        <p>Do not have account? <Link to={'/signup'} className='text-blue-600'>SignUp</Link></p>
    </div>
</div>
  )
}

export default Login