import Lottie from "lottie-react";
import { useNavigate, useParams } from "react-router-dom";
import successPageAnimation from "./SuccessAnimation.json";
import { Button } from "@material-tailwind/react";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const { verificationCode } = useParams();
  let axios = useAxios();
  let navigate = useNavigate();

  // Handling verifying gmail
  const [loading, setLoading] = useState(false);

  const handleVerifyGmail = () => {
    setLoading(true);

    axios
      .post(`/verify/gmail`, { verificationCode: verificationCode })
      .then((res) => {
        setLoading(false);

        if (res.data.success === true) {
          navigate("/sign-in");
          Swal.fire({
            text: "Email verification successfull. You can login now.",
            icon: "success",
          });
        }

        if (res.data.error === "email already verified") {
          Swal.fire({
            text: "You have already verified your gmail",
            icon: "success",
          });
        }

        if (res.data.error === "email not found") {
          Swal.fire({
            text: "Invalid verification link. please check your gmail inbox again.",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[20%] mx-auto">
          <Lottie animationData={successPageAnimation} />
        </div>

        <div className="text-center">
          <h3 className="md:text-3xl text-base text-gray-900 font-semibold text-center">
            Your Account Was Created Successfully!!
          </h3>
          <p className="text-gray-600 font-bold my-2">
            Please click the button below to verify your gmail.
          </p>
          <div className="pt-5 text-center">
            <Button
              onClick={handleVerifyGmail}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              disabled={loading ? true : false}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-4">
                  <ImSpinner9 className="animate-spin text-[20px]" />
                  Verifying
                </div>
              ) : (
                "Verify Gmail"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
