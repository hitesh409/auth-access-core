import { CurrentUser } from "./current-user.model";

export interface AuthResponse {
    accessToken: string;
    userContext:  CurrentUser;
}