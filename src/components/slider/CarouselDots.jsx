import React, {useState, useEffect} from "react"
import PropTypes from "prop-types";
import {uid} from 'react-uid'

const CarouselDots = React.forwardRef(({isVisible = true, activeSlide, totalSlides, goToSlide}, dotsRef) => {
    const [active, setActive] = useState(activeSlide)

    if (!isVisible)
        return ''

    dotsRef.current = {
        setActiveSlide: (activeSlide) => {
            setActive(activeSlide)
        }
    }

    return (
        <div className={'carousel-dots'}>
            <ul>{Array.apply(null, {length: totalSlides}).map((_, idx) => {
                return <li data-slide-to={idx}
                           key={uid(idx)}
                           className={(active == idx + 1 ? 'active' : '')}
                           onClick={() => goToSlide(idx+1)}></li>
            })}
            </ul>
        </div>
    )
})

CarouselDots.propTypes = {
    isVisible: PropTypes.bool,
    totalSlides: PropTypes.number.isRequired,
    activeSlide: PropTypes.number.isRequired,
    goToSlide: PropTypes.func.isRequired,
}
export default CarouselDots