import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";

type props = {
  error: AlertColor | undefined;
  title: string;
  principalText: string;
  secondaryText?: string;
  link?: string;
};

export const ErrorFeedback = ({
  error,
  title,
  principalText,
  secondaryText,
  link,
}: props) => {
  return (
    <Alert severity={error} style={{ marginBottom: "20px" }}>
      <AlertTitle>{title}</AlertTitle>
      {principalText}{" "}
      {secondaryText && (
        <>
          {" "}
          —{" "}
          <Link to={`/${link}`}>
            <strong>{secondaryText}</strong>
          </Link>
        </>
      )}
    </Alert>
  );
};
