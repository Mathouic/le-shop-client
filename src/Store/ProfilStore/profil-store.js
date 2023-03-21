import axios from "axios";
import { Subject } from "rxjs";
import {loginStore} from '../LoginStore/login-store'

class ProfilStoreClass {
    
    constructor(){
        this.Mail ='';
        this.mainSubject = new Subject();
        this.errorSubject = new Subject();
        this.observers = new Map();
    }

    subscribe(name, nextRef, errorRef) {

        if(this.observers.get(name)){
            this.unsubscribe(name);
        }
       let subscription = {
        main: this.mainSubject.subscribe(nextRef),
        error: this.errorSubject.subscribe(errorRef)
       }
        this.observers.set(name, subscription);  
         
    }
    unsubscribe(name) {
        this.observers.get(name).main.unsubscribe();
        this.observers.get(name).error.unsubscribe();
        this.observers.delete(name);
    }

    POST({mailRef, pwdRef}) {

        let dto = {
            mail: mailRef,
            password: pwdRef
        }


        axios.post("https://localhost:7253/api/profil",dto)
        .then((res)=>{
            this.mail = mailRef;
            this.mainSubject.next({mailRef: this.login});
            loginStore.logon({loginRef: dto.mail, pwdRef: dto.password});
        }).catch((err)=>{
            this.errorSubject.next({login: this.login, isConnected: this.isConnected, msg: err.message});
        })

    

    }

    
}

export const  profilStore = new ProfilStoreClass();

// export default profilStore;