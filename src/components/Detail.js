import React, { useEffect, useState } from 'react';
import { FaMobileAlt, FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { MdLocationOn, MdMailOutline, MdWork } from "react-icons/md";
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const Detail = () => {
    const [getUserData, setGetUSerData] = useState([]);

    const history = useNavigate();
    
    const {id} = useParams();
    console.log(id);

    const getinputdata = async () => {

        const res = await fetch(`http://localhost:4000/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error")
        } else {
            setGetUSerData(data)
            console.log("get data")
        }
    };

    useEffect(() => {
        getinputdata();
    },[ ]);

    const deleteuserData = async (id) => {
        const res2 = await fetch(`http://localhost:4000/deletedata/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });

        const deleteUserData = await res2.json();
        console.log(deleteUserData);

        if (res2.status === 404 || !deleteUserData) {
            console.log("error")
        } else {
            console.log("user deleted");
            history("/");
        }
    }

    return (
        <>
            <div className='container'>
                <h1 className='mt-5 mb-5'>Welcome Avinash Jaiswal</h1>
                <div className='row card-1'>
                    <div className='card-left col-lg-6 col-md-6 col-12'>
                        <img src='https://cdn-icons-png.flaticon.com/512/3048/3048127.png' alt='' style={{ width: 50 }} />
                        <h4 className='mt-3'><b>Name</b>: <span>{getUserData.name} </span></h4>
                        <h4 className='mt-3'><b>Age</b>: <span>{getUserData.age} </span></h4>
                        <p><MdMailOutline size={30} /> <b>Email</b>: <span>{getUserData.email} </span> </p>
                        <p><MdWork size={30} /> <b>Occuption</b>: <span>{getUserData.work} </span></p>
                    </div>
                    <div className='card-right col-lg-6 col-md-6 col-12'>
                        <div className='add_btn'>
                            <NavLink to={`/edit/${getUserData._id}`}><button className='btn btn-primary mx-5'><FaPenAlt /> </button></NavLink>
                            <button className='btn btn-danger mx-5' onClick={() => deleteuserData(getUserData._id)} ><FaTrashAlt /></button>
                        </div>
                        <p className='mt-5'><FaMobileAlt size={30} /> <b>Mobile</b>: <span>{getUserData.mobile} </span></p>
                        <p className='mt-4'><MdLocationOn size={30} /> <b>Location</b>: <span>{getUserData.address} </span></p>
                        <p className='mt-4'><b>Description</b>: <span>{getUserData.desc} </span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;
