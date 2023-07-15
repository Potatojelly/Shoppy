import React, { useEffect, useState } from 'react';
import { deleteFromCart, getProductStock } from '../../api/firebase';
import { useCart } from '../../hooks/useCart';
import {AiOutlineMinusSquare,AiOutlinePlusSquare} from "react-icons/ai"
import {RiDeleteBin5Fill} from "react-icons/ri"

export default function CartCard({uid, cart, cart: {id, image, title, option, price, quantity}}) {
    const [currentStock,setCurrentStock] = useState();
    const [qtyLimitAlarm, setQtyLimitAlarm] = useState(false);
    const {updateCart, removeCart} = useCart();

    useEffect(()=>{
        getProductStock(id).then((result)=>{setCurrentStock(result)});
    },[])

    const handleMinus = () => {
        if(quantity === 1) return;
        const product = {...cart, quantity: parseInt(quantity)-1};
        updateCart.mutate({uid,product});
    }

    const handlePlus = () => {
        if(quantity === currentStock) {
            setQtyLimitAlarm(prev => !prev);
            setTimeout(()=>setQtyLimitAlarm(prev => !prev),3000);
            return;
        }
        const product = {...cart, quantity: parseInt(quantity)+1};
        console.log(product);
        updateCart.mutate({uid,product});
    }

    const handleDelete = () => {
        const productId = id;
        removeCart.mutate({uid,productId});
    }

    return (
        <li className="flex justify-between my-2 items-center">
            {qtyLimitAlarm && 
            <div className="border-2 w-30 h-20 fixed inset-y-1/2 rounded-lg">
                <span>{`${title}'s current stock is ${currentStock}`}</span>
            </div>}
            <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
            <div className="flex flex-1 justify-between ml-4">
                <div className="basis-3/5">
                    <p className="text-lg">{title}</p>
                    <p className="text-xl font-bold text-brand">{option}</p>
                    <p>${price}</p>
                </div>
                <div className="text-2xl flex items-center">
                    <AiOutlineMinusSquare className="transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1" onClick={handleMinus}/>
                    <span className="box-border pb-1">{quantity}</span>
                    <AiOutlinePlusSquare className="transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1" onClick={handlePlus}/>
                    <RiDeleteBin5Fill className="transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1" onClick={handleDelete}/>
                </div>
            </div>
        </li>
    );
}

