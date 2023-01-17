import ordertDetailsStyles from './OrderDetails.module.css'
import iconDone from '../../images/done.png'

export default function OrderDetails(){
return (
<div className={ordertDetailsStyles.main}>
<p className={`${ordertDetailsStyles.number} text text_type_digits-large`}>034536</p>
<p className="text text_type_main-medium">идентификатор заказа</p>
<div className={ordertDetailsStyles.icon}><img src={iconDone} alt="icon"/></div>
<p className="text text_type_main-default">Ваш заказ начали готовить</p>
<p className={`${ordertDetailsStyles.caption} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
</div>
)
}