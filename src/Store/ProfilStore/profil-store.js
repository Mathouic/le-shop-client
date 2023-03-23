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

   PUT({mailRef, pwdRef}) {

        let dto = {
            mail: mailRef,
            password: pwdRef
        }


        axios.put("https://localhost:7253/api/profil",dto)
        .then((res)=>{
            this.mainSubject.next({type: 'updated', data: res.data});
        }).catch((err)=>{
            this.errorSubject.next({type: 'updatedError', data: err});
        })
    }

    DELETE({mailRef, pwdRef}) {

        let dto = {
            mail: mailRef,
            password: pwdRef
        }


        axios.delete("https://localhost:7253/api/profil/"+ dto.mail)
        .then((res)=>{
            this.mainSubject.next({type: 'deleted'});           
        }).catch((err)=>{
            this.errorSubject.next({type: 'deletedError', data: err});
        })
    }
    
}

export const  profilStore = new ProfilStoreClass();

// export default profilStore;