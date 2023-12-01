export class UpdateTransportDto{
    origine: string;
    destination: string;
    date_depart : Date;
    date_arrived: Date;
    heure_depart: Date;
    poids_disponibles: number;
    description: string;
    type: string;
    companyId:number;
    vehiculeId:number;
}