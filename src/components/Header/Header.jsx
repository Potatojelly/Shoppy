import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {FiShoppingBag} from "react-icons/fi";
import {FaPencilAlt} from "react-icons/fa";
import { login, logout, onUserStateChanged } from '../../api/firebase';
import User from '../User/User';


export default function Header() {
    const [user, setUser] = useState();
    useEffect(()=>{
        onUserStateChanged((user)=>{
            setUser(user);
        });
    },[])

    console.log(user && user.photoURL);
    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link to="/" className="flex items-center text-4xl text-brand">
                <FiShoppingBag/>
                <h1>Yoon's Shoppy</h1>
            </Link>
            <nav className="flex items-center gap-4 font-semibold">
                <Link to="products">Products</Link>
                <Link to="carts">Carts</Link>
                <Link to="products/new" className="text-2xl">
                    <FaPencilAlt/>
                </Link>
                {user && <User user={user}/>}
                {user && <button onClick={logout}>Logout</button>}
                {!user && <button onClick={login}>Login</button>}
            </nav>
        </header>
    );
}

