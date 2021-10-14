import { useState, useEffect } from "react"
const useWindowWidth = () => {
    const [width, setWidth] = useState(document.documentElement.clientWidth)
    useEffect( () => {
        const handleWidth = () => {
            setWidth(document.documentElement.clientWidth)
        }
        window.addEventListener('resize', handleWidth)
        return () => {
            window.removeEventListener('resize', handleWidth)
        }
    }, [])

    return width
}

export default useWindowWidth