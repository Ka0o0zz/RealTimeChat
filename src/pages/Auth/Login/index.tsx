import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

//helpers
import { handleEmailValidation } from "@helpers/handleEmailValidation";

//components
import { Input } from "@components/Input";
import { ErrorFeedback } from "@components/ErrorFeedback";

//hooks
import useFetchAndLoad from "@hooks/useFetchAndLoad";

//services
import { login } from "@services/auth";

//adapters
import { createAdaptedUser } from "@adapters/userAdapter";

//redux
import { createUser } from "@redux/states/user";

//libraries
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

//assets
import loginImg from "./assets/illustration_login.png";
import { ErrorAuth } from "@models/auth";

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const [errorLogin, setErrorLogin] = useState<ErrorAuth>({
    state: false,
    message: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { email, password } = data;
    try {
      const user = await callEndpoint(login(email, password));
      setErrorLogin({
        state: false,
        message: "",
      });
      dispatch(createUser(createAdaptedUser(user)));
    } catch (error: any) {
      setErrorLogin({
        state: true,
        message: error.response.data.msg,
      });
    }
  };

  return (
    <main className="Auth">
      <section>
        <img src={loginImg} alt="" />
      </section>
      <section>
        <h2>Sign in to the RealTimeChat</h2>
        <p>
          New user? <Link to="/register">Create an account</Link>
        </p>
        {errorLogin.state && (
          <ErrorFeedback
            error="error"
            title="Error"
            principalText={errorLogin.message}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            password={false}
            register={{
              ...register("email", {
                required: true,
                validate: handleEmailValidation,
              }),
            }}
            error={errors.email ? true : false}
            helperText={
              errors.email?.type === "validate"
                ? "Enter a valid email"
                : "Enter your email"
            }
            type="email"
            errorValidate={errors.email?.type === "validate"}
          />

          <Input
            label="Password"
            password={true}
            register={{ ...register("password", { required: true }) }}
            error={errors.password ? true : false}
            helperText={"You must enter your password"}
          />

          <a href="#">Forgot password?</a>
          <button className="button-primary">
            {loading ? <CircularProgress color="inherit" /> : "Login"}
          </button>
          <Divider className="divider-login">OR</Divider>
          <div className="social-media">
            <IconButton>
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton>
              <GoogleIcon />
            </IconButton>
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
