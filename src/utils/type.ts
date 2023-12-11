export type CreateUserParams = {
  nom: string;
  prenom: string;
  telephone: string;
  age: number;
  dob: string;
  email: string;
  password: string;
  confirmPassword:string;
  createAt: string;
};
export type UpdateUserParams = {
  nom: string;
  prenom: string;
  telephone: string;
  age: number;
  dob: string;
  email: string;
  password: string;
  confirmPassword:string;
  createAt: string;
};
export type CreateUserPostParams = {
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
};
export type UpdateReservationParams = {
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
};

export type CreateEscaleParams = {
  createAt: string;
  HeureDepart: string;
  HeureArriver: string;
}
export type UpdateEscaleParams = {
  createAt: string;
  HeureDepart: string;
  HeureArriver: string;
}

export type CreateVilleParams = {
  Nom_ville: string;
  lieu: string;
  Code_postal: number;
}
export type UpdateVilleParams = {
  Nom_ville: string;
  lieu: string;
  Code_postal: number;
}

export type CreateTansportParams = {
    origine: string;
    destination: string;
    date_depart : string;
    date_arrived: Date;
    heure_depart: Date;
    poids_disponibles: number;
    description: string;
    type: string;
}

export type UpdateTansportParams = {
  origine: string;
  destination: string;
  date_depart : string;
  date_arrived: Date;
  heure_depart: Date;
  poids_disponibles: number;
  description: string;
  type: string;
}

export type CreateVehiculeParams = {
  matricule:string;
  couleur:string;
  type:string;
  marque:string;
}

export type UpdateVehiculeParams = {
  matricule:string;
  couleur:string;
  type:string;
  marque:string;
}

export type CreateDriverParams = {
  permis_categories:string;
}
export type createCompagnieParams ={
  name: string;
  siege: string;
  lieu_exercice: string;
  nif: string;
  stat: string;
  contact: string;
  description: string;
}

export type createLogoCompagnieParams ={
  photo: string;
  createAt: Date;
}

export type updateCompagnieParams ={
  name: string;
  siege: string;
  lieu_exercice: string;
  nif: string;
  stat: string;
  contact: string;
  description: string;
}