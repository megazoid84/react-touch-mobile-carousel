import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from './components/slider/Carousel'
import './style.scss'

const App = () => {
    let carousel = null

    let elements = [1, () => {
        return <img className={'customClassName'}
                    src={"https://bit.ly/2Y3XgWP"} />
    }, 3,  () => {
        return <iframe width="560" height="315" src="https://www.youtube.com/embed/sxSCtend-B8" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
    }, 5, 6, 7]

    const onClickHandler = (page) => {
        return () => carousel.goToSlide(page)
    }

    return (
        <>
            <div style={{height: '40em'}}>
                <Carousel
                    methods={m => carousel = m}
                    debug={true}
                    elements={elements}
                />
            </div>
            <button className={'btn'} onClick={onClickHandler(1)}>Go to slide 1</button>
            <button className={'btn'} onClick={onClickHandler(2)}>Go to slide 2</button>
            <button className={'btn'} onClick={onClickHandler(3)}>Go to slide 3</button>
            <button className={'btn'} onClick={onClickHandler(5)}>Go to slide 5</button>
            <button className={'btn'} onClick={onClickHandler(6)}>Go to slide 6</button>
            <button className={'btn'} onClick={onClickHandler(7)}>Go to slide 7</button>
            <button className={'btn'} onClick={onClickHandler(4)}>Go to slide with Video</button>
        </>
    )
};


ReactDOM.render(<App/>, document.getElementById("app"))
