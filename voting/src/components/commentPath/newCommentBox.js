import React, {useState} from 'react';

const initInputs = {issue: "6135901eb1fbbe3c6c297eff", body: "" }

export default function CommentBox(props){
    const [inputs, setInputs] = useState(initInputs)
    const { addComment, issues, userName} = props
    

    function handleChange(e){
        const{name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
            'username': userName
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addComment(inputs,)
        console.log(userName, "commentbox")
        setInputs(initInputs)
    }
    
    const {issue, body} = inputs
    return(
        <form onSubmit={handleSubmit}>
            <p>Choose an Issue:</p>
            <select
                name="issue" 
                value={issue} 
                onChange={handleChange}> 
                {issues.map(primary => (<option value={primary._id} key={primary._id}>{primary.topic}</option>))}
            </select>

            <input 
                type="text" 
                name="body" 
                value={body}
                onChange={handleChange} 
                placeholder="Comment"/>
            <button>Comment</button>
        </form>
    )

}