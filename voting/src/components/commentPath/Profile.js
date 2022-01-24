import React, {useContext} from 'react';
import CommentBox from './newCommentBox.js';

import {UserContext} from '../../context/UserProvider';
import CommentsThread from './CommentsThread.js';


//if try issue:{topic} TypeError: Cannot read properties of undefined (reading 'topic')
//if set to issue then it shows the issue id

export default function Profile(){
    const{user:{firstName, lastName, username},
        addComment, issues, userComments} = useContext(UserContext)
  
    console.log(userComments, "profile")

    return(
        <div className="profile">
            <h1> Welcome {firstName} {lastName}, you are commenting as @{username}</h1>

            <h3>Make a comment</h3>

            <CommentBox 
                addComment={addComment} 
                issues={issues} 
                userName={username}/>

            <h3>View Your Comments</h3>

            <CommentsThread 
                userComments={userComments}
                issues={issues}/>
        </div>
    )
}