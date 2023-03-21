import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, FormControl, Modal } from "react-bootstrap";
import { Person, Power, FilePerson } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import {loginStore as store} from "../../Store/LoginStore/login-store";
import {redirect} from 'react-router-dom'




export default function LoginForm (){
    const emailRef = useRef();
    const pwdRef = useRef();
    const [loginStore, setLoginStore] = useState(store); 
    const [isConnected, setIsConnected] = useState(0);
    const [show, setShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    
    // onEventFunction
    const onLogin = (event) => {
        loginStore.logon({loginRef: emailRef.current.value, pwdRef: pwdRef.current.value})
    }
    const onLogoff = (event) => {
        loginStore.logoff()
        navigate("/home")
    }

    const onProfil = (event) => {
        navigate("/profil/"+ loginStore.login)
    }
    const handleClose = () => setShow(false);
    // End oneventFunctions

     useEffect(()=>{
        loginStore.subscribe("LoginForm",
            (result)=>{
                console.log("LoginForm : receive next")
                result.isConnected ? setIsConnected(1) : setIsConnected(0);
            },
            (result)=>{
                console.log("LoginForm : receive error")
                setIsConnected(0)
                setErrorMsg(result.msg)
                setShow(true)
            })
        
     },[])
    
     if (!isConnected){
    return (
        <>
            <Form className="row gy-2 gx-3 align-items-center">
                <div className="col-auto">
                    <FormControl type="email" placeholder="mail" ref={emailRef}/>
                </div>
                <div className="col-auto">
                    <FormControl type="password" placeholder="password" ref={pwdRef}/>
                </div>
                <div className="col-auto">
                    <Button variant="primary" onClick={(e)=>onLogin()}>ok</Button>
                </div>
                <div className="col-auto">
                    <Link to={'signin'}>Sign In</Link>
                </div>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Connexion error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMsg} 
                </Modal.Body>
                <Modal.Footer>
                
                </Modal.Footer>
            </Modal>
        </>
    )
     } else {
        return (
            <Dropdown autoClose="outside">
                <Dropdown.Toggle>
                    <Person/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e)=> onProfil()}>
                       <FilePerson/>&nbsp;Profil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e)=>onLogoff()}>
                        <Power/>&nbsp;Logoff
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
     }
}