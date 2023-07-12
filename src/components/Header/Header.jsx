import React from 'react';
import {Link} from "react-router-dom";
import {FiShoppingBag} from "react-icons/fi";
import {FaPencilAlt} from "react-icons/fa";


export default function Header() {
    return (
        <header>
            <Link to="/">
                <FiShoppingBag/>
                <h1>Yoon's Shoppy</h1>
            </Link>
            <nav>
                <Link to="products">Products</Link>
                <Link to="carts">Carts</Link>
                <Link to="products/new">
                    <FaPencilAlt/>
                </Link>
                <button>Login</button>
            </nav>
        </header>
    );
}

