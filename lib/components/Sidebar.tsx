import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useMemo, useState } from "react"
import {
    ArticleIcon,
    CollapsIcon,
    HomeIcon,
    UsersIcon,
  } from "./icons";

type data =  Array<{
    id: number,
    label: string,
    icon: any,
    link: string
}> | undefined

const MenuItems : data = [
    {id: 1, label: "Farmacias", icon: HomeIcon, link: "/Pharmacy"},
    {id: 2, label: "Productos", icon: ArticleIcon, link: "/Products"},
    {id: 3, label: "Inventario", icon: UsersIcon, link: "/Inventory"}
]

const Sidebar = () => {
    const [toggleCollapse, setToggleCollapse] = useState(false)
    const [isCollapsable, setIsCollapsable] = useState(false)

    const router = useRouter()

    const activeMenu = useMemo(() => MenuItems.find(menu => menu.link === router.pathname), [router.pathname])

    const wrapperClasses = classNames(
        "h-screen px-4 pt-8 pb-4 bg-blue flex justify-between flex-col",
        {
            ["w-80"]: !toggleCollapse,
            ["w-20"]: toggleCollapse
        }
    )

    const collapseIconClasses = classNames(
        "p-4 rounded bg-light-lighter absolute right-0",
        {
            "rotate-180": toggleCollapse
        }
    )

    const getNavItemsClasses = (menu: any) => {
        return classNames("flex items-center cursor-pointer hover:bg-grey rounded w-full overflow-hidden whitespace-nowrap",
        {
            ["bg-grey"]: activeMenu && activeMenu.id ===  menu.id
        })
    }

    const onMouseOver = () => {
        setIsCollapsable(!isCollapsable)
    }

    const handleSideBarToggle = () => {
        setToggleCollapse(!toggleCollapse)
    }

    return (
        <div className={wrapperClasses}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOver}
            style = {{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}>
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    {isCollapsable && <button className={collapseIconClasses} onClick={handleSideBarToggle}>
                        <CollapsIcon />
                    </button>}
                    <div className="flex items-center pl-1 gap-4">
                        <span className={
                            classNames('mt-2 text-lg font-medium text-text', 
                            { hidden: toggleCollapse })
                        }>
                            <img src="https://www.farmaciasdesimilares.com/images/logo-1.jpg"></img>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-start mt-24">
                    {MenuItems.map(({icon: Icon, ...menu}) => {
                        const classes = getNavItemsClasses(menu)
                        return(
                        <div className={classes}>
                            <Link legacyBehavior href={menu.link}>
                                <a className="flex py-4 px3 items-center w-full h-full">
                                    <div style={{ width: "2.5rem" }}>
                                        <Icon />
                                    </div>
                                    {!toggleCollapse && (
                                        <span className={classNames('text-md font-medium text-text-light')}>{menu.label}</span>
                                    )}
                                </a>
                            </Link>
                        </div>
                    )})}
                </div>                
            </div>
        </div>
    )
}

export default Sidebar