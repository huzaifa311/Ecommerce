import React, { useEffect, useState } from 'react'
import { ProductCard } from '../../Components'
import axios from 'axios'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const userType = user.user_type;
  useEffect(() => {
    if (userType === "user") {
      navigate("/");
    } else {
      navigate("/vendor");
    }
  }, []);

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
      <div className='flex flex-col place-items-center bg-gray-200'>
        <div className='max-w-[1800px] px-[5%] bg-green-200 py-3'>
          <Box>
            <Grid container columnSpacing={2} rowSpacing={2}>
              {products.length &&
                products.map((product, index) => {
                  return (
                    <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                      <ProductCard product={product} />
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
