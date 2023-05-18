import PropTypes from 'prop-types';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'


export default function Bun({type, item}) {
return(
<div className="ml-8">
    <ConstructorElement
      type={type}
      isLocked={true}
      text={item.name}
      price={item.price}
      thumbnail={item.image_mobile}/>
  </div>)

}

Bun.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};