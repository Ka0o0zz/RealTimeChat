import useFetchAndLoad from "@hooks/useFetchAndLoad";
import { generateOTP } from "@services/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SentOTP } from "./components/SentOTP";

//components
import { VerifyError } from "./components/VerifyError";

type ErrorVerify = {
  state: boolean | null;
  message: string;
};

const Verify = () => {
  const [errors, setError] = useState<ErrorVerify>({
    state: null,
    message: "",
  });

  const { uuid } = useParams();
  const { loading, callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    (async () => {
      try {
        const otp = await callEndpoint(generateOTP({ uuid: `${uuid}` }));
        console.log(otp);
        setError({
          state: false,
          message: "",
        });
      } catch (error: any) {
        console.log(error)
        setError({
          state: true,
          message: error.response.data.msg,
        });
      }
    })();
  }, []);

  console.log(errors)
  return (
    <main className="Verify">
      {loading ? (
        <div>loading...</div>
      ) : errors.state ? (
        <VerifyError
          error={errors.message !== "Your account has already been verified"}
          message={errors.message}
        />
      ) : (
        <SentOTP uuid={uuid}/>
      )}
    </main>
  );
};

export default Verify;
