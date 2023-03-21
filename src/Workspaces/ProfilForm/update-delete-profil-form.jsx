import {Form as BootForm, Button}  from 'react-bootstrap'
import {Form, redirect} from 'react-router-dom'
import {profilStore} from '../../Store/ProfilStore/profil-store';
import {loginStore as store} from "../../Store/LoginStore/login-store";
import { useRef, useState } from 'react';

export async function action({ request, params }){
    
    console.log(request);
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    profilStore.POST({mailRef: updates.email, pwdRef: "coucou"})
    return redirect("/home")
}

export default function UpdateDeleteProfilForm() {
    const [loginStore, setLoginStore] = useState(store); 
    const emailRef = useRef(loginStore.login)
    if(!loginStore.isConnected){
        throw new Error("Bad Request : user is not connected");
    }
    return (
        <Form method='post'  >
           <BootForm.Group className="mb-12" >
                <BootForm.Label>Email address</BootForm.Label>
                <BootForm.Control type="email" value={loginStore.login} disabled={true}/>
                
            </BootForm.Group>
            <Button  type="submit">
                Submit
            </Button>
        </Form>
    )
}