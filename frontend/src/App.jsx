
import './App.css'
import Login from "./user/login/Login"
import {Routes,Route} from "react-router-dom"
import Register from './user/register/Register'
import ForgotPassword from './user/Forgotpassword/ForgotPassword'
import ResetPassword from './user/ResetPassword/ResetPassword'

function App() {

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
         <Route path='/reset-password' element={<ResetPassword />}/>

       
      </Routes>
  )
}

export default App
