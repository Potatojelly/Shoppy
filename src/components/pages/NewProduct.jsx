import React, { useState } from 'react';
import Button from "../UI/Button";
import { uploadImage } from '../../api/uploader';
import { addNewProduct, uploadProduct } from '../../api/firebase';

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === "file") {
            setFile(files && files[0]);
            return;
        }
        setProduct((product) => ({...product, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadImage(file)
            .then((url)=>{
                console.log(url);
                addNewProduct(product,url);
            });
    }

    return (
        <section>
            NewProduct Register  
            {file && <img src={URL.createObjectURL(file)} alt="local file" />}
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="file" accept="image*" name="file" required onChange={handleChange}/>
                <input 
                    type="text" 
                    name="title" 
                    value={product.title ?? ""} 
                    placeholder='Product Title' 
                    required onChange={handleChange}/>
                <input 
                    type="number" 
                    name="price"
                    value={product.price ?? ""} 
                    placeholder='Price'
                    required onChange={handleChange}/>
                <input 
                    type="text" 
                    name="category"
                    value={product.category ?? ""} 
                    placeholder='Category'
                    required onChange={handleChange}/>
                <input 
                    type="text" 
                    name="description"
                    value={product.description ?? ""} 
                    placeholder='Product Description'
                    required onChange={handleChange}/>
                <input 
                    type="text" 
                    name="options"
                    value={product.options ?? ""} 
                    placeholder="Product Options(seperated by comma(,))"
                    required onChange={handleChange}/>
                <Button text={"Register Product"}/>
            </form>
        </section>
    );
}

