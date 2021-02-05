import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {uid} from 'react-uid'
import CarouselButtons from './CarouselButtons'
import CarouselDots from './CarouselDots'
import './style.scss'

const Carousel = React.forwardRef(
    ({
         debug = false,
         arrowsVisibility = true,
         dotsVisibility = true,
         children
     }, sliderRef) => {

        /**
         * Carousel wrapper reference
         */
        const wrapper = useRef(null)

        /**
         * Carousel dots reference
         */
        const dots = useRef(null)

        /**
         * Variable for left arrow visibility state
         */
        const [leftControl, setLeftControl] = useState(false)

        /**
         * Variable for right arrow visibility state
         */
        const [rightControl, setRightControl] = useState(true)

        /**
         * Variable for saving dimensions on rotate
         */
        const [dimensions, setDimensions] = useState({
            height: window.innerHeight,
            width: window.innerWidth
        })

        /**
         * Current visible slide
         * @type {React.MutableRefObject<number>}
         */
        const step = useRef(1)

        /**
         * Total slides counter
         * (for future purposes - dynamically adding new items, etc)
         * @type {React.MutableRefObject<number>}
         */
        const total = useRef(0)

        /**
         * Ref for intermediate storage of transformation data
         * @type {React.MutableRefObject<number>}
         */
        const transformDelta = useRef(0)

        /**
         * Transition params
         * @type {string}
         */
        const transition = 'all 0.5s ease 0s'

        let downX = null
        let downY = null
        let carouselSwipeItems = []
        let transform = 0
        let widthToSwipeSlide
        let moveTimeStart

        /**
         * Configurable debug helper
         * @param enabled
         * @param args
         * @returns {void|null}
         */
        const debugLog = (enabled = false, ...args) => enabled ? console.log(...args) : null

        /**
         * Component did mount emulation
         */
        useEffect(() => {
            debugLog(debug, '-- useEffect [did mount]')
            debugLog(debug, 'Current slide: ', step.current)

            total.current = carouselSwipeItems.length

            const handleResize = () => {
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                })
                resetCarousel(true)
            }

            window.addEventListener('resize', handleResize)

            return _ => {
                window.removeEventListener('resize', handleResize)
            }

        }, [])

        /**
         * Each render operations
         */
        useEffect(() => {
            debugLog(debug, '-- useEffect [each render]')
            transform = transformDelta.current
        })

        /**
         * Return carousel wrapper DOM element
         * @returns {null}
         */
        const getCarouselWrapper = () => wrapper.current

        /**
         * Return carousel wrapper width
         * @returns {number}
         */
        const getCarouselWrapperWidth = () => parseFloat(getComputedStyle(wrapper.current).width)

        /**
         * Reset Carousel function
         * @param saveSlidePosition
         */
        const resetCarousel = (saveSlidePosition = false) => {
            let prevPosition = null
            if (saveSlidePosition) {
                prevPosition = step.current
            }
            transformDelta.current = 0
            transform = 0
            step.current = 1
            dots.current.setActiveSlide(step.current)
            setLeftControl(false)
            setRightControl(true)
            if (saveSlidePosition) {
                goToSlide(prevPosition, true)
            }
        }

        /**
         * Function that immediately switch to specific slide
         * @param number
         * @param disableAnimation
         */
        const goToSlide = (number, disableAnimation = false) => {
            debugLog(debug, '-- goToSlide: ', number)
            if (number === step.current || number <= 0 || number > total.current) {
                return
            }
            const carouselSwipeWrapper = getCarouselWrapper()
            const carouselSwipeWrapperWidth = getCarouselWrapperWidth()
            const direction = number > step.current ? 'right' : 'left'
            step.current = number
            dots.current.setActiveSlide(step.current)
            if (disableAnimation) {
                carouselSwipeWrapper.style.transition = ''
            }
            if (direction === 'right') {
                if (step.current >= total.current) {
                    setRightControl(false)
                }
                setLeftControl(true)
                transformDelta.current = -(step.current - 1) * carouselSwipeWrapperWidth
                transform = transformDelta.current
                carouselSwipeWrapper.style.left = transform + 'px'
            } else if (direction === 'left') {
                if (step.current <= 1) {
                    setLeftControl(false)
                }
                setRightControl(true)
                transformDelta.current = -1 * (step.current - 1) * carouselSwipeWrapperWidth
                transform = transformDelta.current
                carouselSwipeWrapper.style.left = transform + 'px'
            }
            if (disableAnimation) {
                setTimeout(() => carouselSwipeWrapper.style.transition = transition, 500)
            }
        }

        /**
         * Main wrapper for swiping the slides
         * @param direction
         */
        const carouselSwipeTransformItem = (direction) => {
            debugLog(debug, '-- carouselSwipeTransformItem', direction)

            const carouselSwipeWrapper = getCarouselWrapper()
            const carouselSwipeWrapperWidth = getCarouselWrapperWidth()

            carouselSwipeWrapper.style.transition = transition
            if (direction === 'right') {
                if (step.current >= total.current) {
                    return
                }
                if (step.current + 1 >= total.current) {
                    setRightControl(false)
                }
                setLeftControl(true)
                step.current += 1
                transformDelta.current -= carouselSwipeWrapperWidth
                transform -= carouselSwipeWrapperWidth
                carouselSwipeWrapper.style.left = transform + 'px'
            } else if (direction === 'left') {
                if (step.current <= 1) {
                    return
                }
                if (step.current - 1 <= 1) {
                    setLeftControl(false)
                }
                setRightControl(true)
                transformDelta.current += carouselSwipeWrapperWidth
                step.current -= 1
                transform += carouselSwipeWrapperWidth
                carouselSwipeWrapper.style.left = transform + 'px'
            }
            dots.current.setActiveSlide(step.current)
            debugLog(debug, 'Current slide:', step.current)
        }

        /**
         * Get list of touches
         * @param e
         * @returns {*}
         */
        const getTouches = (e) => {
            debugLog(debug, '-- getTouches')
            return e.touches || e.originalEvent.touches
        }

        /**
         * Handle touch start event
         * @param e
         */
        const handleTouchStart = (e) => {
            debugLog(debug, '-- handleTouchStart')
            const carouselSwipeWrapper = getCarouselWrapper()
            const firstTouch = (e.touches) ? getTouches(e)[0] : e
            downX = firstTouch.clientX
            downY = firstTouch.clientY
            carouselSwipeWrapper.style.transition = 'none'
            moveTimeStart = Date.now()
            debugLog(debug, downX, downY)
        }

        /**
         * Handle touch move event before bubbling
         * @param e
         */
        const handleTouchMoveCapture = (e) => {
            if (!downX || !downY) {
                return
            }

            const moveTouch = (e.touches) ? e.touches[0] : e
            let upX = moveTouch.clientX
            let upY = moveTouch.clientY

            let diffX = downX - upX
            let diffY = downY - upY

            if (Math.abs(diffX) > Math.abs(diffY)) {
                const carouselSwipeWrapper = getCarouselWrapper()
                if (diffX > 0) {
                    if (step.current >= total.current) {
                        return
                    }
                    carouselSwipeWrapper.style.left = transform - diffX + 'px'
                } else {
                    if (step.current <= 1) {
                        return
                    }
                    carouselSwipeWrapper.style.left = transform - diffX + 'px'
                }
            }
        }

        /**
         * Handle touch end event
         * @param e
         */
        const handleTouchEnd = (e) => {
            debugLog(debug, '-- handleTouchEnd')
            const carouselSwipeWrapper = getCarouselWrapper()
            const carouselSwipeWrapperWidth = getCarouselWrapperWidth()

            const lastTouch = (e.changedTouches) ? e.changedTouches[0] : e
            const moveTimeEnd = Date.now()
            const downXend = lastTouch.clientX
            const downYend = lastTouch.clientY
            const moveTimeDiff = moveTimeEnd - moveTimeStart

            let diffX = downX - downXend
            let diffY = downY - downYend

            carouselSwipeWrapper.style.transition = transition
            widthToSwipeSlide = dimensions.width > 1024 ? carouselSwipeWrapperWidth / 4 : carouselSwipeWrapperWidth / 3

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    if ((widthToSwipeSlide <= downX - downXend) || moveTimeDiff < 150) {
                        carouselSwipeTransformItem('right')
                    } else {
                        carouselSwipeWrapper.style.left = transform + 'px'
                    }
                } else {
                    if (-widthToSwipeSlide >= downX - downXend || moveTimeDiff < 150) {
                        carouselSwipeTransformItem('left')
                    } else {
                        carouselSwipeWrapper.style.left = transform + 'px'
                    }
                }
            }
            downX = null
            downY = null
        }

        /**
         * Export public interface for carousel management
         */
        if (sliderRef !== null) {
            sliderRef.current = {
                goToSlide
            }
        }

        return (
            <div className="carousel">
                <div className="carousel-swipe">
                    <div className="carousel-swipe__wrapper"
                         ref={wrapper}
                         style={{transition: "all 0.5s ease 0s", left: 0}}>
                        {
                            children.map((item, index) => {
                                return (
                                    <div className={`carousel-swipe__item`}
                                         key={item.key || uid(item)}
                                         onTouchStart={handleTouchStart}
                                         onTouchMoveCapture={handleTouchMoveCapture}
                                         onTouchEnd={handleTouchEnd}
                                         onMouseDown={handleTouchStart}
                                         onMouseMove={handleTouchMoveCapture}
                                         onMouseUp={handleTouchEnd}
                                         ref={elm => carouselSwipeItems[index] = elm}>
                                        <div>{typeof item === 'function' ? item() : item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {arrowsVisibility
                        ? <CarouselButtons
                            leftControl={leftControl}
                            rightControl={rightControl}
                            onButtonClick={carouselSwipeTransformItem}
                        />
                        : ''}
                </div>
                <CarouselDots isVisible={dotsVisibility}
                              goToSlide={goToSlide}
                              activeSlide={step.current}
                              totalSlides={children.length}
                              ref={dots}/>
            </div>
        )
    })

Carousel.propTypes = {
    debug: PropTypes.bool,
    arrowsVisibility: PropTypes.bool,
    dotsVisibility: PropTypes.bool,
    children: PropTypes.arrayOf(
        PropTypes.element
    ).isRequired
}

export default Carousel