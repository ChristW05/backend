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
};

export type CreateReservationParams = {
  destinataire: string;
  point_de_recuperation: string;
  point_dArriver: string;
  prix_a_payer_Ar: number;
};

export type UpdateReservationParams = {
  destinataire: string;
  point_de_recuperation: string;
  point_dArriver: string;
  prix_a_payer_Ar: number;
};
