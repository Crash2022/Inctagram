import React from 'react'
import { useComponentVisible } from '@/shared/hooks/useComponentVisible'
import cls from './DottedMenu.module.scss'

interface PostDottedMenuProps {
    menuItems: any[]
}

export const DottedMenu = ({ menuItems }: PostDottedMenuProps) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <div className={cls.dottedMenu}>
            <div
                className={cls.dottedMenu_icon}
                onClick={() => {
                    setIsComponentVisible(!isComponentVisible)
                }}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
            {isComponentVisible ? (
                <div className={cls.dottedMenu_list} ref={ref}>
                    {menuItems.map((item) => {
                        const onClickHandler = () => {
                            item.func()
                            setIsComponentVisible(false)
                        }

                        return (
                            <div key={item.id} className={cls.list_item} onClick={onClickHandler}>
                                <div>
                                    <item.icon />
                                </div>
                                <div>{item.title}</div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
