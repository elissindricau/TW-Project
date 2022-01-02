export interface Consultatie {
    id ?: number;
    cnp: number;
    nume: string;
    prenume: string;
    dataConsultatie: string;
    simptome: string;
    diagnostic: string;
    prescriptie: string;
}