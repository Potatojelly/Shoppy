import React, { useState } from 'react';
import Button from "../UI/Button";
import { uploadImage } from '../../api/uploader';
import { addNewProduct } from '../../api/firebase';

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading,setIsUploading] = useState(false);
    const [success, setSuccess] = useState();
    
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
        setIsUploading(true);
        uploadImage(file)
            .then((url)=>{
                console.log(url);
                addNewProduct(product,url).then(()=>{
                    setSuccess("Product has been uploaded")
                    setTimeout(()=>{setSuccess(null)},4000);
                })

            })
            .finally(()=>setIsUploading(false));
    }

    return (
        <section className="w-full text-center">
            <h2 className="text-2xl font-bold my-4">Register new products</h2>
            {success && <p className="my-2"> ✅ {success}</p>}
            {file && <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local file" />}
            <form className="flex flex-col px-12" onSubmit={handleSubmit}>
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
                <input 
                    type="number" 
                    name="Stock"
                    value={product.stock ?? ""} 
                    placeholder="Product Stock"
                    required onChange={handleChange}/>    
                <Button text={isUploading ? "Uploading..." : "Register a product"} disabled={isUploading}/>
            </form>
        </section>
    );
}

