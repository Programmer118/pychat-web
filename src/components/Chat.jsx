import React,{useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../UserContext'

const Chat = () => {
  const {data} = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
        {/* <img src='' alt=''/> */}
        
        <div className="chatIcons">
            <img src={data.user.photoURL} alt="" />
            <h3>{data.user?.displayName}</h3>
        </div>
      </div>
        <Messages/>
        <Input/>

    </div>
  )
}

export default Chat
