import { message } from 'antd'
import axios from 'axios'
import NProgress from 'nprogress'
NProgress.settings.showSpinner = false
const request = axios.create({
    baseURL:'http://localhost:8080',
    timeout:3000
})
request.interceptors.request.use(
    (config)=>{
        NProgress.start()
        const token = localStorage.getItem('token')
        if(token){
            config.headers['authorization'] = `Bearer ${token}`
        }
        return config
    },
    (err)=>{
        console.log('请求发出错误',err)
        return err
    }
)
request.interceptors.response.use(
    (response)=>{
        NProgress.done()
        const {authorization} = response.headers
        if(authorization){
            localStorage.setItem('token',authorization)
        }
        if(response.status===401){
            message.info("没有权限")
        }else if(response.status === 500 || response.status === 505){
            message.info("服务器错误")
        }else if(response.status===404){
            message.info("找不到请求地址")
        }else{
            message.info("请求错误")
        }
        return response
    },
    (err)=>{
        NProgress.done()
        return err
    }
)