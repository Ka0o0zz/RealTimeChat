import imgError from "@assets/img.png";
import imgLogin from "../../Login/assets/illustration_login.png";
import { useNavigate } from "react-router-dom";

type Props = {
  error: boolean;
  message?: string;
};

export const VerifyError = ({ error, message }: Props) => {
  const navigate = useNavigate();
  if (error) {
    return (
      <div className="verify-error">
        <h2>¡Oops!</h2>
        <h2>{message}</h2>
        <img src={imgError} alt="" />
        <button className="button-primary" onClick={() => navigate("/")}>
          Go to home
        </button>
      </div>
    );
  }

  return (
    <div className="verify-error">
      <h2>Login</h2>
      <h2 className="false">Your account is already registered</h2>
      <img src={imgLogin} alt="" />
      <button
        className="button-primary"
        onClick={() => navigate("/auth/login")}
      >
        Login
      </button>
    </div>
  );
};
