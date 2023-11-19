import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Swal from 'sweetalert2'
import CircularColor from '../Loader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState('')
    const [loader, setloader] = useState(false)
    const [desc, setDesc] = useState('')

    const addProduct = async (e) => {
        e.preventDefault()
        console.log(title, desc);
        try {
            setloader(true)
            const user = JSON.parse(localStorage.getItem('user'))

            if (title === "" || desc === "") {
                setOpen(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Cannot Publish an Empty Product",
                })
                return
            }
            const token = localStorage.getItem('token')
            const author = user.full_name

            const productObj = {
                title,
                desc,
                author,
                userId: user._id
            }
            const response = await axios.post(`${BASE_URL}/blog`,
                productObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status) {
                Swal.fire(
                    'Blog Published Successfully!',
                    response,
                    'success',
                )
                // console.log('post created', response);
                setOpen(false)
            } else {
                Swal.fire(
                    response.data.message
                )
            }
            setloader(false)
        } catch (error) {
            setloader(false)
            setOpen(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        } finally {
            setloader(false)
            setOpen(false)
        }
    }

    return (
        <div className='mt-8 justify-center flex'>
            <Button variant='contained' onClick={handleOpen} sx={{
                background: 'rgb(126, 34, 206)',
                ":hover": {
                    background: 'rgb(150, 60, 230)'
                }
            }
            }>Publish Blog</Button>
            <Modal

                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open} >
                    <Box sx={style} >

                        <Box>
                            <h1 className='text-4xl font-bold'>Publish Blog</h1>
                        </Box>

                        <Box component={'form'} onSubmit={addProduct}>

                            <input type="text" placeholder='Title' className='border mt-4 border-stone-500 rounded-lg p-3 w-full' onChange={e => setTitle(e.target.value)} value={title} />

                            <textarea type="text" placeholder='Description¿' className='border h-[120px] my-4 border-stone-500 rounded-lg p-3 w-full' onChange={e => setDesc(e.target.value)} value={desc} />

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                gap: "10px",
                            }}>
                                <Button variant='contained' type='submit'>{loader ? (<CircularColor color="success" />) : ('Add')}</Button>
                                <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                            </Box>
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}