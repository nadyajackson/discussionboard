import React, {useContext} from 'react';
import IssueThreads from './IssueThreads.js';
import {UserContext} from '../../context/UserProvider';
import {Link} from 'react-router-dom';


export default function ThreadView(){
  const{ user:{username}, issueComments, selectIssueThread, issues} = useContext(UserContext)
 

  return (
    <div className="ThreadView">
      <Link to="/">Back to Login</Link>
      <h1>Select an Issue Thread</h1>
      <IssueThreads 
        selectIssueThread={selectIssueThread} 
        issueComments={issueComments} 
        username={username} 
        issues={issues}
        />
    </div>
  )
}