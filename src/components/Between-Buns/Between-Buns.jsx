import React from 'react';
import PropTypes from 'prop-types';
import elementStyles from './Between-Buns.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop,  useDrag} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_ITEM, MOVING_ITEM} from "../../services/actions/Burger-Constructor";

export default function BetweenBuns({item, id, index, handleButtonState}) {
  const constructorIngredients = (store) => store.burgerConstructor.constructorIngredients
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const ingredients = useSelector(constructorIngredients);

  const deleteItem = (index) =>{
    dispatch({ type: DELETE_ITEM, index})
    ingredients.length === 1 && handleButtonState(true);
   }

   const [, drop] = useDrop({
    accept: "movingItems",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({type: MOVING_ITEM, dragIndex, hoverIndex })

      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "movingItems",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

return (
            <div ref={ref} style={{opacity}} className={elementStyles.wrapperElement}>
                <div className={elementStyles.element}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile} 
                  handleClose={() => deleteItem(index)}/>
              </div>
              )

}

BetweenBuns.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleButtonState: PropTypes.func.isRequired
};