import loginImg from "../../../assets/illustration_login.png";

import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import { SubmitHandler, useForm } from "react-hook-form";
import { handleEmailValidation } from "../../../helpers/handleEmailValidation";

import { Input } from "../../../components/Input";
import { Link } from "react-router-dom";

interface IFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  console.log(errors);

  return (
    <main className="Auth">
      <section>
        <img src={loginImg} alt="" />
      </section>
      <section>
        <h2>Sign in to the RealTimeChat</h2>
        <p>
          New user?{" "}
          <Link to="/register">
            <a>Create an account</a>
          </Link>
        </p>
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
            helperText={"You must enter your email"}
            type="email"
            errorEmail={errors.email?.type === "validate"}
          />

          <Input
            label="Password"
            password={true}
            register={{ ...register("password", { required: true }) }}
            error={errors.password ? true : false}
            helperText={"You must enter your password"}
          />

          <a href="#">Forgot password?</a>
          <button className="button-primary">Login</button>
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
