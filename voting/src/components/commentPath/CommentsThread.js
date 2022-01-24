import React from 'react'
import Comment from './comment'

export default function CommentsThread(props){
  const { userComments} = props 
  return (
    <div className="comments">
       { userComments.map(comment =>  <Comment {...comment}  key={comment._id}/>) } 
    </div>
  )
}