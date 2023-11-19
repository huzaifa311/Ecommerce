import React from 'react'
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { Header, ProductCard } from '../../Components';

const Cart = () => {
    const { items } = useSelector(state => state.cartSlice)
    console.log(items, 'cart items');
    return (
        <>
            <div className='flex flex-col place-items-center '>
                <div className='max-w-[1800px] py-3'>
                    <Box>
                        <div className='flex flex-wrap gap-8'>
                            {items.length &&
                                items.map((product, index) => {
                                    return (
                                        // <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                                            <ProductCard key={index} product={product} removeCart={true} />
                                        // </Grid>
                                    );
                                })}
                        </div>
                        {!items.length && (
                            <h1 className="text-center mt-10 text-2xl">NO ITEM IN CART</h1>
                        )}
                    </Box>
                </div>
            </div>
        </>
    )
}

export default Cart
