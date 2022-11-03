import axios from "axios";

//models
import { User } from "@models/auth";

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
