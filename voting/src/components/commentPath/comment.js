import React, {useContext} from 'react';
import { UserContext } from '../../context/UserProvider';

export default function Comment(props){
    const { body, datePosted, issue} = props
console.log(props, "props")
    const { issues, user:{username}} = useContext(UserContext)
    console.log(username, "usercomment")
    var Title = issues.filter(primary => issue === primary._id)
 
    return(
        <div className="comment">
            <h1>{Title[0].topic}</h1>
            <p>{body}</p>
            <h5>Written by: {username} on {datePosted} </h5>
        </div>
    )
}