export interface UserFromApi {
    id: string
    username: string
    email: string
    profile_data: any
    role: "user" | "mod" | "admin"
    age: number
    created_at: number
    updated_at: number
}
