import registerImg from "../../../assets/illustration_register.png";

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
  name: string;
  lastName: string;
  phone: number;
  validatePassword: string;
}

export const Register = () => {
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  console.log(errors);

  return (
    <main className="Auth register">
      <section>
        <img src={registerImg} alt="" />
      </section>
      <section>
        <h2>Register in to the RealTimeChat</h2>
        <p>
          Do you already have an account?{" "}
          <Link to="/login">
            <a>log in</a>
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="two-inputs-inline">
            <Input
              label="Name"
              password={false}
              register={{
                ...register("name", {
                  required: true,
                }),
              }}
              error={errors.name ? true : false}
              helperText={"Enter your name"}
              type="text"
            />

            <Input
              label="Last name"
              password={false}
              register={{
                ...register("lastName", {
                  required: true,
                }),
              }}
              error={errors.lastName ? true : false}
              helperText={"Enter your last name"}
              type="text"
            />
          </div>

          <div className="two-inputs-inline">
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
              helperText={"Enter your email"}
              type="email"
              errorEmail={errors.email?.type === "validate"}
            />

            <Input
              label="Phone"
              password={false}
              register={{
                ...register("phone", {
                  required: true,
                }),
              }}
              error={errors.phone ? true : false}
              helperText={"Enter your phone"}
              type="text"
            />
          </div>

          <div className="two-inputs-inline">
            <Input
              label="Password"
              password={true}
              register={{ ...register("password", { required: true }) }}
              error={errors.password ? true : false}
              helperText={"Enter your password"}
            />

            <Input
              label="Password"
              password={true}
              register={{ ...register("validatePassword", { required: true }) }}
              error={errors.validatePassword ? true : false}
              helperText={"enter your password"}
            />
          </div>
          <div className="conditions">
            <input type="checkbox" />
            <p>
              I accept the <a href="#">Terms of Service</a> and agree to the{" "}
              <a href="">Privacy Policy</a>.
            </p>
          </div>
          <button className="button-primary">Register</button>
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
