import { User, UserFromApi } from "../models";

export function userApiToUser(userApi: UserFromApi): User {
    return {
        email: userApi.email,
        username: userApi.username,
        age: userApi.age,
        id: userApi.id,
        role: userApi.role
    }
}