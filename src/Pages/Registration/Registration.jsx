import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import signUpImage from "../../Assets/sign-up.svg";
import { Button, Input } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Utility/ImageUpload/ImageUpload";
import useAxios from "../../Hooks/useAxios";
import "./Registration.css";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  let { createUser, update, logOut, user } = useAuth();
  let navigate = useNavigate();
  let axios = useAxios();

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const [preventRouting, setPreventRouting] = useState(false);
  const [openLoadingOverlay, setOpenLoadingOverlay] = useState(false);

  const handleRegister = async (e) => {
    setPreventRouting(true);
    setLoading(true);
    setOpenLoadingOverlay(true);
    e.preventDefault();

    let form = e.target;
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    let image = form.image.files[0];

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?/~`])(.{6,})$/;
    const validPassword = passRegex.test(password);
    const validGmail = gmailRegex.test(email);

    if (!validGmail) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Enter a valid gmail address",
      });
      setLoading(false);
      setOpenLoadingOverlay(false);
      return;
    }
    if (!validPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Password must be at least 6 characters long, containing at least one upper case and special character",
      });
      setLoading(false);
      setOpenLoadingOverlay(false);
      return;
    }

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(
        image,
        setLoading,
        setOpenLoadingOverlay
      );
      imgData = imageData;
    }

    createUser(email, password)
      .then(() => {
        update(name, imgData?.data?.display_url)
          .then(() => {
            logOut()
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .post(`/send/verificationCode`, { email: email, name: name })
          .then(() => {
            form.reset();
            setLoading(false);
            setOpenLoadingOverlay(false);
            Swal.fire({
              text: "Your account has been created. Please check your gmail inbox and verify your gmail.",
              icon: "success",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          text: "The gmail you entered is already in use!!",
          icon: "warning",
        });
        setLoading(false);
        setOpenLoadingOverlay(false);
      });
  };

  useEffect(() => {
    if (user && preventRouting === false) {
      navigate("/");
    }
  }, [user, navigate, preventRouting]);

  return (
    <div>
      <div>
        <div className="bg-[#0A2540]">
          <div className="py-20">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
              <div className="hidden bg-gray-200 lg:flex lg:w-1/2">
                <img src={signUpImage} alt="" />
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
                  Sign Up to join DineDash Family
                </p>

                <form onSubmit={handleRegister} id="regForm">
                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter your Name"
                      name="name"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter your email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <Input
                      color="blue"
                      label="Enter a password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <div>
                      <label className="flex gap-4 p-2 cursor-pointer border-2 border-gray-400 rounded-lg shadow-xl justify-center items-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="text-base line-clamp-1 font-medium">
                          {selectedFile
                            ? selectedFile.name
                            : "Select profile picture"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          id="image"
                          name="image"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button
                      type="submit"
                      className="w-full my-4 bg-[#0866ff]"
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Signing Up
                        </div>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="flex items-center justify-center text-center pb-2">
                  <span className="text-sm text-gray-900 dark:text-gray-200">
                    Already have an account?
                  </span>

                  <Link
                    to="/sign-in"
                    className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>

            {/* Overlay to display in loading state */}
            <div
              className={`${openLoadingOverlay === true ? "block" : "hidden"} `}
            >
              <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white border py-5 px-5 rounded-lg flex items-center flex-col">
                  <div className="loader-dots block relative w-20 h-5 mt-2">
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-700 text-lg font-medium mt-5 text-center">
                    Registration may take 6-10 seconds. <br /> Please hold on.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
