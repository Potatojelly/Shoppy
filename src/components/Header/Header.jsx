import React from 'react';
import {Link} from "react-router-dom";
import {FiShoppingBag} from "react-icons/fi";
import {FaPencilAlt} from "react-icons/fa";
import User from '../User/User';
import Button from '../UI/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import CartStatus from '../UI/CartStatus';


export default function Header() {
    const {user, login, logout} = useAuthContext();

    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link to="/" className="flex items-center text-4xl text-brand">
                <FiShoppingBag/>
                <h1>Yoon's Shoppy</h1>
            </Link>
            <nav className="flex items-center gap-4 font-semibold">
                <Link to="products">Products</Link>
                {user && 
                    <Link to="carts">
                        <CartStatus/>
                    </Link>}
                {user && user.isAdmin && <Link to="products/new" className="text-2xl">
                    <FaPencilAlt/>
                </Link>}
                {user && <User user={user}/>}
                {!user && <Button text={"Login"} onClick={login}></Button>}
                {user && <Button text={"Logout"} onClick={logout}></Button>}
            </nav>
        </header>
    );
}

