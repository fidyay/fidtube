import {useState, useRef} from 'react'

const changeTrackValue = (event, slider, maxValue, maxX) => {
    let x = event.pageX - slider.getBoundingClientRect().left
    if (x < 0) x = 0
    if (x > maxX) x = maxX
    const value = (x/maxX)*maxValue
    return value
}




const Slider = ({videoProgress, volume, paused, setVideoPlaying, setSliderUsing, downloadedData, onChange, disabled, value, min, max, tipFormatter}) => {
    const slider = useRef(null)
    const [tooltipValue, setTooltipValue] = useState(0)
    const [pointerPressed, setPressed] = useState(false)
    const [pointerOver, setOver] = useState(false)
    const [tooltipLeft, setTooltipLeft] = useState(0)
    const [tooltip, setTooltip] = useState(false)
    if (!min) min = 0
    if (!max) max = 100
    if (!value && value !== 0) volume ? value = 50 : value = 0
    const maxValue = max - min
    const x = (value/maxValue)*100

    const changeTooltipX = (event) => {
        let tooltipX = event.pageX
        if (!slider.current) return
        const sliderCltRect = slider.current.getBoundingClientRect()
        const minLeft = sliderCltRect.left
        const maxLeft = sliderCltRect.left + sliderCltRect.width
        if (tooltipX < minLeft) tooltipX = minLeft
        if (tooltipX > maxLeft) tooltipX = maxLeft
        if (tooltip) {
            const tooltipValue = ((tooltipX - minLeft) / sliderCltRect.width) * maxValue + min
            setTooltipValue(tooltipValue)
        }
        return tooltipX
    }
    

    
    return (
        <div style={{display: disabled ? 'none' : 'block'}} ref={slider} className={`slider${volume ? '_volume' : ''}`} 
        onPointerDown={event => {
                    if (!paused) setVideoPlaying(false)
                    setSliderUsing(true)
                    const maxX = slider.current.offsetWidth                   
                    onChange(changeTrackValue(event, slider.current, maxValue, maxX))

                    if (!tooltip) setTooltip(true)
                    changeTooltipX(event)


                    const PointerMove = (event) => {
                        onChange(changeTrackValue(event, slider.current, maxValue, maxX))
                        if (tooltip) {
                            setTooltipLeft(changeTooltipX(event))
                        }
                    }
                    const PointerUp = () => {
                        if (!pointerOver) {
                            setSliderUsing(false)
                            if (tooltip) {
                                setTooltip(false)                                
                            } 
                        }
                        setPressed(false)
                        if (!paused) setVideoPlaying(true)
                        window.removeEventListener('pointermove', PointerMove)
                        slider.current.removeEventListener('pointerup', PointerUp)
                    }

                    window.addEventListener('pointermove', PointerMove)
                    slider.current.addEventListener('pointerup', PointerUp)
                }}
                onPointerOver={event => {
                    if (!tooltip) setTooltip(true)
                    changeTooltipX(event)
                    setSliderUsing(true)

                    const PointerMove = (event) => {
                        setTooltipLeft(changeTooltipX(event))
                    }
                    const PointerOut = () => {
                        if (!pointerPressed) {
                            setSliderUsing(false)
                           if (tooltip) {
                            setTooltip(false)
                           }
                        }
                        setOver(false)
                        window.removeEventListener('pointermove', PointerMove)
                        slider.current.removeEventListener('pointerout', PointerOut)
                    }

                    window.addEventListener('pointermove', PointerMove)
                    slider.current.addEventListener('pointerout', PointerOut)


                }}>
            <div className="slider__rail">
                {tooltip && <div style={{left: `${tooltipLeft}px`, top: `${slider.current.getBoundingClientRect().top - 28}px`}} className="slider__tooltip">{tipFormatter ? tipFormatter(tooltipValue) : Math.floor(tooltipValue)}</div>}
                <div style={{width: `${x}%`}} className="slider__track"/>
                {videoProgress && <div className="slider__downloaded-data"/>}
                <div style={{left: `${x}%`}} className="slider__handle"/>
            </div>
        </div>
    )
}

export default Slider