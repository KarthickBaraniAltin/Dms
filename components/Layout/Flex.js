import { memo } from "react"

function Flex({ direction = 'row', className, children }) {

    return (
        <div className={`flex p-0 m-0 flex-${direction} ${className}`} >
            {children}
        </div>

    )

}

export default memo(Flex)