import {Form as BootForm, Button, Container, Col, Row}  from 'react-bootstrap'
import {Form, redirect, useNavigate} from 'react-router-dom'
import {profilStore} from '../../Store/ProfilStore/profil-store';
import {loginStore, loginStore as store} from "../../Store/LoginStore/login-store";
import { useEffect, useRef, useState } from 'react';
import './update-delete-profil-form.css'

// export async function action({ request, params }){
    
//     console.log(request);
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);
//     profilStore.POST({mailRef: updates.email, pwdRef: "coucou"})
//     return redirect("/home")
// }

export default function UpdateDeleteProfilForm() {
    //const [loginStore, setLoginStore] = useState(store); 
    const [emailValue, setEmailValue] = useState(loginStore.login)
    const [passwordValue, setPasswordValue] = useState()
    const navigate = useNavigate();
    if(!loginStore.isConnected){
        throw new Error("Bad Request : user is not connected");
    }

    

    const onDelete = (event) => {
        profilStore.DELETE({mailRef: emailValue, pwdRef: passwordValue})
    }
    const onUpdate = (event) => {
        profilStore.PUT({mailRef: emailValue, pwdRef: passwordValue})
    }
    const onClose = (event) => {
        navigate("/home");
    }

    useEffect(()=>{
        profilStore.subscribe("UpdateDeleteProfilForm",
            (result)=>{
                
                if (result.type == "updated"){
                    console.log("UpdateDeleteProfilForm : receive updated")
                    setPasswordValue('');
                } else if (result.type == "deleted"){
                    console.log("UpdateDeleteProfilForm : receive deleted")
                    navigate("/home");
                    loginStore.logoff();
                }
                
            },
            (result)=>{
                console.log("UpdateDeleteProfilForm : receive error")
            })
        
     },[])
    return (
        <Form method='post'  >
            <Container>
                <Row className='mt-3'>
                    <Col  xs={2}>
                        <BootForm.Label>Email address</BootForm.Label>
                    </Col>
                    <Col xs={6}>
                        <BootForm.Control type="email" value={emailValue} disabled={true}/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-3'>
                    <Col  xs={2}>
                        <BootForm.Label>Password</BootForm.Label>
                    </Col>
                    <Col xs={6}>
                        <BootForm.Control 
                            type="password" 
                            placeholder="Enter password" 
                            name="password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row  className='mt-3'>
                    <Col xs={2}></Col>
                    <Col xs={6} className="text-end">
                        <Button  onClick={() => onDelete()}>
                            Delete
                        </Button>
                        &nbsp;
                        <Button  onClick={(e) => onUpdate()}>
                            Update
                        </Button>
                        &nbsp;
                        <Button  onClick={(e) => onClose()}>
                            Close
                        </Button>
                    </Col>
                    <Col ></Col>
                </Row>
            </Container>

           {/* <BootForm.Group className="mb-12" >
                <BootForm.Label>Email address</BootForm.Label>
                <BootForm.Control type="email" value={loginStore.login} disabled={true}/>
                
            </BootForm.Group>
            <Button  type="submit">
                Submit
            </Button> */}
        </Form>
    )
}