import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "../services/app-config.service";

@Injectable({providedIn: 'root'})

export class AuthService{
    constructor(private http: HttpClient, private config: AppConfigService){}

    login(data: any){
        return this.http.post(`${this.config.apiUrl}/auth/login`,data, {withCredentials: true});
    }

    refreshToken(){
        return this.http.post(`${this.config.apiUrl}/auth/refresh`,{},{withCredentials: true});
    }

    logout(){
        return this.http.post(`${this.config.apiUrl}/auth/logout`,{},{withCredentials: true});
    }
}