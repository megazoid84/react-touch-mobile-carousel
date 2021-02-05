import React, {useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import Carousel from './components/slider/Carousel'
import './style.scss'

const App = () => {
    const carousel = useRef()
    const [arrowsVisible, setArrowsVisible] = useState(true)
    const [dotsVisible, setDotsVisible] = useState(true)

    const onClickHandler = (page) => {
        return () => carousel.current.goToSlide(page)
    }

    return (
        <>
            <div style={{height: '30em'}}>
                <Carousel ref={carousel}
                          dotsVisibility={dotsVisible}
                          arrowsVisibility={arrowsVisible}>
                    <div key={'item-1'}>1</div>
                    <img key={'item-2'} className={'customClassName'}
                         src={"https://bit.ly/2Y3XgWP"}/>
                    <div key={'item-3'}>3</div>
                    <iframe key={'item-4'} width="560" height="315" src="https://www.youtube.com/embed/sxSCtend-B8" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                    <div key={'item-5'}>5</div>
                    <div key={'item-6'}>6</div>
                    <div key={'item-7'}>7</div>
                </Carousel>
            </div>

            <div className={'management-area'}>
                <h2>Demo of slider management (through the Slider API)</h2>

                <label className={'management-area__desktop-arrows'}>
                    <input type="checkbox"
                           checked={arrowsVisible}
                           onChange={() => setArrowsVisible(!arrowsVisible)}/> Toggle Next/Prev visibility
                </label>

                <label>
                    <input type="checkbox"
                           checked={dotsVisible}
                           onChange={() => setDotsVisible(!dotsVisible)}/> Toggle dots visibility
                </label>

                <h3>Switching between the pages</h3>
                <button className={'btn'} onClick={onClickHandler(1)}>Go to slide 1</button>
                <button className={'btn'} onClick={onClickHandler(2)}>Go to slide with Logo</button>
                <button className={'btn'} onClick={onClickHandler(3)}>Go to slide 3</button>
                <button className={'btn'} onClick={onClickHandler(5)}>Go to slide 5</button>
                <button className={'btn'} onClick={onClickHandler(4)}>Go to slide with Video</button>
            </div>

        </>
    )
};


ReactDOM.render(<App/>, document.getElementById("app"))
