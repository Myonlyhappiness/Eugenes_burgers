import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './App-Header.module.css'


export default function AppHeader () {
      return (
         <header className={headerStyles.header}>
          <nav className={`pb-4 pt-4 ${headerStyles.menu}`}>
          <ul className={`pb-4 pt-4 pl-5 pr-5 mr-2 ${headerStyles.menu_element}`} >
            <li className={headerStyles.icon}><BurgerIcon type="primary" /></li>
            <li className="text text_type_main-default">Конструктор</li>
            </ul>
            <ul className={`pb-4 pt-4 pl-5 pr-5 ${headerStyles.menu_element}`}>
            <li className={headerStyles.icon}><ListIcon type="secondary" /></li>
            <li className="text text_type_main-default text_color_inactive">Лента&nbsp;заказов</li>
            </ul>
            <div className={headerStyles.logo}><Logo /></div>
            <ul className={`pb-4 pt-4 pl-5 pr-5 ${headerStyles.menu_element}`}>
            <li className={headerStyles.icon}><ProfileIcon type="secondary" /></li>
            <li className="text text_type_main-default text_color_inactive">Личный кабинет</li>
            </ul>
          </nav>
         
        </header>
      );
 
  }