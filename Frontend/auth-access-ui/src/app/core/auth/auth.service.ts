import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "../services/app-config.service";

@Injectable({providedIn: 'root'})

export class AuthService {
    private readonly apiUrl: string;
    
    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.apiUrl = this.configService.apiUrl;
    }

    login(data: any) {
        return this.http.post(`${this.apiUrl}/auth/login`, data, { withCredentials: true });
    }

    refreshToken(){
        return this.http.post(`${this.apiUrl}/auth/refresh`,{}, { withCredentials: true });
    }

    logout(){
        return this.http.post(`${this.apiUrl}/auth/logout`,{}, { withCredentials: true });
    }
}