import { memo } from "react"

function Grid({ className, children }) {
    return (
        <div className={`grid m-0 p-0 ${className}`} >
            {children}
        </div>
    )
}
export default memo(Grid)