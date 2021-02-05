import React from "react"
import PropTypes from "prop-types"

const CarouselButton = ({type, isVisible, onButtonClick}) => (
    <>{
        isVisible
            ? <span className={`carousel-swipe__control carousel-swipe__control_${type} carousel-swipe__control_show`}
                    onClick={() => onButtonClick(type)}
                    role="button"/>
            : ''
    }</>
)

const CarouselButtons = ({leftControl, rightControl, onButtonClick}) => (
    <div>
        <CarouselButton type="left" isVisible={leftControl} onButtonClick={onButtonClick}/>
        <CarouselButton type="right" isVisible={rightControl} onButtonClick={onButtonClick}/>
    </div>
)

CarouselButtons.propTypes = {
    leftControl: PropTypes.bool.isRequired,
    rightControl: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired
}

export default CarouselButtons