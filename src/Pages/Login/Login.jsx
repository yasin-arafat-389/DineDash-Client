import { Button, Input, Spinner } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import LoginPageAnimation from "../../Assets/loginPageAnimation.json";
import Lottie from "lottie-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  let { login, googleLogin } = useAuth();

  let navigate = useNavigate();
  let location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  let handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    login(formData.email, formData.password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success(`Successfully Logged In!`, {
          style: {
            border: "2px solid green",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error(`Invalid email or password!!`, {
            style: {
              border: "2px solid red",
              padding: "8px",
              color: "#713200",
            },
            iconTheme: {
              primary: "red",
              secondary: "#FFFAEE",
            },
          });
        }
      });
  };

  let handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success(`Successfully Logged In!`, {
          style: {
            border: "2px solid green",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch(() => {
        toast.error(`Invalid email or password!!`, {
          style: {
            border: "2px solid red",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "red",
            secondary: "#FFFAEE",
          },
        });
      });
  };

  return (
    <div>
      <div className="bg-[#0A2540]">
        <div className="py-10">
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-gray-200 lg:flex lg:w-1/2">
              <Lottie animationData={LoginPageAnimation} loop={true} />
            </div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-[30%]"
                  src="https://i.ibb.co/kBDBhVs/dinedash.png"
                  alt=""
                />
              </div>

              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Sign In to your account
              </p>

              <Button
                onClick={handleGoogleLogin}
                size="lg"
                fullWidth
                variant="outlined"
                color="blue-gray"
                className="flex items-center justify-center gap-3 mx-auto mt-4"
              >
                <FcGoogle fontSize={"25px"} />
                Sign In with Google
              </Button>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <div className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
                  or Sign In with email
                </div>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mt-4">
                  <Input
                    value={formData.email}
                    onChange={handleInputChange}
                    color="blue"
                    name="email"
                    label="Enter your email"
                    type="email"
                    required
                  />
                </div>
                <div className="mt-4">
                  <Input
                    value={formData.password}
                    onChange={handleInputChange}
                    color="blue"
                    name="password"
                    label="Enter password"
                    type="password"
                    required
                  />
                </div>

                <div className="mt-6">
                  <button
                    className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex justify-center`}
                    type="submit"
                  >
                    {loading ? (
                      <div className="flex items-center gap-5 ">
                        <Spinner color="red" /> Signing In
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-center text-center py-4">
                <span className="text-sm text-gray-900 dark:text-gray-200">
                  {`Don't`} have an account?
                </span>

                <Link
                  to="/sign-up"
                  className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
