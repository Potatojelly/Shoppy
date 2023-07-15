import React  from 'react';
import { useCart } from '../../hooks/useCart';
import CartCard from "../CartCard/CartCard";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";
import PriceCard from '../UI/PriceCard';
import Button from "../UI/Button";

const SHIPPING = 10;
export default function Mycart() {
    const {cartQuery:{isLoading, error, data: carts}} = useCart();
    const totalPrice = carts && carts.reduce((prev,current)=>prev + parseInt(current.price) * current.quantity,0)
    return (
        <section className="p-8 flex flex-col">
            <h1 className="text-2xl text-center font-bold pb-4 border-b border-gray-300">My Carts</h1>
            {!carts && <p>There is no product in the shopping cart</p>}
            {carts && 
            (
            <>    
                <ul className="mb-8 pb-4 px-8 border-b border-gray-300">
                    {carts && carts.map((cart,index)=>(<CartCard key={index} cart={cart}/>))}
                </ul>
                <div className="flex justify-between items-center px-2 mb-4 md:px-8 lg:px-16">
                    <PriceCard text="Product Total" price={totalPrice}/>
                    <BsFillPlusCircleFill className="shrink-0"/>
                    <PriceCard text="Delivery Fee" price={SHIPPING}/>
                    <FaEquals className="shrink-0" />
                    <PriceCard text="Total Price" price={totalPrice + SHIPPING}/>
                </div>
                <Button text={"Order"}/>
            </>    
            )}
        </section>
    );
}

