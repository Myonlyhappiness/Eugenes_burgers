import React from 'react';
import Modal from '../Modal/Modal'
import constructorStyles from './Burger-Constructor.module.css'
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../Order-Details/Order-Details'
import {useSelector, useDispatch} from 'react-redux';
import {OPEN_MODAL} from '../../services/actions/Ingredient-List'
import {createOrder} from '../../services/actions/Order-Details'


export default function BurgerConstructor() {
  const [ingredients] = useSelector(store => store.menu.constructorItems)
  const {modalActive, currentIngredient} = useSelector(store => store.modal)
  const ingredientsID = ingredients.map(item => item._id)
  const dispatch = useDispatch();
  const makeOrder = (event) => {
    event.stopPropagation();
    dispatch(createOrder(ingredientsID));
    dispatch({type: OPEN_MODAL})
  }

  return (
    <section className={constructorStyles.burgerContructor}>
      <div className={`mt-5 mb-10 pl-4 ${constructorStyles.burgerContructorList}`}>
        <div className="ml-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
        </div>

        <div className={constructorStyles.wrapperList}>
          {ingredients.map(item => {
            return item.type != "bun" && (
              <div className={constructorStyles.wrapperElement} key={item._id}>
                <div className={constructorStyles.element}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile} />
              </div>

            )
          })}

        </div>
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png" />
        </div>
      </div>
      <div className={`mr-2 ${constructorStyles.result}`}>
        <p className="mr-10 text text_type_digits-medium">{ingredients.reduce((acc, item) => acc + item.price, 0)}<span className={constructorStyles.icon}><CurrencyIcon type="primary" /></span></p>
        <Button htmlType="button" type="primary" size="large" onClick={(event) => makeOrder(event)}>
          Оформить заказ
        </Button>
      </div>
      {modalActive && !currentIngredient && (<Modal>
        <OrderDetails />
      </Modal>
      )}
    </section>
  )

}