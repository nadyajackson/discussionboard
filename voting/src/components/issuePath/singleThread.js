import React, {useContext} from 'react'
import { UserContext } from '../../context/UserProvider'
import Comment from './commentByIssue'

export default function SingleThread(props){
  const{inputs} = props
  const { issueComments, issues} = useContext(UserContext)
  console.log(inputs.issue, "threadview")
  var Title = issues.filter(primary => inputs.issue === primary._id)
 
  return (
    <div>
       {/* <h1>{Title[0].topic}</h1>  */}
    <div className="comments">
      {issueComments.map(comment =>  <Comment {...comment}  key={comment._id}/>)} 
    </div> 
    </div>
  )
}