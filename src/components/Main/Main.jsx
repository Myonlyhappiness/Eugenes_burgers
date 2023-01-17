import mainsStyles from './Main.module.css'
import PropTypes from 'prop-types';

export default function Main(props){
    return(
        <main className={`mt-10 ${mainsStyles.main}`}>
          <h1 className="text text_type_main-large pr-2 pb-2 pt-2">Соберите бургер</h1>
          <div className={mainsStyles.content}>
          {props.children}
          </div>
          </main>
    )
}

Main.propTypes = {
    props: PropTypes.element
  }