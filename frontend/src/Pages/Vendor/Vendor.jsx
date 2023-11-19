import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransitionsModal } from '../../Components'
import Swal from 'sweetalert2'
import { BASE_URL } from '../../config'
import axios from 'axios'

const Vendor = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = user.user_type;
    const navigate = useNavigate(); // Get the navigate function

    // Conditionally navigate based on userType
    useEffect(() => {
        if (userType === "User") {
            navigate("/");
        } else {
            navigate("/vendor");
        }
    }, []);
    const [blogs, setBlogs] = useState([]);
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetchDisplayBlogs()
    }, [])
    async function fetchDisplayBlogs() {
        try {
            const response = await axios.get(`${BASE_URL}/blog`,
                productObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            // console.log(getBlogs?.data?.data);
            // setBlogs(getBlogs?.data?.data)

        } catch (error) {
            // console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }
    return (
        <div className='flex justify-center place-items-center' >
            <div className='max-w-[1800px] px-[5%]'>
                <TransitionsModal />
            </div>
        </div>
    )
}

export default Vendor
