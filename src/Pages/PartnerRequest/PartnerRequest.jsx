import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";

const PartnerRequest = () => {
  let axios = useAxios();
  let { user } = useAuth();
  let [loading, setLoading] = useState(false);

  let { data: partnerRequestStatus = false, isLoading } = useQuery({
    queryKey: ["getPartnerRequestStatus"],
    queryFn: async () => {
      let res = await axios.get(`/partner-request?email=${user?.email}`).then();
      return res.data;
    },
  });

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let email = user?.email;
    let number = form.number.value;
    let restaurantName = form.restaurantName.value;
    let income = form.income.value;
    let customBurger = form.customBurger.value;

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
    if (!customBurger) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You must select if you want to provide custom made burger service or not.",
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

    let info = {
      email,
      number,
      restaurantName,
      income,
      customBurger: customBurger,
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
    });
  };

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div className="bg-[#92C7CF]">
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
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

                    <div>
                      <h1 className="text-gray-700">
                        Do you want to provide custom made burger service?
                      </h1>

                      <p className="text-sm ">
                        Visit{" "}
                        <Link
                          to="https://dine-dash-client.web.app/burger-builder"
                          target="_blank"
                        >
                          {" "}
                          <span className="text-blue-500 hover:underline">
                            Burger Builder
                          </span>{" "}
                        </Link>
                        for reference.
                      </p>
                    </div>
                    <Card className="w-full shadow-lg">
                      <List className="flex-row">
                        <ListItem className="p-0">
                          <label
                            htmlFor="horizontal-list-yes"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                          >
                            <ListItemPrefix className="mr-3">
                              <Radio
                                name="customBurger"
                                value="yes"
                                id="horizontal-list-yes"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                  className: "p-0",
                                }}
                              />
                            </ListItemPrefix>
                            <Typography
                              color="blue-gray"
                              className="font-medium text-blue-gray-400"
                            >
                              Yes
                            </Typography>
                          </label>
                        </ListItem>
                        <ListItem className="p-0">
                          <label
                            htmlFor="horizontal-list-no"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                          >
                            <ListItemPrefix className="mr-3">
                              <Radio
                                name="customBurger"
                                value="no"
                                id="horizontal-list-no"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                  className: "p-0",
                                }}
                              />
                            </ListItemPrefix>
                            <Typography
                              color="blue-gray"
                              className="font-medium text-blue-gray-400"
                            >
                              No
                            </Typography>
                          </label>
                        </ListItem>
                      </List>
                    </Card>
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
