import logo from '../../styles/layout/logo.png'
import '../../styles/layout/style_s.css'
import '../../styles/layout/style_m.css'
import '../../styles/layout/style_xl.css'
import LoginForm from './login-form'
import { useEffect, useState } from 'react'
import {loginStore as store} from '../../Store/LoginStore/login-store'


export default function Header() {
    const [loginStore, setLoginStore] = useState(store); 
    
    
    // const onLogon = (event) => {
    //     if(isConnected) console.log("Logon");
    //     setIsConnected(1);
    // }

    // const onLogoff = (event) => {
    //     if(!isConnected) console.log("Logoff");
    //     setIsConnected(0);
    // }

    useEffect(()=>{
        loginStore.subscribe("Header",
        (result)=>{
            console.log("Header : receive next")
            // setIsConnected(1);
        },
        (result)=>{
            console.log("Header : receive error")
        })
        
     },[])
    return (
        <header className='le-header'>
            <div className='le-burger'>
                Burger
            </div>
            <div className='le-accueil'>
                <img src={logo} width="45" height="45" alt="levore"/>
                LEVORE
            </div>
            <div className='le-menu'>
                <a>menu</a>
                <a>menu</a>
                <a>menu</a>
                <a>menu</a>
            </div>
            <div className='le-profil-manager'>
                <LoginForm/>
            </div>
        </header>
    )
}