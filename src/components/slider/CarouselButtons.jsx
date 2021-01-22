import React from "react";

const CarouselButton = ({type, isVisible, onButtonClick}) => (
    <>{
        isVisible
            ? <span className={`carousel-swipe__control carousel-swipe__control_${type} carousel-swipe__control_show`}
                    onClick={() => onButtonClick(type)}
                    role="button"/>
            : ''
    }</>
)

export default ({leftControl, rightControl, onButtonClick}) => (
    <div>
        <CarouselButton type="left" isVisible={leftControl} onButtonClick={onButtonClick}/>
        <CarouselButton type="right" isVisible={rightControl} onButtonClick={onButtonClick}/>
    </div>
)