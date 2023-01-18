import PropTypes from 'prop-types';
import ingredientStyles from './Ingredient-List.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

export default function IngredientList({ type, ingredients, handler }) {
    return ingredients.map(item => {
        if (item.type === type) {
            return (
                <article className={`pl-4 pr-4 ${ingredientStyles.ingredient}`} key={item._id} onClick={(event) => handler(event, item)}>
                    {item.__v > 0 && <Counter count={item.__v} size="default" extraClass="m-1" />}
                    <img src={item.image} className={ingredientStyles.image} alt={item.name}/>
                    <p className="text text_type_digits-default mt-1 mb-1">{item.price}<span className={ingredientStyles.icon}><CurrencyIcon type="primary" /></span></p>
                    <p className="text text_type_main-default">{item.name}</p>
                </article>
            )
        }
    })

}

IngredientList.propTypes = {
    type: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    handler: PropTypes.func
}