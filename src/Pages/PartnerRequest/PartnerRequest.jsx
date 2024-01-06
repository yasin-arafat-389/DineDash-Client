import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";
import { imageUpload } from "../../../Utility/ImageUpload/ImageUpload";

const PartnerRequest = () => {
  let axios = useAxios();
  let { user } = useAuth();
  let [loading, setLoading] = useState(false);

  let {
    data: partnerRequestStatus = false,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getPartnerRequestStatus"],
    queryFn: async () => {
      let res = await axios.get(`/partner-request?email=${user?.email}`).then();
      return res.data;
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let email = user?.email;
    let number = form.number.value;
    let restaurantName = form.restaurantName.value;
    let income = form.income.value;
    let image = form.image.files[0];

    if (number.length < 11) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Phone number must be at least 11 characters long",
      });
      setLoading(false);
      return;
    }
    if (!restaurantName) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Restaurant Name is required",
      });
      setLoading(false);
      return;
    }
    if (!income) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Estimated monthly income is required",
      });
      setLoading(false);
      return;
    }

    if (partnerRequestStatus.status === "pending") {
      Swal.fire({
        icon: "warning",
        text: "You have already made a request. Please wait for admin approval. You will get an email soon with further instruction.",
      });
      setLoading(false);
      return;
    }

    if (partnerRequestStatus.status === "accepted") {
      Swal.fire({
        icon: "success",
        text: "You are already a partner",
      });
      setLoading(false);
      return;
    }

    if (partnerRequestStatus.status === "rejected") {
      Swal.fire({
        icon: "warning",
        text: "Sorry!! Admin rejected your partner request.",
      });
      setLoading(false);
      return;
    }
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        text: "You must select your restaurant logo",
      });
      setLoading(false);
      return;
    }

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(image, setLoading);
      imgData = imageData;
    }

    let info = {
      email,
      number,
      restaurantName,
      income,
      thumbnail: imgData?.data?.display_url,
      status: "pending",
    };

    axios.post("/partner-request", info).then(() => {
      setLoading(false);
      form.reset();
      Swal.fire({
        title: "Partner request has been sent",
        text: "Admin will review your request and get back to you soon. Expect an email with instruction within 24 hours.",
        icon: "success",
      });
      refetch();
    });
  };

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div>
      <div className="min-h-screen bg-[#C3E2C2] py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-400 rounded-full flex flex-shrink-0 justify-center items-center  text-2xl font-mono">
                  <FaInfo className="text-teal-600" />
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">
                    Register to become a partner.
                  </h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Fill up the following form carefully.
                  </p>
                </div>
              </div>

              {/* Registration form */}
              <form onSubmit={handleRegister}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Input
                      size="md"
                      label="Email"
                      name="email"
                      value={user?.email}
                      disabled
                      className="cursor-not-allowed"
                    />

                    <Input
                      size="md"
                      type="number"
                      label="Phone Number"
                      name="number"
                    />

                    <Input
                      size="md"
                      label="Your Restaurant Name"
                      name="restaurantName"
                    />

                    <Input
                      size="md"
                      type="number"
                      label="Estimated monthly income"
                      icon={<h1>৳</h1>}
                      name="income"
                    />

                    <div className="w-full">
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
                              : "Select Your Restaurant Logo"}
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
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading ? true : false}
                    className="capitalize bg-yellow-500 text-[18px] text-teal-600 flex justify-center items-center"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-4">
                        <ImSpinner9 className="animate-spin text-[20px]" />
                        Registering
                      </div>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRequest;
