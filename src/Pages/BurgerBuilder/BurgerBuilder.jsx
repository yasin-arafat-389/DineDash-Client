/* eslint-disable react/prop-types */
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Cart from "../../Components/Cart/Cart";

const BurgerBuilder = () => {
  let [ingredients, setIngredients] = useState([]);
  let [builder, setBuilder] = useState([]);

  useEffect(() => {
    fetch("Ingredients.json")
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, []);

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

  return (
    <div>
      <div className="w-[95%] main mt-10 grid grid-cols-3 mx-auto gap-5">
        {/* Ingredients block */}
        <Card className="bg-[#00acc1]">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 text-center gradient-text text-[30px] text-[#fff]"
            >
              All Ingredients
            </Typography>
            <Typography className="grid grid-cols-2 gap-7">
              {ingredients.map((item, index) => (
                <Button
                  onClick={() => handleAddIngredients(item.id)}
                  key={index}
                  variant="gradient"
                >
                  Add {item.name}
                </Button>
              ))}
            </Typography>
          </CardBody>
        </Card>

        {/* Builder block */}
        <div className="builder bg-white shadow-xl">
          <div>
            <img
              className="w-[200px] mx-auto"
              src="https://i.ibb.co/HYR6fx4/top.jpg"
              alt=""
            />
            <div className="flex flex-col items-center">
              {builder.length === 0 ? (
                <div>Add Ingredients</div>
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
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <img
                                        className="w-[200px] my-1"
                                        src={item.image}
                                        alt={item.id}
                                      />
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

        {/* Cart block */}
        <div className="cart">
          <Cart ingredients={builder} />
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;
