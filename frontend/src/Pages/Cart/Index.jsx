import React from 'react'
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { Header, ProductCard } from '../../Components';

const Cart = () => {
    const { items } = useSelector(state => state.cartSlice)
    console.log(items, 'cart items');
    return (
        <>
            <Header />
            <div className='flex flex-col place-items-center bg-gray-200'>
                <div className='max-w-[1800px] bg-green-200 py-3'>
                    <Box>
                        <Grid container columnSpacing={2} rowSpacing={2}>
                            {items.length &&
                                items.map((product) => {
                                    return (
                                        <Grid key={product.product_id} item lg={4} md={4} sm={6} xs={12}>
                                            <ProductCard product={product} removeCart={true} />
                                        </Grid>
                                    );
                                })}
                        </Grid>
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
