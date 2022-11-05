export interface User {
  uuid: string;
  name: string;
  lastName: string;
  token: string;
}

export interface RegisterUser {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
}

export interface ErrorAuth {
  state: boolean;
  message: string;
}
