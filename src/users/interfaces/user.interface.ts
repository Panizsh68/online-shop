import { Role } from "src/common/enums/role.enum";

export interface User {
    username: string,
    email: string,
    password: string,
    role?: Role
}