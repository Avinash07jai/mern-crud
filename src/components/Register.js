import React, {useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

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

    const addinpdata = async (e) => {
        e.preventDefault();
        const { name, email, age, mobile, work, address, desc } = inVal;

        const res = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, age, mobile, work, address, desc 
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 404 || !data) {
            alert("error")
            console.log("error")
        }else{
            alert("data added")
            histroy("/");
            console.log("data added")
        }
    }
    return (
        <>
            <div className='container'>
                <NavLink to='/'>Home</NavLink>

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

                        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;
