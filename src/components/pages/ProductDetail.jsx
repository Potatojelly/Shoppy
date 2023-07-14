import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import Button from "../UI/Button";
import { useAuthContext } from '../contexts/AuthContext';

export default function ProductDetail() {
    const  {state: {product: {id, image, title, description, category, price, options, stock}}} = useLocation();
    const {user} = useAuthContext();
    const [selected,setSelected] = useState(options && options[0]);
    const [quantity,setQuantity] = useState(stock && 1);
    const [added,setAdded] = useState(false);
    const stocks = [];
    
    for(let i = 1; i <= stock; i++) {
        stocks.push(<option key={i} value={i}>{i}</option>);
    }

    const handleSelect = (e) => {
        setSelected(e.target.value);
    }
    
    const addToCart = () => {

    }
    
    return (
        <>
            <p className="mx-12 mt-4 text-gray-700">{category}</p>
            <section className="flex flex-col md:flex-row p-4">
                <img className="w-full px-4 basis-7/12" src={image} alt={title} />
                <div className="w-full basis-5/12 flex flex-col p-4">
                    <h2 className="text-3xl font-bold py-2">{title}</h2>
                    <p className="text-2xl font-bold py-2 border-b border-gray-400">{`$${price}`}</p>
                    <p className="py-4 text-lg">{description}</p>
                    <div className="flex items-center">
                        <label className="text-brand font-bold" htmlFor='options'>Options:</label>
                        <select
                            className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none" 
                            id="options" onChange={handleSelect} value={selected}>
                            {options && options.map((option,index)=><option key={index} value={option}>{option}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center w-24 mb-4">
                        <label className="text-brand font-bold" htmlFor='quantity'>Qty:</label>
                        <select
                            className="ml-1 flex-1  border-2 border-dashed border-brand outline-none" 
                            id="quantity" onChange={handleSelect} value={selected}>
                            {stock && [stocks]}
                        </select>
                    </div>
                    <Button text="Add to Cart" onClick={addToCart}></Button>
                </div>
            </section>
        </>
    );
}

