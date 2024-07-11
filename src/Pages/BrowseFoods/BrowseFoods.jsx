import { Button, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import "./BrowseFoods.css";
import { IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import NoDataFound from "../../../Utility/NoDataFound/NoDataFound";
import BrowseByFoodsSkeletonLoader from "../../../Utility/BrowseByFoodsSkeletonLoader/BrowseByFoodsSkeletonLoader";
import { BiSolidOffer } from "react-icons/bi";

const BrowseFoods = () => {
  let axios = useAxios();
  let navigate = useNavigate();

  // States
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [noSearchResult, setNoSearchResult] = useState(false);

  let { data, isLoading } = useQuery({
    queryKey: ["allFoods", page],
    queryFn: async () => {
      let res = await axios.get(`/foods/pagination?page=${page}`).then();
      return res.data;
    },
  });

  let { data: filtered, isLoading: isFilteredLoading } = useQuery({
    queryKey: ["selectedFood", selectedCategory],
    queryFn: async () => {
      let res = await axios
        .get(`/foods/category?category=${selectedCategory}`)
        .then();
      return res.data;
    },
  });

  let handleSearchFood = async (e) => {
    window.scrollTo(0, 200);
    setSearchLoading(true);
    e.preventDefault();
    if (searchInput === "") {
      setSearchLoading(false);
      return Swal.fire("Search input can't be empty!");
    }

    await axios.get(`/foods/search?search=${searchInput}`).then((res) => {
      setSearchResult(res.data.result);

      if (res.data.noResultFound) {
        setNoSearchResult(true);
      } else {
        setNoSearchResult(false);
      }

      setSearchLoading(false);
    });
  };

  let { data: myOffers = [], isLoading: isMyOffersLoading } = useQuery({
    queryKey: ["allOffers"],
    queryFn: async () => {
      let res = await axios.get(`/get-coupons?allCoupons="allCoupons"`).then();
      return res.data;
    },
  });

  if (isLoading || isFilteredLoading || searchLoading || isMyOffersLoading) {
    return <BrowseByFoodsSkeletonLoader />;
  }

  if (!data?.foodCounts) return;

  const totalPages = Math.ceil(data?.foodCounts / 6);
  const pages = [...new Array(totalPages).fill(0)];

  const handlePagination = (page) => {
    setPage(page);
    window.scrollTo(0, 200);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 200);
  };

  const handleRedirectToDetailsPage = (item) => {
    navigate(`/food-details/${item._id}`);
  };

  return (
    <>
      <div>
        <div
          className="h-[100px] md:h-[200px] lg:h-[200px] flex justify-center items-center text-[30px] md:text-[50px] lg:text-[50px] restaurantTitle"
          style={{
            backgroundImage: `url("https://i.ibb.co/YNFfVNq/res-bg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          Browse Foods
        </div>

        <div className="bg-[#eff6f3]">
          <div className="flex flex-col w-[90%] mx-auto py-10 md:py-20 lg:py-20 gap-3">
            <div
              className={`${
                selectedCategory || searchResult.length > 0 ? "block" : "hidden"
              } flex justify-center items-center mb-5`}
            >
              <Button
                onClick={() => window.location.reload()}
                className="capitalize text-lg"
                color="blue"
              >
                Browse All Food
              </Button>
            </div>
            {/* Filters */}
            <div className="foodItems w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-10">
              {/* filter by category */}
              <select
                disabled={
                  searchResult.length > 0 || noSearchResult ? true : false
                }
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  window.scrollTo(0, 200);
                }}
              >
                <option disabled value="">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Browse by category"}
                </option>
                <option value="Chicken">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Chicken"}
                </option>
                <option value="Side">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Side"}
                </option>
                <option value="Burger">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Burger"}
                </option>
                <option value="Vegetarian">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Vegetarian"}
                </option>
                <option value="Pizza">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Pizza"}
                </option>
                <option value="Pasta">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Pasta"}
                </option>
                <option value="Appetizer">
                  {searchResult.length > 0 || noSearchResult
                    ? "Disabled while searching"
                    : "Appetizer"}
                </option>
              </select>

              {/* Search bar */}
              <div className="flex gap-4">
                <form className="w-full" onSubmit={handleSearchFood}>
                  <Input
                    color="black"
                    placeholder="Search Food"
                    className="!border-black !border-2 !text-[#000] !font-bold placeholder:text-gray-600 placeholder:font-bold"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    icon={
                      <button>
                        <IoSearch className="text-[20px] text-[#000]" />
                      </button>
                    }
                  />
                </form>
              </div>
            </div>

            <div className="foodItems w-full mt-10">
              {/* All Foods with pagination */}
              <div
                className={`resCards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 pb-16 ${
                  selectedCategory || searchResult.length > 0 || noSearchResult
                    ? "hidden"
                    : ""
                }`}
              >
                {data?.result?.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleRedirectToDetailsPage(item)}
                      className="bg-white flex gap-5 items-center w-full h-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="foodContent w-2/3 flex flex-col gap-2">
                        <h1 className="FoodTitle elipseTitle text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                          {item?.name}
                        </h1>
                        <p className="elipseDesc text-[#767676] text-[12px] md:text-[15px] lg:text-[15px]">
                          {item?.description}
                        </p>

                        <p className="text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                          ৳ {item?.price}
                        </p>

                        <div>
                          {myOffers
                            .filter(
                              (food) => food.selectedFood._id === item._id
                            )
                            .map((matchedFood, index) => (
                              <div
                                key={index}
                                className="flex justify-center items-center gap-2 mt-2 bg-[#219C90] text-white py-1 rounded-lg font-bold"
                              >
                                <BiSolidOffer fontSize={"22"} />
                                <p>
                                  Get {matchedFood.discountAmount} taka
                                  discount.
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="foodImage-rc w-1/3">
                        <img
                          src={item?.image}
                          className="rounded-xl h-[120px] w-full"
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Browse by category */}
              <div
                className={`resCards ${
                  selectedCategory === "" ||
                  searchResult.length > 0 ||
                  noSearchResult
                    ? "hidden"
                    : "grid"
                } grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 pb-16`}
              >
                {filtered?.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleRedirectToDetailsPage(item)}
                      className="bg-white flex gap-5 items-center w-full h-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="foodContent w-2/3 flex flex-col gap-2">
                        <h1 className="FoodTitle elipseTitle text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                          {item?.name}
                        </h1>
                        <p className="elipseDesc text-[#767676] text-[12px] md:text-[15px] lg:text-[15px]">
                          {item?.description}
                        </p>

                        <p className="text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                          ৳ {item?.price}
                        </p>

                        <div>
                          {myOffers
                            .filter(
                              (food) => food.selectedFood._id === item._id
                            )
                            .map((matchedFood, index) => (
                              <div
                                key={index}
                                className="flex justify-center items-center gap-2 mt-2 bg-[#219C90] text-white py-1 rounded-lg font-bold"
                              >
                                <BiSolidOffer fontSize={"22"} />
                                <p>
                                  Get {matchedFood.discountAmount} taka
                                  discount.
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="foodImage-rc w-1/3">
                        <img
                          src={item?.image}
                          className="rounded-xl h-[120px] w-full"
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Search Result*/}
              <div
                className={`resCards ${
                  searchResult.length > 0 || noSearchResult ? "grid" : "hidden"
                } ${
                  noSearchResult
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10"
                }  pb-16`}
              >
                {noSearchResult ? (
                  <NoDataFound searchInput={searchInput} />
                ) : (
                  searchResult?.map((item, index) => (
                    <div key={index}>
                      <button
                        onClick={() => handleRedirectToDetailsPage(item)}
                        className="bg-white flex gap-5 items-center w-full h-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div className="foodContent w-2/3 flex flex-col gap-2">
                          <h1 className="FoodTitle elipseTitle text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                            {item.name.split(" ").map((word, i) => {
                              const searchQueryIndex = word
                                .toLowerCase()
                                .indexOf(searchInput.toLowerCase());
                              if (searchQueryIndex !== -1) {
                                const before = word.substring(
                                  0,
                                  searchQueryIndex
                                );
                                const match = word.substring(
                                  searchQueryIndex,
                                  searchQueryIndex + searchInput.length
                                );
                                const after = word.substring(
                                  searchQueryIndex + searchInput.length
                                );
                                return (
                                  <span key={i}>
                                    {before}
                                    <span className="bg-yellow-400">
                                      {match}
                                    </span>
                                    {after}{" "}
                                  </span>
                                );
                              }
                              return <span key={i}>{word} </span>;
                            })}
                          </h1>
                          <p className="elipseDesc text-[#767676] text-[12px] md:text-[15px] lg:text-[15px]">
                            {item?.description}
                          </p>

                          <p className="text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                            ৳ {item?.price}
                          </p>

                          <div>
                            {myOffers
                              .filter(
                                (food) => food.selectedFood._id === item._id
                              )
                              .map((matchedFood, index) => (
                                <div
                                  key={index}
                                  className="flex justify-center items-center gap-2 mt-2 bg-[#219C90] text-white py-1 rounded-lg font-bold"
                                >
                                  <BiSolidOffer fontSize={"22"} />
                                  <p>
                                    Get {matchedFood.discountAmount} taka
                                    discount.
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="foodImage-rc w-1/3">
                          <img
                            src={item?.image}
                            className="rounded-xl h-[120px] w-full"
                          />
                        </div>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div
                className={`${
                  selectedCategory !== "" ||
                  searchResult.length > 0 ||
                  noSearchResult
                    ? "hidden"
                    : "flex"
                } items-center justify-center gap-3 w-[80%] mx-auto`}
              >
                <Button
                  variant="text"
                  className="hidden md:flex lg:flex items-center gap-2"
                  onClick={() => handlePageChange(Math.max(page - 1, 0))}
                  disabled={page === 0}
                >
                  <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
                  Previous
                </Button>

                <Button
                  size="sm"
                  onClick={() => handlePageChange(Math.max(page - 1, 0))}
                  disabled={page === 0}
                  className="flex md:hidden lg:hidden capitalize bg-blue-600"
                >
                  Previous
                </Button>
                {pages.map((item, index) => (
                  <button
                    key={index}
                    className={` px-3 py-1 font-bold text-[12px] md:text-[18px] lg:text-[18px] hover:bg-[#2121211a] rounded-lg ${
                      page === index
                        ? "bg-black text-white rounded-lg hover:bg-black"
                        : "bg-transparent"
                    }`}
                    onClick={() => handlePagination(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <Button
                  variant="text"
                  className="hidden md:flex lg:flex items-center gap-2"
                  onClick={() =>
                    handlePageChange(Math.min(page + 1, totalPages - 1))
                  }
                  disabled={page === totalPages - 1}
                >
                  Next
                  <FaArrowRight strokeWidth={2} className="h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  onClick={() =>
                    handlePageChange(Math.min(page + 1, totalPages - 1))
                  }
                  disabled={page === totalPages - 1}
                  className="flex md:hidden lg:hidden capitalize bg-blue-600"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseFoods;
