import React, { useState } from "react";
import Modal from "../Modal/Modal";
import constructorStyles from "./Burger-Constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../Order-Details/Order-Details";
import BetweenBuns from "../Between-Buns/Between-Buns";
import Bun from "../Bun/Bun";
import { useSelector, useDispatch } from "react-redux";
import {
  OPEN_MODAL,
  DELETE_BUN,
  INCREASE_COUNTER,
  INCREASE_COUNTER_BUN,
  DECREASE_COUNTER_BUN,
} from "../../services/actions/Ingredient-List";
import { createOrder } from "../../services/actions/Order-Details";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/actions/Ingredient-List";
import { v4 as uuidv4 } from "uuid";

export default function BurgerConstructor() {
  const [buttonState, handleState] = useState(true);
  const ingredients = useSelector((store) => store.menu.constructorItems);
  const { modalActive, currentIngredient } = useSelector(
    (store) => store.modal
  );
  const ingredientsID = ingredients.map((item) => item._id);
  const dispatch = useDispatch();
  const makeOrder = (event) => {
    event.stopPropagation();
    dispatch(createOrder(ingredientsID));
    dispatch({ type: OPEN_MODAL });
  };

  const totalPrice = (ingredients) => {
    return ingredients.reduce((acc, item) => {
      return item.type === "bun" ? acc + item.price * 2 : acc + item.price;
    }, 0);
  };

  const [, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      if (item.type === "bun") {
        dispatch({ type: DELETE_BUN, item });
        dispatch(addIngredient({ ...item, id: uuidv4() }));
        dispatch({ ...item, type: INCREASE_COUNTER_BUN });
        dispatch({ ...item, type: DECREASE_COUNTER_BUN });
        ingredients.some((elem) => elem.type !== "bun") && handleState(false);
      } else {
        dispatch(addIngredient({ ...item, id: uuidv4() }));
        dispatch({ ...item, type: INCREASE_COUNTER });
        ingredients.some((elem) => elem.type === "bun") && handleState(false);
      }
    },
  });

  return (
    <section className={constructorStyles.burgerContructor}>
      <div
        ref={dropTarget}
        className={`mt-5 mb-10 pl-4 ${constructorStyles.burgerContructorList}`}
      >
        {ingredients.map((item) => {
          return (
            item.type === "bun" && <Bun item={item} key={item.id} type="top" />
          );
        })}
        <div className={constructorStyles.wrapperList}>
          {ingredients.length ? (
            ingredients.map((item, index) => {
              return (
                item.type != "bun" && (
                  <BetweenBuns
                    item={item}
                    index={index}
                    id={item.id}
                    handleState={handleState}
                    key={item.id}
                  />
                )
              );
            })
          ) : (
            <p className={constructorStyles.emptyListText}>
              Перетащите сюда ингредиенты
            </p>
          )}
        </div>

        {ingredients.map((item) => {
          return (
            item.type === "bun" && (
              <Bun item={item} key={item.id} type="bottom" />
            )
          );
        })}
      </div>
      <div className={`mr-2 ${constructorStyles.result}`}>
        <p className="mr-10 text text_type_digits-medium">
          {totalPrice(ingredients)}
          <span className={constructorStyles.icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          disabled={buttonState}
          htmlType="button"
          type="primary"
          size="large"
          onClick={(event) => makeOrder(event)}
        >
          Оформить заказ
        </Button>
      </div>
      {modalActive && !currentIngredient && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
