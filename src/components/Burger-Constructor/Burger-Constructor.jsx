import React from 'react';
import Modal from '../Modal/Modal'
import PropTypes from 'prop-types';
import constructorStyles from './Burger-Constructor.module.css'
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../Order-Details/Order-Details'

export default function BurgerConstructor({ ingredients }) {
  const [state, setActive] = React.useState({ active: false, event: null });


  const handleActiveModal = (event) => {
    event.stopPropagation();
    setActive({
      ...state,
      active: !state.active,
    });
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
        <p className="mr-10 text text_type_digits-medium">610<span className={constructorStyles.icon}><CurrencyIcon type="primary" /></span></p>
        <Button htmlType="button" type="primary" size="large" onClick={handleActiveModal}>
          Оформить заказ
        </Button>
      </div>
      {state.active && (<Modal handler={handleActiveModal}>
        <OrderDetails />
      </Modal>
      )}
    </section>
  )

}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array
}