import ReactCodeInput from "react-code-input";

type PropsCodeInput = {
  name: string;
  isValid: boolean;
  fields: number;
  onChange: (value: string) => void;
  value: string;
};

export const CodeInput = ({
  name,
  isValid,
  fields,
  onChange,
  value,
}: PropsCodeInput) => {
  const props: any = {
    className: "reactCodeInput",
    inputStyle: {
      margin: "5px",
      width: "50px",
      height: "50px",
      borderRadius: "3px",
      fontSize: "18px",
      paddingLeft: "7px",
      backgroundColor: "#f0f0f0",
      color: "black",
      border: "1px solid #f0f0f0",
      textAlign: "center",
      fontWeight: "800",
    },
    inputStyleInvalid: {
      margin: "5px",
      width: "50px",
      height: "50px",
      borderRadius: "3px",
      fontSize: "18px",
      paddingLeft: "7px",
      backgroundColor: "rgb(255 187 187)",
      color: "black",
      border: "1px solid #d32f2f",
      textAlign: "center",
      fontWeight: "800",
    },
  };

  return (
    <ReactCodeInput
      name={name}
      inputMode={"tel"}
      type="text"
      isValid={isValid}
      fields={fields}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};
