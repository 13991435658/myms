import React,{ReactNode} from 'react'
import { Navigate } from 'react-router-dom'
interface Iprops{
    children?:ReactNode
}
const Auth:React.FC<Iprops> = (props)=>{
    const token = localStorage.getItem('token')
    if(token){
        return <>{props.children}</>
    }else{
        return <Navigate to={'/'} />
    }
}

export default Auth