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

## API

Props | Values | Default | Description
------------ | ------------- | ------------- | -------------
debug | true/false | false | Enable or disable debug information
elements | array / func | [] | Collection of carousele slides
methods | func | null | Slider exported API callback function

## Example

```javascript
const App = () => {
    let carousel = null

    let elements = [1, () => <img className={'customClassName'} src={"https://bit.ly/2Y3XgWP"} />, 3,  4, 5, 6, 7]

    const onClickHandler = (page) => () => carousel.goToSlide(page)

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
            <button className={'btn'} onClick={onClickHandler(7)}>Go to slide 7</button>
        </>
    )
};

ReactDOM.render(<App/>, document.getElementById("app"))

```
