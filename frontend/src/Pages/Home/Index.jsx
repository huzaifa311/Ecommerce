import React, { useEffect, useState } from 'react'
import { Header, ProductCard } from '../../Components'
import axios from 'axios'
import { Box, Grid } from '@mui/material'

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    (async () => {
      const products = await axios.get(
        `https://fake-store-api.mock.beeceptor.com/api/products`
      )
      setProducts(products.data);
    })()
  }, [])
  return (
    <>
      <Header />
      <div className='flex flex-col place-items-center bg-gray-200'>
        <div className='max-w-[1800px] px-[5%] bg-green-200 py-3'>
          <Box>
          <Grid container columnSpacing={2} rowSpacing={2}>
              {products.length &&
                products.map((product, index) => {
                  return (
                    <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                      <ProductCard product={product}/>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Box>
        </div>
      </div>
    </>
  )
}

export default Home
