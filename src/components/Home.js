import React, { useEffect, useState } from 'react';
import { FaEye, FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [getUserData, setGetUSerData] = useState([]);
    console.log(getUserData)

    const getinpdata = async (e) => {
        // e.preventDefault();
        // const { name, email, age, mobile, work, address, desc } = inVal;

        const res = await fetch("http://localhost:4000/getdata", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            // alert("error")
            console.log("error")
        } else {
            // alert("data added")
            setGetUSerData(data)
            console.log("get data")
        }
    };

    const deleteuserData = async (id)  => {
        const res2 = await fetch(`http://localhost:4000/deletedata/${id}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        } );

        const deleteUserData = await res2.json();
        console.log(deleteUserData);

        if(res2.status === 404 || !deleteUserData) {
            console.log("error")
        }else{
            console.log("user deleted");
            getinpdata();
        }
     }

    useEffect(() => {
        getinpdata();
    }, []);

    return (
        <>
        
     
        <h1 className='text-center'>M.E.R.N CRUD Oprations</h1>
            <div className='mt-5'>
                <div className='container'>
                    <div className='add-btn mt-2 mb-3'>
                        <NavLink to="/register" className='btn btn-primary'>Add data</NavLink>
                    </div>
                    <table class="table">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col" className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getUserData.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1} </th>
                                                <td>{element.name} </td>
                                                <td>{element.email} </td>
                                                <td>{element.work} </td>
                                                <td>{element.mobile} </td>
                                                <td className='d-flex justify-content-evenly'>
                                                    <NavLink to={`detail/${element._id}`}><button className='btn btn-success'><FaEye /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}><button className='btn btn-primary'><FaPenAlt /> </button></NavLink>
                                                    <button className='btn btn-danger' onClick={() => deleteuserData(element._id)} ><FaTrashAlt /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home;
