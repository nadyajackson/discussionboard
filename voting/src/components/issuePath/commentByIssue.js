import React from 'react';


export default function CommentByIssue(props){
    const { body, datePosted, username} = props

    return(
        <div className="comment">
            <p>{body}</p>
            <h5>Written by: {username} on {datePosted} </h5>
        </div>
    )
}