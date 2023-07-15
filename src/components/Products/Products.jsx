import React from 'react';
import ProductCard from './ProductCard';
import useProduct from '../../hooks/useProduct';

export default function Products() {
    const {productQuery: {isLoading, error, data:products}} = useProduct();

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
                {products && [products.map((product) => (<ProductCard key={product.id} product={product}/>))]}
            </ul>
        </>
    );
}

