import { Time } from "@angular/common";

export interface Activitate {
    id ?: number;
    ora: Time;
    data: Date;
    subiect: String;
    descriere: String;
}