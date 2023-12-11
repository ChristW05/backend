export class CreateTransportDto{
    origine: string;
    destination: string;
    date_depart : string;
    date_arrived: Date;
    heure_depart: Date;
    poids_disponibles: number;
    description: string;
    type: string;
}