import React, {  useState } from 'react'
import { collection, query, where,getDocs,getDoc ,setDoc,doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {db,auth } from '../firebase'
 
const Search =  () => {
  const [username,setUserName] = useState("")
  const [user,setUser] = useState(null)
  const [err,setErr] = useState(false)
  
  const currentUser = auth.currentUser

  const handleSearch = async() =>{
    const q = query(collection(db, "users"),
    where("displayName", "==" , username))
    
    try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    });
  }catch(err){
    setErr(true)
  }
  }

  const handleKey = e =>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async() => {
     const combinedId = 
     currentUser.uid > user.uid 
     ? currentUser.uid + user.uid 
     : user.uid + currentUser.uid;
     try{
       const res = await getDoc(doc(db,"chats",combinedId))
       if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]})

        await updateDoc(doc(db, "userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
          },
          [combinedId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db, "userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL,
          },
          [combinedId+".date"]:serverTimestamp()
        })
       }
     }catch(err){}

     setUser(null)
     setUserName('')
  }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search username' onKeyDown={handleKey} onChange={e=>setUserName(e.target.value)} value={username} />
      </div>
      {err && <span>Something went Wrong</span>}
      {user && <div className="user" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
