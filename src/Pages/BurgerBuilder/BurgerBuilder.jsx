/* eslint-disable react/prop-types */
import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Cart from "../../Components/Cart/Cart";
import { FcInfo } from "react-icons/fc";
import "./BurgerBuilder.css";
import { MdDragHandle } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import TypeWriterEffect from "../../../Utility/TypeWriteEffect/TypeWriterEffect";
import toast from "react-hot-toast";

const BurgerBuilder = () => {
  //loading state handling
  let [loading, setLoading] = useState(false);
  let [providers, setProviders] = useState([]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  const handleSelectProvider = (index, data) => {
    setSelectedButtonIndex(index);
    setSelectedData(data);
  };

  let [ingredients, setIngredients] = useState([]);
  let [builder, setBuilder] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://dine-dash-server.vercel.app/providers")
      .then((res) => res.json())
      .then((data) => {
        setProviders(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedData) {
      setIngredients(selectedData.ing);
    }
  }, [selectedData]);

  let handleAddIngredients = (id) => {
    let selectedIngredient = ingredients.find((ing) => ing.id === id);
    const uniqueId = `${id}-${Date.now()}`;
    const newItem = { ...selectedIngredient, id: uniqueId };
    let newBuilder = [...builder, newItem];
    setBuilder(newBuilder);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(builder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBuilder(items);
  }

  const handleDeleteIngredient = (id, name) => {
    const updatedBuilder = builder.filter((item) => item.id !== id);
    console.log(id);
    Swal.fire({
      title: `Are you sure you want to remove ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBuilder(updatedBuilder);
        toast.success(`${name} has been removed!`, {
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
      }
    });
  };

  return (
    <div className="bg-[#e8e8e8]">
      <div className="w-[95%] main pt-10 pb-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mx-auto gap-6">
        {/* Ingredients block */}
        <div className="designerCard">
          <div className="">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-center gradient-text text-[30px] text-[#000]"
              >
                Select Provider
              </Typography>

              <Typography
                variant="small"
                color="gray"
                className="my-2 flex items-center gap-1 justify-center font-normal text-[14px]"
              >
                <FcInfo fontSize={"16"} />
                Select a provider you want to get your burger from.
              </Typography>
              <div
                className={` grid gap-5 grid-cols-3 mb-6 mt-4 justify-items-center`}
              >
                {loading ? (
                  <>
                    <div className="w-[70px] h-[70px] rounded-lg bg-[#e3e3e3] pulseForLoader"></div>
                    <div className="w-[70px] h-[70px] rounded-lg bg-[#e3e3e3] pulseForLoader"></div>
                    <div className="w-[70px] h-[70px] rounded-lg bg-[#e3e3e3] pulseForLoader"></div>
                  </>
                ) : (
                  <>
                    {providers.map((item, index) => (
                      <Button
                        key={index}
                        size="sm"
                        className={`bg-transparent border-2 border-blue-500 h-[70px] w-[70px] ${
                          selectedButtonIndex === index ? "disabled" : ""
                        }`}
                        style={{
                          backgroundImage: `url(${item.provider_thumb})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                        onClick={() => handleSelectProvider(index, item)}
                        disabled={
                          selectedButtonIndex !== null &&
                          selectedButtonIndex !== index
                        }
                      ></Button>
                    ))}
                  </>
                )}
              </div>

              {selectedData.length !== 0 && (
                <div className="mb-5 flex gap-2 items-center justify-center text-[20px]">
                  <h1>Available ingredients from</h1>
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black-100 bg-yellow-700 rounded">
                    {selectedData?.provider}
                  </span>
                </div>
              )}
              <Typography className="grid grid-cols-2 gap-7">
                {ingredients?.map((item, index) => (
                  <Button
                    onClick={() => handleAddIngredients(item.id)}
                    key={index}
                    variant="gradient"
                  >
                    {item.name}
                  </Button>
                ))}
              </Typography>
            </div>
          </div>
        </div>

        {/* Builder block */}
        <div className="designerCard">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center gradient-text text-[30px] text-[#000]"
          >
            Burger builder
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="my-2 flex items-center gap-1 justify-center font-normal text-[11px] md:text-[12px] lg:text-[12px]"
          >
            <FcInfo fontSize={"15"} />
            Reorder ingredients to your preference by dragging and dropping.
          </Typography>
          <div className="builder h-full flex my-10 justify-center">
            <div>
              <img
                className="w-[200px] mx-auto"
                src="https://i.ibb.co/HYR6fx4/top.jpg"
                alt=""
              />
              <div className="flex flex-col items-center">
                {builder.length === 0 ? (
                  <TypeWriterEffect
                    texts={[
                      "Add Ingredients",
                      "Add Patty",
                      "Add Tomato",
                      "Add Cheese",
                    ]}
                  />
                ) : (
                  <div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="drop">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {builder.map((item, index) => {
                              return (
                                <div key={index}>
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        className="flex gap-5 relative left-9"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <img
                                          className="w-[200px] my-1"
                                          src={item.image}
                                          alt={item.id}
                                        />
                                        <div className="flex items-center gap-4">
                                          <MdDragHandle fontSize={"20px"} />
                                          <AiOutlineCloseCircle
                                            onClick={() =>
                                              handleDeleteIngredient(
                                                item.id,
                                                item.name
                                              )
                                            }
                                            fontSize={"18px"}
                                            className="cursor-pointer"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                </div>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                )}
              </div>
              <img
                className="w-[200px] mx-auto"
                src="https://i.ibb.co/LQ6StVG/bottom.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Cart block */}
        <div className="designerCard">
          <div className="cart">
            <Cart ingredients={builder} provider={selectedData.provider} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;
