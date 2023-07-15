import React, { useEffect, useState } from 'react';
import { deleteFromCart, getProductStock } from '../../api/firebase';
import { useCart } from '../../hooks/useCart';

export default function CartCard({uid, cart, cart: {id, image, title, option, price, quantity}}) {
    const [currentStock,setCurrentStock] = useState();
    const [qtyLimitAlarm, setQtyLimitAlarm] = useState(false);
    const {updateCart} = useCart();

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
        deleteFromCart(uid, id);
    }

    console.log(currentStock && currentStock);
    return (
        <li className="flex justify-between my-2 items-center">
            {qtyLimitAlarm && <div className="border-2 w-30 h-20 fixed inset-y-1/2 rounded-lg">
                <span>{`${title}'s current stock is ${currentStock}`}</span>
            </div>}
            <img src={image} alt={title} />
            <div className="flex w-3/5 justify-between items-center">
                <div>
                    <h2>{title}</h2>
                    <h2>{option}</h2>
                    <p>${price}</p>
                </div>
                <div>
                    <button className="border-2 m-2 w-8" onClick={handleMinus}>-</button>
                    {quantity}
                    <button className="border-2 m-2 w-8" onClick={handlePlus} disabled={qtyLimitAlarm}>+</button>
                    <button onClick={handleDelete}>Trash</button>
                </div>
            </div>
        </li>
    );
}

