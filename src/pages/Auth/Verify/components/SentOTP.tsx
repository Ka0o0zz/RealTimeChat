import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

//hooks
import useFetchAndLoad from "@hooks/useFetchAndLoad";

//components
import { CodeInput } from "@pages/Auth/components/CodeInput";

//services
import { verifyOTP } from "@services/auth";

//adapters
import { createAdaptedUser } from "@adapters/userAdapter";

//reduxStore
import { createUser } from "@redux/states/user";
import { CircularProgress } from "@mui/material";

type Props = {
  uuid?: string;
};

export const SentOTP = ({ uuid }: Props) => {
  const [input, setInput] = useState("");
  const [valid, setValid] = useState(true);

  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await callEndpoint(
        verifyOTP({ uuid: `${uuid}`, otp: parseInt(input) })
      );
      dispatch(createUser(createAdaptedUser(user)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (code: any) => setInput(code);

  return (
    <>
      <h1>RealTimeChat</h1>
      <h2>Enter the code we sent 👀</h2>
      <h3>
        To your cell phone number <span>+57 3024633695</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <CodeInput
          name={"verify-code"}
          isValid={valid}
          fields={6}
          onChange={handleChange}
          value={input}
        />
        <button>
          {loading ? <CircularProgress color="inherit" /> : "Verify"}
        </button>
      </form>
      <p>
        Didn't receive the code?{" "}
        <button className="resend-code">Resend code</button>
      </p>
    </>
  );
};
