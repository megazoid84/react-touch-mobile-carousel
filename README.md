# Touch Web & Mobile Carousel for React.js

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn start
```

### Compiles and minifies for production
```
yarn run build
```

## Demo

How it works - https://react-touch-mobile-carousel.web.app

## Purpose
It's a carousel component that works on mobile and desktop.

Library supports next features:
- Work for mobile and desktop devices
- Support swipes
- Work for any HTML content
- Animated
- Spports finger-following swipes (multi-picture post in Instagram was taken as a reference)
- Supports scrolling to a selected slide (like go to slide X)

Todo:
- Supports multiple slides on the screen
- Supports infinite option

## Props

Props | Values | Default | Description
------------ | ------------- | ------------- | -------------
debug | true/false | false | Enable or disable debug information
children | React.element[] | [] | Collection of carousel slides
ref | React.ref | undefined | Refernece for accessing to exported API methods
dotsVisibility | true/false | true | Show/Hide dots pagination
arrowsVisibility | true/false | true | Show/Hide Prev/Next buttons

## API

To access to internal Carousel API use <a href="https://ru.reactjs.org/docs/refs-and-the-dom.html">React.ref</a>

Method | Values | Default | Description
------------ | ------------- | ------------- | -------------
goToSlide | Number | 1 | Method allows to switch to corresponding carousel slide

## Example

```javascript
const App = () => {
    const carousel = useRef()
    const [arrowsVisible, setArrowsVisible] = useState(true)
    const [dotsVisible, setDotsVisible] = useState(true)

    const onClickHandler = (page) => () => carousel.current.goToSlide(page)
    
    return (
        <>
            <div style={{height: '30em'}}>
                <Carousel ref={carousel}
                          dotsVisibility={dotsVisible}
                          arrowsVisibility={desktopArrowsVisible}>
                    <div key={'item-1'}>1</div>
                    <img key={'item-2'} className={'customClassName'} 
                         src={"https://bit.ly/2Y3XgWP"}/>
                    <div key={'item-3'}>3</div>
                </Carousel>
            </div>
            <button onClick={onClickHandler(1)}>Go to slide 1</button>
            <button onClick={onClickHandler(3)}>Go to slide 3</button>
            <label>
                <input type="checkbox" checked={arrowsVisible} onChange={() => setArrowsVisible(!arrowsVisible)}/>
                Toggle Next/Prev visibility
            </label>

            <label>
                <input type="checkbox" checked={dotsVisible} onChange={() => setDotsVisible(!dotsVisible)}/>
                Toggle dots visibility
            </label>
        </>
    )
};

ReactDOM.render(<App/>, document.getElementById("app"))

```
