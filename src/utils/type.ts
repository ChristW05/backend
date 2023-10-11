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
