import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../AuthContext'
import { ChatContext } from '../UserContext'

const MessageC = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const date = message.date.toDate().toDateString()
  var s = new Date(date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: 'smooth'})
  },[message])
  return (
    <div ref={ref} className={`message ${message.senderId===currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId===currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="img" />
      </div>
      <div className="messageContent">
        <span>{s}</span>
        <p>{message.text}</p>
        {message.img&&<img src={message.img} alt="" />}
      </div>
    </div>
  )
}
export default MessageC
// export{ date}
