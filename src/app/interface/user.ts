import { Dept } from "app/enum/dept.enum";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dept: Dept;
}