import { MdOutlineMail } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { FaEdit, FaPhone } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { FaAddressCard } from "react-icons/fa";
import { imageUpload } from "../../../Utility/ImageUpload/ImageUpload";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";
import toast from "react-hot-toast";

const MyProfile = () => {
  let { user, update } = useAuth();
  let axios = useAxios();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [yourName, setYourName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleProfilePictureChange = async (e) => {
    setLoading(true);
    e.preventDefault();
    let form = e.target;
    let image = form.image.files[0];

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(image, setLoading, setOpen1);
      imgData = imageData;
    }

    update(user?.displayName, imgData?.data?.display_url)
      .then(() => {
        setLoading(false);
        setOpen1(!open1);
        toast.success(`Profile picture has been changed!`, {
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
        console.log(error);
      });
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpen1 = () => {
    setOpen1(!open1);
  };
  const handleOpen2 = (address) => {
    setOpen2(!open2);
    setCurrentAddress(address || "");
  };
  const handleOpen3 = (phone) => {
    setOpen3(!open3);
    setPhoneNumber(phone || "");
  };

  const handleChangeName = (e) => {
    e.preventDefault();
    setLoading(true);
    update(yourName)
      .then(() => {
        setLoading(false);
        setOpen(!open);
        toast.success(`Name has been changed!`, {
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
        console.log(error);
      });
  };

  let { data, isLoading, refetch } = useQuery({
    queryKey: ["myDeliveryAddress"],
    queryFn: async () => {
      let res = await axios.get(`/my-address?email=${user?.email}`).then();
      return res.data;
    },
    enabled: true,
  });

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  const handleChangeAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/update-address", {
        address: currentAddress,
        email: user?.email,
      })
      .then(() => {
        refetch();
        setLoading(false);
        setOpen2(!open2);
        toast.success(`Address has been changed!`, {
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
      });
  };

  const handleChangePhoneNumber = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/update-phone", {
        phone: phoneNumber,
        email: user?.email,
      })
      .then(() => {
        refetch();
        setLoading(false);
        setOpen3(!open3);
        toast.success(`Phone number has been changed!`, {
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
      });
  };

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div className="bg-[#CDF5FD]">
      <div className=" py-12">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <div className="flex justify-center mb-2">
                <img
                  className="h-32 w-32 rounded-full border-4 border-gray-400 dark:border-gray-800"
                  src={user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png"}
                  alt=""
                />

                <div className="">
                  {" "}
                  <FaEdit
                    fontSize={"25"}
                    className="cursor-pointer"
                    onClick={handleOpen1}
                  />{" "}
                </div>

                {/* Profile pic change modal */}
                <Dialog
                  size="xs"
                  open={open1}
                  handler={handleOpen1}
                  className="bg-transparent shadow-none"
                >
                  <form onSubmit={handleProfilePictureChange}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h5" color="blue-gray">
                          Change your profile picture
                        </Typography>

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
                              <span className="text-base font-medium  line-clamp-1">
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
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          variant="gradient"
                          disabled={loading ? true : false}
                          fullWidth
                          type="submit"
                        >
                          {loading ? (
                            <div className="flex justify-center items-center gap-4">
                              <ImSpinner9 className="animate-spin text-[20px]" />
                              Changing Name
                            </div>
                          ) : (
                            "Change"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Dialog>
              </div>
              <div className="py-2 flex flex-col gap-2">
                <div className="flex justify-center items-center gap-4">
                  <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                    {user?.displayName}
                  </h3>
                  <FaEdit
                    fontSize={"20"}
                    className="cursor-pointer"
                    onClick={handleOpen}
                  />{" "}
                </div>

                {/* Name update modal */}
                <Dialog
                  size="xs"
                  open={open}
                  handler={handleOpen}
                  className="bg-transparent shadow-none"
                >
                  <form onSubmit={handleChangeName}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                          Change your name
                        </Typography>

                        <Input
                          label="Name"
                          size="lg"
                          value={yourName}
                          onChange={(e) => setYourName(e.target.value)}
                        />
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          variant="gradient"
                          disabled={loading || !yourName ? true : false}
                          fullWidth
                          type="submit"
                        >
                          {loading ? (
                            <div className="flex justify-center items-center gap-4">
                              <ImSpinner9 className="animate-spin text-[20px]" />
                              Changing Name
                            </div>
                          ) : (
                            "Change"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Dialog>

                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex justify-center gap-3 text-gray-700 dark:text-gray-300 items-center">
                    <MdOutlineMail fontSize={"20"} />
                    {user?.email}
                  </div>

                  <div className="flex justify-center gap-3 text-gray-700 dark:text-gray-300 items-center">
                    <FaAddressCard fontSize={"20"} />
                    <span>
                      {data?.address
                        ? data?.address
                        : "Enter your delivery address"}
                    </span>
                    <FaEdit
                      fontSize={"20"}
                      className="cursor-pointer text-black"
                      onClick={() => handleOpen2(data?.address)}
                    />
                  </div>

                  <div className="flex justify-center gap-3 text-gray-700 dark:text-gray-300 items-center">
                    <FaPhone fontSize={"20"} />
                    <span>
                      {data?.phone ? data?.phone : "Enter your phone number"}
                    </span>
                    <FaEdit
                      fontSize={"20"}
                      className="cursor-pointer text-black"
                      onClick={() => handleOpen3(data?.phone)}
                    />
                  </div>

                  {/* Address update modal */}
                  <Dialog
                    size="xs"
                    open={open2}
                    handler={handleOpen2}
                    className="bg-transparent shadow-none"
                  >
                    <form onSubmit={handleChangeAddress}>
                      <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                          <Typography variant="h5" color="blue-gray">
                            Update your delivery address
                          </Typography>

                          <Input
                            label="Address"
                            size="lg"
                            value={currentAddress}
                            onChange={(e) => setCurrentAddress(e.target.value)}
                          />
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Button
                            variant="gradient"
                            disabled={loading || !currentAddress ? true : false}
                            fullWidth
                            type="submit"
                          >
                            {loading ? (
                              <div className="flex justify-center items-center gap-4">
                                <ImSpinner9 className="animate-spin text-[20px]" />
                                Updating
                              </div>
                            ) : (
                              "Update Address"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </form>
                  </Dialog>

                  {/* Phone number update modal */}
                  <Dialog
                    size="xs"
                    open={open3}
                    handler={handleOpen3}
                    className="bg-transparent shadow-none"
                  >
                    <form onSubmit={handleChangePhoneNumber}>
                      <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                          <Typography variant="h5" color="blue-gray">
                            Update your phone number
                          </Typography>

                          <Input
                            label="Phone number"
                            type="number"
                            size="lg"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Button
                            variant="gradient"
                            disabled={
                              loading || !phoneNumber || phoneNumber.length < 11
                                ? true
                                : false
                            }
                            fullWidth
                            type="submit"
                          >
                            {loading ? (
                              <div className="flex justify-center items-center gap-4">
                                <ImSpinner9 className="animate-spin text-[20px]" />
                                Updating
                              </div>
                            ) : (
                              "Update Phone Number"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </form>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
