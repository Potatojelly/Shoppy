import React from 'react';

const BTN_CLASS = `rounded-md bg-brand text-white text-2xl w-10 m-2 text-center 
                    hover:cursor-pointer hover:brightness-125 `;

export default function Pagination({total, limit, page, setPage}) {
    const numPages = Math.ceil(total/limit);

    return (
        <nav className="w-full h-12 my-1 flex justify-center items-center ">
            <button className={BTN_CLASS} onClick={()=>setPage(page-1)} disabled={page === 1}> 
                {"<"}
            </button>
            {Array(numPages)
                .fill()
                .map(( _,index) => 
                    (
                        <button className={BTN_CLASS} key={index+1} onClick={()=>setPage(index+1)} aria-current={page === index+1 ? "page" : null}>
                            {index+1}
                        </button>
                    )
                ) 
            }
            <button  className={BTN_CLASS} onClick={()=>setPage(page+1)} disabled={page === numPages}> 
                {">"}
            </button>
        </nav>
    );
}

