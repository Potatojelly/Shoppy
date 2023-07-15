import React  from 'react';
import { useCart } from '../../hooks/useCart';
import CartCard from "../CartCard/CartCard";

export default function Mycart() {
    const {uid, cartQuery:{isLoading, error, data: carts}} = useCart();

    return (
        <>
            <h1>My Carts</h1>
            {!carts && <p>There is no item in cart</p>}
            {carts && 
            (
                <section className="w-full">
                    <div className="flex flex-col">
                        {carts && carts.map((cart,index)=>(<CartCard key={index} uid={uid} cart={cart}/>))}
                    </div>
                </section>
            )}
        </>
    );
}

