import {Form as BootForm, Button, Container, Row, Col}  from 'react-bootstrap'
import {Form, redirect} from 'react-router-dom'
import {profilStore} from '../../Store/ProfilStore/profil-store';


export async function action({ request, params }){
    
    console.log(request);
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    profilStore.POST({mailRef: updates.email, pwdRef: updates.password})
    return redirect("/home")
}

export default function CreateProfilForm() {
    return (
        
        <Form method='post'  >
            <Container>
                <Row>
                    <Col  xs={2}>
                        <BootForm.Label>Email address</BootForm.Label>
                    </Col>
                    <Col xs={6}>
                        <BootForm.Control type="email" placeholder="Enter email" name="email"/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col  xs={2}>
                        <BootForm.Label>Password</BootForm.Label>
                    </Col>
                    <Col xs={6}>
                        <BootForm.Control type="password" placeholder="Enter password" name="password"/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col xs={2}>
                    <Button  type="submit">
                        Submit
                    </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
           
            
        </Form>
    )
}