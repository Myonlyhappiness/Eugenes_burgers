import ordertDetailsStyles from "./Order-Details.module.css";
import iconDone from "../../images/done.png";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const { number } = useSelector((store) => store.order.orderInfo);
  const { textError, orderFailed, orderRequest } = useSelector(
    (store) => store.order
  );
  return (
    <div className={ordertDetailsStyles.main}>
      {orderRequest && "Данные подгружаются"}
      {orderFailed && textError}
      {!orderFailed && !orderRequest && (
        <>
          <p
            className={`${ordertDetailsStyles.number} text text_type_digits-large`}
          >
            {number}
          </p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <div className={ordertDetailsStyles.icon}>
            <img src={iconDone} alt="icon" />
          </div>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p
            className={`${ordertDetailsStyles.caption} text text_type_main-default`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
