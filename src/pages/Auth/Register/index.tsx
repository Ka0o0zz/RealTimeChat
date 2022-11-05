import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

//helpers
import { handleEmailValidation } from "@helpers/handleEmailValidation";

//components
import { Input } from "@components/Input";

//libraries
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

//assets
import registerImg from "./assets/illustration_register.png";
import { createAdapterPostUser } from "@adapters/userAdapter";
import { registerUser } from "@services/auth";
import useFetchAndLoad from "@hooks/useFetchAndLoad";
import { useRef, useState } from "react";
import { handlePasswordMatch } from "@helpers/handlePasswordMatch";
import { ErrorFeedback } from "@components/ErrorFeedback";
import { ErrorAuth } from "@models/auth";
import { CircularProgress } from "@mui/material";

interface IFormInputs {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phone: number;
  validatePassword: string;
  privacy: boolean;
}

const Register = () => {
  const [errorLogin, setErrorLogin] = useState<ErrorAuth>({
    state: false,
    message: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>();

  const password: any = useRef({});
  password.current = watch("password", "");

  const { loading, callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { name, lastName, email, phone, password } = data;

    try {
      const user = await callEndpoint(
        registerUser(
          createAdapterPostUser({ name, lastName, email, phone, password })
        )
      );
      setErrorLogin({
        state: false,
        message: "",
      });
      navigate(`/auth/verify/${user.data.data.uuid}`);
    } catch (error: any) {
      setErrorLogin({
        state: true,
        message: error.response.data.msg,
      });
    }
  };

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
        {errorLogin.state && (
          <ErrorFeedback
            error="error"
            title="Error"
            principalText={errorLogin.message}
            secondaryText={"recover your account here"}
            link={"recover-password"}
          />
        )}
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
              helperText={
                errors.email?.type === "validate"
                  ? "Enter a valid email"
                  : "Enter your email"
              }
              type="email"
              errorValidate={errors.email?.type === "validate"}
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
              register={{
                ...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                }),
              }}
              error={errors.password ? true : false}
              helperText={
                errors.password?.type === "minLength"
                  ? `${errors?.password?.message}`
                  : "Enter your password"
              }
            />

            <Input
              label="Password"
              password={true}
              register={{
                ...register("validatePassword", {
                  required: true,
                  validate: (value) =>
                    handlePasswordMatch(password.current, value),
                }),
              }}
              error={errors.validatePassword ? true : false}
              helperText={
                errors.validatePassword?.type === "validate"
                  ? `The passwords do not match`
                  : "Enter your password"
              }
              errorValidate={errors.validatePassword?.type === "validate"}
            />
          </div>
          <div className="conditions">
            <input
              type="checkbox"
              {...register("privacy", {
                required: true,
                validate: (value) => value === true,
              })}
            />
            <p>
              I accept the <a href="#">Terms of Service</a> and agree to the{" "}
              <a href="">Privacy Policy</a>.
            </p>
          </div>
          {errors.privacy && (
            <div className="conditions">
              <p className="error-input">
                You must agree to terms and conditions
              </p>
            </div>
          )}
          <button className="button-primary">
            {loading ? <CircularProgress color="inherit" /> : "Register"}
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

export default Register;
