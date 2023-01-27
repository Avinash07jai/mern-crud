import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    // const [getUserData, setGetUSerData] = useState([]);

    const histroy = useNavigate();

    const [inVal, setInVal] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        address: "",
        desc: ""
    })

    const setdata = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setInVal((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const { id } = useParams();
    console.log(id);

    const getinpdata = async () => {

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
            setInVal(data)
            console.log("get data")
        }
    }

    useEffect(() => {
        getinpdata();
    }, []);

    const updateduser = async (e) => {
        e.preventDefault();

        const {name, email, age, mobile, work, address, desc} = inVal;

        const res2 = await fetch(`http://localhost:4000/updatedata/${id}`, {
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name, email, age, mobile, work, address, desc
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 404 || !data2){
            alert("Fill the data")
        }else{
            alert("data added");
            histroy("/")
        }
    }
      
    return (
        <>
            <div className='container'>
                <NavLink to='/'>Home 2</NavLink>

                <form className='mt-5'>
                    <div className='row'>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" value={inVal.name} onChange={setdata} name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">email</label>
                            <input type="email" value={inVal.email} onChange={setdata} name='email' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Age</label>
                            <input type="number" value={inVal.age} onChange={setdata} name='age' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Mobile</label>
                            <input type="number" value={inVal.mobile} onChange={setdata} name='mobile' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Work</label>
                            <input type="text" value={inVal.work} onChange={setdata} name='work' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" value={inVal.address} onChange={setdata} name='address' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-12 col-md-12 col-12">
                            <label for="exampleInputPassword1" className="form-label">Description</label>
                            <textarea type="text" value={inVal.desc} onChange={setdata} name='desc' className="form-control" cols="30" rows={6} />
                        </div>

                        <button type="submit" onClick={updateduser} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit;
