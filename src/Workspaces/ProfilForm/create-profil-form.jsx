import {Form as BootForm, Button}  from 'react-bootstrap'
import {Form, redirect} from 'react-router-dom'
import {profilStore} from '../../Store/ProfilStore/profil-store';


export async function action({ request, params }){
    
    console.log(request);
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    profilStore.POST({mailRef: updates.email, pwdRef: "coucou"})
    return redirect("/home")
}

export default function CreateProfilForm() {
    return (
        <Form method='post'  >
           <BootForm.Group className="mb-12" controlId="formBasicEmail">
                <BootForm.Label>Email address</BootForm.Label>
                <BootForm.Control type="email" placeholder="Enter email" name="email"/>
                <BootForm.Text className="text-muted">
                We'll never share your email with anyone else.
                </BootForm.Text>
            </BootForm.Group>
            <Button  type="submit">
                Submit
            </Button>
        </Form>
    )
}