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
import {OPEN_MODAL} from "../../services/actions/Ingredient-List";
import {DELETE_BUN} from "../../services/actions/Burger-Constructor";
import {ORDER_ITEMS} from "../../services/actions/Order-Details";
import { createOrder } from "../../services/actions/Order-Details";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/actions/Burger-Constructor";
import { v4 as uuidv4 } from "uuid";

export default function BurgerConstructor() {
  const [buttonState, handleButtonState] = useState(true);
  const burgerConstructor = (store) => store.burgerConstructor;
  const {orderItems} = useSelector((store) => store.order);
  const {constructorBuns} = useSelector(burgerConstructor);
  const {constructorIngredients} = useSelector(burgerConstructor);
  const dispatch = useDispatch();
  const makeOrder = (event) => {
    event.stopPropagation();
    dispatch({ type: ORDER_ITEMS, constructorIngredients});
    const ingredientsID = constructorIngredients.map((item) => item._id);
    dispatch(createOrder(ingredientsID));
    dispatch({ type: OPEN_MODAL });
  };

  const totalPrice = React.useMemo(
    (() => {
      return constructorIngredients.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }), [constructorIngredients] 
  )

  const [, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      if (item.type === "bun") {
        dispatch({ type: DELETE_BUN});
        dispatch(addIngredient({ ...item, id: uuidv4() }));
        constructorIngredients.length >= 1 && handleButtonState(false);
      } else {
        dispatch(addIngredient({ ...item, id: uuidv4() }));
        constructorBuns && handleButtonState(false);
      }
    },
  });

  return (
    <section className={constructorStyles.burgerContructor}>
      <div
        ref={dropTarget}
        className={`mt-5 mb-10 pl-4 ${constructorStyles.burgerContructorList}`}
      >
           {constructorBuns && (<Bun item={constructorBuns} type="top" />)}
          
        <div className={constructorStyles.wrapperList}>
          {constructorIngredients.length ? (
            constructorIngredients.map((item, index) => {
              return (
                (
                  <BetweenBuns
                    item={item}
                    index={index}
                    id={item.id}
                    handleButtonState={handleButtonState}
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
        {constructorBuns && (<Bun item={constructorBuns} type="bottom" />)}
      </div>
      <div className={`pr-4 ${constructorStyles.result}`}>
        <p className="mr-10 text text_type_digits-medium">
          {constructorBuns ? totalPrice + (constructorBuns.price * 2) : totalPrice}
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
      {orderItems && (
        <Modal handleButtonState={handleButtonState} type="order">
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
