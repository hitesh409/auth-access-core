import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TokenService{
    private key = 'access_token';

    getToken(): string | null{
        return localStorage.getItem(this.key);
    }

    setToken(token : string){
        localStorage.setItem(this.key,token);
    }

    cleatToken(){
        localStorage.removeItem(this.key);
    }
}