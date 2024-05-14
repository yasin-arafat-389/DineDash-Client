/* eslint-disable react/prop-types */
import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Cart from "../../Components/Cart/Cart";
import { FcInfo } from "react-icons/fc";
import "./BurgerBuilder.css";
import { MdDragHandle } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TypeWriterEffect from "../../../Utility/TypeWriteEffect/TypeWriterEffect";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const BurgerBuilder = () => {
  let axios = useAxios();

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  const handleSelectProvider = (index, data) => {
    setSelectedButtonIndex(index);
    setSelectedData(data);
  };

  let [ingredients, setIngredients] = useState([]);
  let [builder, setBuilder] = useState([]);

  let { data: providers, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      let res = await axios.get("/providers").then();
      return res.data;
    },
  });

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
  };

  let providerTitle = "Select Provider";
  let builderTitle = "Burger Builder";

  return (
    <motion.div
      className="bg-[#e8e8e8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-[90%] md:w-[95%] lg:w-[95%] main pt-20 pb-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mx-auto gap-6">
        {/* Ingredients block */}
        <div className="designerCard">
          <div className="">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-center gradient-text overflow-hidden text-[30px] text-[#000]"
              >
                {providerTitle.split("").map((item, index) => (
                  <motion.span
                    className="inline-block"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.07 }}
                    key={index}
                  >
                    {item === " " ? "\u00A0" : item}
                  </motion.span>
                ))}
              </Typography>

              <Typography
                variant="small"
                color="gray"
                className="my-2 flex items-center gap-1 justify-center font-normal text-[12px] md:text-[14px] lg:text-[14px]"
              >
                <FcInfo fontSize={"16"} />
                Select a provider you want to get your burger from.
              </Typography>
              <div
                className={` grid gap-5 grid-cols-3 mb-6 mt-4 justify-items-center`}
              >
                {isLoading ? (
                  <>
                    <div className="w-[70px] h-[70px] rounded-lg bg-[#e3e3e3] pulseForLoader"></div>
                    <div className="w-[70px] h-[70px] rounded-lg bg-[#e3e3e3] pulseForLoader"></div>
                    <div className="w-[70px] h-[70px] rounded-lg bg-[#e3e3e3] pulseForLoader"></div>
                  </>
                ) : (
                  <>
                    {providers.map((item, index) => (
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.3,
                          easings: ["anticipate"],
                        }}
                        key={index}
                      >
                        <Button
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
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {selectedData.length !== 0 && (
                <div className="mb-5 flex gap-2 items-center justify-center text-[16px] md:text-[20px] lg:text-[20px]">
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
            className="mb-2 text-center gradient-text overflow-hidden text-[30px] text-[#000]"
          >
            {builderTitle.split("").map((item, index) => (
              <motion.span
                className="inline-block"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.07 }}
                key={index}
              >
                {item === " " ? "\u00A0" : item}
              </motion.span>
            ))}
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
              <motion.img
                className="w-[200px] mx-auto"
                src="https://i.ibb.co/HYR6fx4/top.jpg"
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, easings: ["easeInOut"] }}
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
              <motion.img
                className="w-[200px] mx-auto"
                src="https://i.ibb.co/LQ6StVG/bottom.jpg"
                initial={{ opacity: 0, y: "100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, easings: ["easeInOut"] }}
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
    </motion.div>
  );
};

export default BurgerBuilder;
