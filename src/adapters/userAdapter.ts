export const createAdaptedUser = (user: any) => ({
  uuid: user.data.data.uuid,
  name: user.data.data.name,
  lastName: user.data.data.lastName,
  token: user.data.data.token,
});
