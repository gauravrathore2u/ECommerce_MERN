import React, { useState } from 'react'
import logo from '../assest/logoForEcomm.png'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { BsCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'

function Header() {
    const [profileCard, setprofileCard] = useState(false);
    const userdata = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleprofileCard = () => {
        setprofileCard(prev => !prev);
    }

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast('Logout Successfully');
    }

    const cartItemNumber = useSelector((state)=>state.products.cartItems);




    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 bg-white'>
            {/* Desktop */}
            <div className='flex items-center h-full justify-between'>
                <Link to={"/"}>
                    <div className='h-10'>
                        <img src={logo} alt='logo' className='h-full' />
                    </div>
                </Link>

                <div className='flex items-center gap-4 md:gap-7'>
                    <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={'/'} >Home</Link>
                        <Link to={'/menu/648ef5ef617f0e719cc61ae9'} >Menu</Link>
                        <Link to={'/about'} >About</Link>
                        <Link to={'/contacts'} >Contacts</Link>
                    </nav>
                    <div className='text-2xl text-slate-600 relative'>
                       <Link to={'/cart'} > <BsCartFill /> 
                        <div className='absolute -top-1 -right-1 text-white bg-red-600 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>{cartItemNumber.length}</div>
                        </Link>
                    </div>
                    <div className='text-2xl text-slate-600 cursor-pointer p-2 h-10 w-10 rounded-full overflow-hidden' onClick={handleprofileCard}>
                        {userdata.user.profilePic ? <img src={userdata.user.profilePic} alt='' className='w-full h-full' /> : <FaUserAlt />}

                        {profileCard && (<div className='absolute right-2 bg-white px-2 py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>
                            {userdata.user.email === process.env.REACT_APP_ADMIN_EMAIL && (<Link to={'/newproduct'} className='whitespace-nowrap cursor-pointer'>New Product</Link>)}

                            {userdata.user.firstName ? <p onClick={handleLogout}>Logout</p> : <Link to={'/login'} className='whitespace-nowrap cursor-pointer'>Login</Link>}

                            <nav className='text-base flex flex-col md:hidden'>
                                <Link to={'/'} className=''>Home</Link>
                                <Link to={'/menu/648ef5ef617f0e719cc61ae9'} className=''>Menu</Link>
                                <Link to={'/about'} className=''>About</Link>
                                <Link to={'/contacts'} className=''>Contacts</Link>
                            </nav>

                        </div>)}


                    </div>
                </div>
            </div>



            {/* mobile */}
        </header>
    )
}

export default Header