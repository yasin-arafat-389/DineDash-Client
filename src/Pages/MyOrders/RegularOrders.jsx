import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { MdOutlineCallReceived } from "react-icons/md";
import NoOrders from "./NoOrders";
import { GridLoader } from "react-spinners";
import { PiCookingPotFill } from "react-icons/pi";
import { MdDeliveryDining } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Button, Dialog, Textarea } from "@material-tailwind/react";
import { MdReviews } from "react-icons/md";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";

const RegularOrders = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      let res = await axios.get(`/my-orders?email=${user?.email}`).then();
      return res.data;
    },
  });

  let cartFood = [];
  myOrders.forEach((item) => {
    cartFood.push(...item.cartFood);
  });

  // Handling submit review
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [foodDetails, setFoodDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenReviewModal = (foodDetails) => {
    setOpenReviewModal(!openReviewModal);
    setFoodDetails(foodDetails);
  };

  const [review, setReview] = useState("");
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  function getCurrentDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const formattedDate = `${day} ${months[monthIndex]}, ${year}`;

    return formattedDate;
  }

  const handleSubmitPost = () => {
    setLoading(true);
    let payload = {
      identifier: foodDetails?.identifier,
      orderId: foodDetails?.orderId,
      review: review,
      user: user?.displayName,
      profileImage: user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png",
      date: getCurrentDate(),
    };

    axios.post(`/submit/review`, payload).then(() => {
      setLoading(false);
      refetch();
      setOpenReviewModal(!openReviewModal);
      toast.success(`Your review has been posted!`, {
        duration: 3000,
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
    return (
      <div className="flex justify-center items-center my-[100px]">
        <GridLoader color="#36d7b7" size={40} />
      </div>
    );
  }

  return (
    <div>
      {cartFood?.length === 0 ? (
        <NoOrders
          title="You have no  orders yet!!"
          buttonText="Browse Foods"
          route="/browse-foods"
        />
      ) : (
        cartFood?.map((item, index) => (
          <div
            className="order-details bg-white w-[90%] shadow-lg rounded-lg mx-auto mt-5"
            key={index}
          >
            <div className="details-header rounded-lg bg-white p-4">
              <h1>
                <span className="text-lg">Order</span>{" "}
                <span className="text-blue-600">#{item.orderId}</span>
              </h1>
              <p className="text-gray-600 text-sm">placed on {item.date}</p>
            </div>

            <div className="separator h-[2px] bg-gray-300 "></div>

            <div className="details mt-3 p-4 flex flex-col md:flex-col lg:flex-row justify-between">
              <div className="imgAndTitle flex gap-5 items-center">
                <img
                  src={item.image}
                  className="w-[150px] h-[100px] rounded-md object-cover"
                />
                <h1 className="title text-lg">{item.name}</h1>
              </div>

              <div>
                <h1 className="flex flex-col gap-3 justify-center items-center">
                  <span className="text-[16px] text-blue-400 font-bold">
                    Quantity
                  </span>
                  <span>{item.quantity}</span>
                </h1>
              </div>

              <div>
                <h1 className="flex flex-col gap-3 justify-center items-center">
                  <span className="text-[16px] text-blue-400 font-bold">
                    Price
                  </span>
                  <span>৳ {item.totalPrice}.00</span>
                </h1>
              </div>

              <div>
                <h1 className="flex flex-col gap-3 justify-center items-center">
                  <span className="text-[16px] text-blue-400 font-bold">
                    Restaurant
                  </span>
                  <span>{item.restaurant}</span>
                </h1>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <span className="text-[16px] text-blue-400 font-bold">
                  Status
                </span>
                <div
                  className={`custom-chip text-base font-bold p-2 rounded-lg capitalize flex justify-center items-center gap-2 ${
                    item.status === "order received" &&
                    "bg-brown-500 text-white"
                  } ${
                    item.status === "cooking" && "bg-indigo-500 text-white"
                  } ${
                    item.status === "out for delivery" &&
                    "bg-teal-500 text-white"
                  } ${
                    item.status === "completed" && "bg-green-500 text-white"
                  } ${item.status === "cancelled" && "bg-red-500 text-white"}`}
                >
                  {item.status === "order received" && (
                    <MdOutlineCallReceived size={"20"} />
                  )}
                  {item.status === "cooking" && (
                    <PiCookingPotFill size={"30"} />
                  )}
                  {item.status === "out for delivery" && (
                    <MdDeliveryDining size={"30"} />
                  )}
                  {item.status === "completed" && <FaCheckCircle size={"20"} />}
                  {item.status === "cancelled" && <MdCancel size={"20"} />}
                  <span>{item.status}</span>
                </div>
              </div>

              {item.status === "completed" && item.reviewed === false && (
                <div className={`flex justify-center items-center`}>
                  <Button
                    onClick={() => handleOpenReviewModal(item)}
                    size="sm"
                    className="capitalize bg-blue-500 flex gap-3 text-lg justify-center items-center"
                  >
                    <MdReviews size={"25"} />
                    Leave A Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))
      )}

      <Dialog open={openReviewModal} handler={handleOpenReviewModal}>
        <div className="p-5">
          <div className="mb-6">
            <h1 className="text-xl text-gray-700">
              Please leave a review for{" "}
              <span className="text-blue-600 font-bold">
                {foodDetails.name}
              </span>
            </h1>
          </div>

          <Textarea
            label="Your Review"
            value={review}
            onChange={handleReviewChange}
          />

          <div className=" flex gap-4 mt-4">
            <Button
              className="bg-green-500"
              onClick={handleSubmitPost}
              disabled={!review || loading ? true : false}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-4">
                  <ImSpinner9 className="animate-spin text-[20px]" />
                  Posting
                </div>
              ) : (
                "Post Review"
              )}
            </Button>

            <Button
              className="bg-red-500"
              onClick={() => setOpenReviewModal(!openReviewModal)}
              disabled={loading ? true : false}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RegularOrders;
