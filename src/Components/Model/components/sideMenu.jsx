import { useState, useEffect } from "react"

import classnames from "classnames";
import styles from './style.css';


function SideMenu(props) {

    const [activeItem, setActiveItem] = useState(0)



    const { menuList,urlValueList,setUrlValueList } = props

    return <div className={'menu'}>
        {
            menuList.map((item, index) => (
                <div className={'subMenu'} key={index}>
                    <div className={'subMenuTitle'}>{item.name}</div>
                    {
                        item.children.map((menuItem, idx) => (
                            <div
                                className={classnames('menuItem', activeItem == menuItem.name ? 'active' : null)}
                                onClick={() => { setActiveItem(menuItem.name); setUrlValueList(menuItem.value) }}
                                key={idx}>
                                {menuItem.name}
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </div>
}
export default SideMenu