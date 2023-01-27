import React,{ useState } from 'react'
import './style.scss'
import { useNavigate,Link } from 'react-router-dom'
import { auth, } from "./firebase"
import { signInWithEmailAndPassword } from "firebase/auth";



const SignIn = () => {

  const navigate = useNavigate()
  const [err,seterr] = useState(false) 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try{
      await signInWithEmailAndPassword(auth, email, password)
      
      // console.log(user)

      navigate('/')
      
      }catch(err){
        console.log(err)
      seterr(true)
    }
         
  }



  return (
    <div>
      <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>PyChat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='email' id='email'/>
            <input type="password" placeholder='password'/>
            <input style={{display:"none"}} type="file" id='file' />
            <button>Login</button>
        </form>
        <p>You don't have an account? <Link to='/register'>Register</Link></p>
        {err && <span>Something went wrong</span>}
      </div>
      </div>
    </div>
  )
}

export default SignIn
