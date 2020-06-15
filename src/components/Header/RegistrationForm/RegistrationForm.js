import React, { useState } from 'react';

function RegistrationForm(props) {

    const [state, setState] = useState(
        {
            email : "",
            password: ""
        })
    const handleChange = (e) => {

        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" />
                    <small id="emailHelp" className="form-text text-muted"> We'll never share your email </small>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword"> Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={state.email} onChange={handleChange}/>
                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="Confirmpassword" placeholder="Confirm Password" value={state.password} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    )
}
export default RegistrationForm;