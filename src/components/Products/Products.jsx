import React, { useState } from 'react';
import ProductCard from './ProductCard';
import useProduct from '../../hooks/useProduct';
import Pagination from '../UI/Pagination';

export default function Products() {
    const limit = 9;
    const {productQuery: {isLoading, error, data:products}} = useProduct();
    const [page,setPage] = useState(1);
    const offset = (page-1) * limit;
    const handlePage = (pageNum) => {
        setPage(pageNum);
    }

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
                {products && [products.slice(offset,offset+limit).map((product) => (<ProductCard key={product.id} product={product}/>))]}
            </ul>
            <footer >
                {products && <Pagination total={products && products.length} limit={limit} page={page} setPage={handlePage}/>}
            </footer>
        </>
    );
}

