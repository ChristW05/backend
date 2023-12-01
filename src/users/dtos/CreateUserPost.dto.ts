export class CreateUserPostDto {
  destinataire: string;
  point_de_recuperation: string;
  point_dArriver: string;
  Lat_Depart: number;
  Lat_dArriver: number;
  Poids_Colis_Kg: number;
  Distance_Km: number;
  prix_a_payer_Ar: number;
  createAt: Date;
  typeColis: string;
  description: string;
  transportId: number;
  Status:string;
}
