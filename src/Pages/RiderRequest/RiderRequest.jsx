import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { ImSpinner9 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";

const RiderRequest = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let [loading, setLoading] = useState(false);

  let {
    data: riderRequestStatus = false,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getRiderRequestStatus"],
    queryFn: async () => {
      let res = await axios.get(`/rider-request?email=${user?.email}`).then();
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    email: user?.email,
    name: "",
    phone: "",
    region: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.phone || !formData.region) {
      Swal.fire({
        text: "All Fields are required",
        icon: "warning",
      });
      setLoading(false);
      return;
    }

    if (e.target.checkbox.checked === false) {
      Swal.fire({
        text: "You must agree to the own ride policy.",
        icon: "warning",
      });
      setLoading(false);
      return;
    }

    if (riderRequestStatus.status === "pending") {
      Swal.fire({
        icon: "warning",
        text: "You have already made a request. Please wait for admin approval. You will get an email soon with further instruction.",
      });
      setLoading(false);
      return;
    }

    if (riderRequestStatus.status === "accepted") {
      Swal.fire({
        icon: "success",
        text: "You are already a rider",
      });
      setLoading(false);
      return;
    }

    if (riderRequestStatus.status === "rejected") {
      Swal.fire({
        icon: "warning",
        text: "Sorry!! Admin rejected your rider request.",
      });
      setLoading(false);
      return;
    }

    await axios.post("/rider-request", formData).then(() => {
      setFormData({
        email: user?.email,
        name: "",
        phone: "",
        region: "",
        status: "pending",
      });
      refetch();
      Swal.fire({
        title: "Rider request has been sent",
        text: "Admin will review your request and get back to you soon. Expect an email with instruction within 24 hours.",
        icon: "success",
      });
      setLoading(false);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div>
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
                      Register to become a rider.
                    </h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">
                      Fill up the following form carefully.
                    </p>
                  </div>
                </div>

                {/* Registration form */}
                <form onSubmit={handleSubmit}>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <Input
                        size="md"
                        label="Email"
                        value={formData.email}
                        disabled
                        className="cursor-not-allowed"
                      />

                      <Input
                        size="md"
                        type="text"
                        label="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />

                      <Input
                        size="md"
                        type="number"
                        label="Your Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />

                      <select
                        name="region"
                        className="w-full border-1 text-gray-700 border-gray-300"
                        value={formData.region}
                        onChange={handleInputChange}
                      >
                        <option value="" selected disabled hidden>
                          Select Region
                        </option>
                        <option value="Mirpur">Mirpur</option>
                        <option value="Dhanmondi">Dhanmondi</option>
                        <option value="Uttara">Uttara</option>
                      </select>

                      <div className="flex gap-2 items-center text-sm">
                        <FaInfoCircle className="text-blue-400" />
                        Region is the area where you will be responsible to
                        deliver food.
                      </div>

                      <Checkbox
                        name="checkbox"
                        label={
                          <Typography
                            color="blue-gray"
                            className="flex font-medium"
                          >
                            I have my own ride to deliver food &nbsp;
                            <span className="italic">(Bike or Cycle)</span>
                          </Typography>
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading ? true : false}
                      className="capitalize bg-yellow-500 text-[18px] text-teal-600 flex justify-center items-center"
                    >
                      {loading ? (
                        <div className="flex justify-center items-center gap-4">
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
    </div>
  );
};

export default RiderRequest;
