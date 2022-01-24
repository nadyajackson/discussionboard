import React, {useState, useContext, useEffect} from 'react';
import SingleThread from './singleThread';
import { UserContext } from '../../context/UserProvider';

const initInputs = {issue: "6135901eb1fbbe3c6c297eff"}

export default function IssueThreads(props){
    const [inputs, setInputs] = useState(initInputs)
    const { selectIssueThread,  username} = props
    const{ issues, selectIssue} = useContext(UserContext)
    

    useEffect(() =>{
        selectIssue()
    }, [])

    function handleChange(e){
        const{name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        selectIssueThread(inputs)
       // console.log(selectIssueThread(inputs), "selected")
    }

    const {issue} = inputs
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <p>Choose an Issue:</p>
            <select
                name="issue" 
                value={issue} 
                onChange={handleChange}> 
                {issues.map(primary => (<option value={primary._id} key={primary._id}>{primary.topic}</option>))}
            </select>
            <button> View </button>
        </form>
        <SingleThread inputs={inputs} username={username} issues={issues} />
        </div>
    )
}