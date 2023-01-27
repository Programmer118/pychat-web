import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage,db } from "./firebase"
import "./style.scss"
import Add from "./img/Avatar.jpeg"
import { doc, setDoc } from "firebase/firestore"; 

import { 
   ref, 
   uploadBytesResumable, 
   getDownloadURL 
  } from "firebase/storage";
import { useNavigate,Link } from 'react-router-dom'


const Register = () => {

  const [files, setFile] = useState();
    function handleChange(e) {
        console.log(e.target[0].value);
        setFile(URL.createObjectURL(e.target[3].files[0]));
    }

  
  const navigate = useNavigate()
  const [err,seterr] = useState(false) 
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try{

      const res= await createUserWithEmailAndPassword(auth, email, password)


      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          seterr(true)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"users",res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
            });

            await setDoc(doc(db,"userChats",res.user.uid),{
            })
            navigate("/")
          });
        }
      );

    }catch(err){
      seterr(true)
    }
         
  }

  return (   
      <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>PyChat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file' onChange={handleChange}/>
            <label htmlFor="file">
                <img src={Add} alt="" />
                <span style={{display:'flex',alignItems:'center'}}>Add prfile photo<p style={{color:'red'}}>*</p></span>
            </label>
            <button>Sign Up</button>
            {err && alert("Something went Wrong")}
        </form>
                <img src={files} alt="img" />
        <p>You do have an account? <Link to='/login'>Login</Link></p>
      </div>
      </div>
  )
}

export default Register
