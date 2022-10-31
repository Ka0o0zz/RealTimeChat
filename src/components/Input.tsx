import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

type InputPassword = {
  id?: string;
  label: string;
  register: object;
  error: boolean;
  helperText: string;
  password: boolean;
  type?: string;
  errorEmail?: boolean;
};

export const Input = ({
  id,
  label,
  register,
  error,
  helperText,
  password,
  type,
  errorEmail,
}: InputPassword) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl
        style={{ width: "340px", marginRight: "10px", marginBottom: "10px" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password" error={error}>
          {label}
        </InputLabel>
        <OutlinedInput
          label={label}
          id={id && id}
          type={
            !password
              ? type === "email"
                ? "text"
                : type
              : showPassword
              ? "text"
              : "password"
          }
          {...register}
          error={error}
          endAdornment={
            password && (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
        />
        {errorEmail ? (
          <p className="error-input">Invalid email</p>
        ) : error ? (
          <p className="error-input">{helperText}</p>
        ) : (
          <></>
        )}
      </FormControl>
    </>
  );
};
