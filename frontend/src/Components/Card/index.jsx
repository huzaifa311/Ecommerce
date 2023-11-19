import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { addToCart, removeToCart } from '../../Store/slices/cartSlice';

export default function ProductCard({ removeCart, product }) {
    const dispatch = useDispatch();
    const addCart = ()=>{
        dispatch(addToCart(product))
    }
    const removeItem = ()=>{
        dispatch(removeToCart(product))
    }
    return (
        <Card sx={{ maxWidth: 345, }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={"https://picsum.photos/200/300"}
                className='h-52 w-2 object-contain'
            />
            <CardContent>
                <Typography className='line-clamp-2' gutterBottom variant="h5" component="div">
                {product?.name || 'Title'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product?.description || 'Description'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">RS:{product?.price || "PRICE"}</Button>
                {removeCart ? (
                    <Button variant="contained" onClick={removeItem}>Remove From Cart</Button>
                ) : (
                    <Button variant="contained" onClick={addCart}>Add to Cart</Button>
                )}
            </CardActions>
        </Card>
    );
}