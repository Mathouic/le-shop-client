import axios from "axios";
import { Subject } from "rxjs";

class LoginStoreClass {
    
    constructor(){
        this.login ='';
        this.isConnected = false;
        this.mainSubject = new Subject();
        this.errorSubject = new Subject();
        this.observers = new Map();

        this.urlBase = process.env.REACT_APP_URL_BASE_API;
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

    logon({loginRef, pwdRef}) {

        let logonDTO = {
            login: loginRef,
            password: pwdRef
        }


        axios.post(this.urlBase + "/Logon",logonDTO)
        .then((res)=>{
            this.login = loginRef;
            this.isConnected = true;
            this.mainSubject.next({login: this.login, isConnected: this.isConnected});
        }).catch((err)=>{
            this.isConnected = false;
            this.errorSubject.next({login: this.login, isConnected: this.isConnected, msg: err.message});
        })

    

    }

    logoff(){
        this.login = "";
        this.isConnected = false;
        this.mainSubject.next({login: this.login, isConnected: this.isConnected})
    }
}

export const  loginStore = new LoginStoreClass();

// export loginStore;