import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface DottedMenuProps {
    className?: string
}

export const DottedMenu: FC<DottedMenuProps> = ({ className = '' }) => {
    const { t } = useTranslation()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <button
                // id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dotted
            </button>

            <div className={className} open={open} onClose={handleClose}>
                <div onClick={() => {}}>Edit</div>
                <div onClick={() => {}}>Delete</div>
            </div>
        </>
    )
}
