import React, {useState, useContext} from 'react';
import LoginForm from './LoginForm';
import NewForm from './NewForm'
import {UserContext} from '../../context/UserProvider';


const initInputs = {username: "", password: "", 
firstName: "", lastName: "", phoneNumber: ""}

export default function Auth(){
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {signup, login, errMsg, resetError} = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)

    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetError()
    }
    return(
        <div id ="stuff">
            <h1>Rock The Vote in Week 4</h1>
            { !toggle ?
                <>
                    <NewForm 
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        errMsg={errMsg}
                    />
                    <p id="clicky" onClick={() => toggleForm()}> Switch to Login?</p>
                </>
            :
                <>
                    <LoginForm 
                         handleChange={handleChange}
                         handleSubmit={handleLogin}
                         inputs={inputs}
                         errMsg={errMsg}
                     />
                     <p id="clicky" onClick={() => toggleForm()}> New? Click to Sign up.</p>
                </>
            }
        </div>
    )

}