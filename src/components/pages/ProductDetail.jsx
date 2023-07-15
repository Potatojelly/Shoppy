import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import Button from "../UI/Button";
import { useAuthContext } from '../../contexts/AuthContext';
import { addToCart } from '../../api/firebase';

export default function ProductDetail() {
    const {state: {product}} =useLocation();
    const {state: {product: {id, image, title, description, category, price, options, stock}}} = useLocation();
    const {uid} = useAuthContext();
    const [optionSelected,setOptionSelected] = useState(options && options[0]);
    const [quantitySelected,setQuantitySelected] = useState(stock && 1);
    const [success,setSuccess] = useState();
    const stocks = [];
    
    for(let i = 1; i <= stock; i++) {
        stocks.push(<option key={i} value={i}>{i}</option>);
    }

    const handleOptionSelect = (e) => {
        setOptionSelected(e.target.value);
    }

    const handleQuantitySelect = (e) => {
        setQuantitySelected(e.target.value);
    }
    
    const addProductToCart = () => {
        const product = {id, image, title, price, option: optionSelected, quantity: quantitySelected};
        addToCart(uid,product).then(()=>{
            setSuccess("Product has been added");
            setTimeout(()=>setSuccess(null),4000);
        });
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
                            id="options" onChange={handleOptionSelect} value={optionSelected}>
                            {options && options.map((option,index)=><option key={index} value={option}>{option}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center w-24 mb-4">
                        <label className="text-brand font-bold" htmlFor='quantity'>Qty:</label>
                        <select
                            className="ml-1 flex-1  border-2 border-dashed border-brand outline-none" 
                            id="quantity" onChange={handleQuantitySelect} value={quantitySelected}>
                            {stock && [stocks]}
                        </select>
                    </div>
                    {success && <p className="my-2"> ✅ {success}</p>}
                    <Button text="Add to Cart" onClick={addProductToCart}></Button>
                </div>
            </section>
        </>
    );
}

