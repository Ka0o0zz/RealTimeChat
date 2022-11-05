import { RegisterUser } from "@models/auth";

export const createAdaptedUser = (user: any) => ({
  uuid: user.data.data.uuid,
  name: user.data.data.name,
  lastName: user.data.data.lastName,
  token: user.data.data.token,
});

export const createAdapterPostUser = ({
  name,
  lastName,
  email,
  phone,
  password,
}: RegisterUser) => ({
  name,
  lastName,
  email,
  phone,
  password,
});
