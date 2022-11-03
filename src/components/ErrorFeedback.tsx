import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type props = {
  error: AlertColor | undefined;
  title: string;
  principalText: string;
  secondaryText?: string;
};

export const ErrorFeedback = ({
  error,
  title,
  principalText,
  secondaryText,
}: props) => {
  return (
    <Alert severity={error} style={{ marginBottom: "20px" }}>
      <AlertTitle>{title}</AlertTitle>
      {principalText}{" "}
      {secondaryText && (
        <>
          {" "}
          — <strong>{secondaryText}</strong>
        </>
      )}
    </Alert>
  );
};
