import axios from "axios";

//models
import { RegisterUser, User } from "@models/auth";

//helpers
import { loadAbort } from "@helpers/load-abort-axios.helper";

const URL = "http://localhost:8080/api";

export const login = (email: string, password: string) => {
  const controller = loadAbort();
  return {
    call: axios.post<User>(
      `${URL}/auth/login`,
      { email, password },
      { signal: controller.signal }
    ),
    controller,
  };
};

export const registerUser = ({
  name,
  lastName,
  email,
  phone,
  password,
}: RegisterUser) => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${URL}/auth/`,
      { name, lastName, email, phone, password },
      { signal: controller.signal }
    ),
    controller,
  };
};

export const generateOTP = ({ uuid }: { uuid: string }) => {
  const controller = loadAbort();
  return {
    call: axios.get(`${URL}/auth/${uuid}`, { signal: controller.signal }),
    controller,
  };
};

export const verifyOTP = ({ uuid, otp }: { uuid: string; otp: number }) => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${URL}/auth/verify`,
      { uuid, otp },
      { signal: controller.signal }
    ),
    controller,
  };
};
