# Gauge.js

see [dist/index.html](https://github.com/AndKu/gauge/blob/master/build/index.html) for example

[Demo](http://andku.github.io/gauge/build/)

## Build

```sh
npm i
gulp
```

## Default configs

```javascript
{
    aperture: 270, // aperture in deg
    value: 0, // start value in percent
    marks: [0,1,2,3,4,5,6], // marks label
    countMinorSegments: 10, // count minor segment between marks
    segments: [
        {
            endPosition: 75, // end position of segment in percent
            color: 'gray' // color of segment
        },
        {
            endPosition: 85,
            color: 'orange'
        },
        {
            endPosition: 100,
            color: 'red'
        }
    ],
    marksInside: false // if true, marks will be inside of gauge
}
```