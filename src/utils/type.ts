export type CreateUserParams = {
  email: string;
  password: string;
};
export type UpdateUserParams = {
  email: string;
  password: string;
};

export type CreateUserProfileParams = {
  nom: string;
  prenom: string;
  telephone: number,
  email: string,
  password: string,
  confrimPassword:string,
  age: number;
  dob: string;
};
export type CreateUserPostParams = {
  titre: string;
  description: string;
  destinataire: string;
  point_de_recuperation: string;
  point_dArriver: string;
  prix_a_payer_Ar: number;
};
export type UpdateReservationParams = {
  titre: string;
  description: string;
  destinataire: string;
  point_de_recuperation: string;
  point_dArriver: string;
  prix_a_payer_Ar: number;
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
  date_depart: Date;
  date_arrived: Date;
  prix: number;
  descripton: string;
  type: string;
  id_vehicule: number;
}

export type UpdateTansportParams = {
  origine: string;
  date_depart: Date;
  date_arrived: Date;
  prix: number;
  descripton: string;
  type: string;
  id_vehicule: number;
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