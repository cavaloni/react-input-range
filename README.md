## Forked for use in project
This was originally forked from davidchin/react-input-range. This fork adds some features that may be trivial for larger scale use and/or too specific to be useful. It fits our needs, however :) These features are:

* Markers:
  + Ability to add markers based off percentage and supply your own styles to it, using either classNames or ids
    + Markers come in the shape of:
    ```
      markers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          percentage: PropTypes.string.isRequired,
          className: PropTypes.string,
        }),
      ),
      ```
* Style objects for dynamic updates for each main component:
  + Label
  + Track
  + Active Track
* ClassNames object no longer requires providing every className, just those you wish to update.
* Tests updated

# react-input-range

`InputRange` is a React component allowing users to input numeric values within a specific range. It can accept a single value, or a range of values (min/max). By default, basic styles are applied, but can be overridden depending on your design requirements.

[![Build Status](https://travis-ci.org/davidchin/react-input-range.svg?branch=master)](https://travis-ci.org/davidchin/react-input-range)

## Demo
A CodePen demo is available [here](http://codepen.io/davidchin/full/GpNvqw/).

## Installation

1. Install `react-input-range` using npm (or [yarn]). `npm install react-input-range`
2. Import `react-input-range` to use `InputRange` component.
3. Optionally, import `react-input-range/lib/css/index.css` if you want to apply the default styling.

## Usage

To accept min/max value:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 2, max: 10 },
    };
  }

  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

To accept a single value:
```jsx
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: 10 };
  }

  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    );
  }
}
```

To format labels:
```jsx
<InputRange
  formatLabel={value => `${value}cm`}
  value={this.state.value}
  onChange={value => this.setState({ value })} />
```

To specify the amount of increment/decrement
```jsx
<InputRange
  step={2}
  value={this.state.value}
  onChange={value => this.setState({ value })} />
```

## API

### InputRange#props

#### allowSameValues: boolean

Set to `true` to allow `minValue` and `maxValue` to be the same.

#### ariaLabelledby: string

Set `aria-labelledby` attribute to your component.

#### ariaControls: string

Set `aria-controls` attribute to your component.

#### classNames: InputRangeClassNames

Override the default CSS classes applied to your component and its sub-components.

#### disabled: boolean

If this property is set to true, your component is disabled. This means you'll not able to interact with it.

#### draggableTrack: boolean

If this property is set to true, you can drag the entire track.

#### formatLabel: (value: number, type: string): string

By default, value labels are displayed as plain numbers. If you want to change the display, you can do so by passing in a function. The function can return something different, i.e.: append a unit, reduce the precision of a number.

#### markers: Array of (Object shape { percentage: number, className: string, content: any })

Pass an array of markers with the `percentage` being what percentage the marker is from the beginning, left most part of the track, irrespective of the minimum or maximum values. Use the className to style the markers individually (no default style so will not be visible without it). Content supplied will be rendered as children of marker div.

#### maxValue: number

Set a maximum value for your component. You cannot drag your slider beyond this value.

#### minValue: number

Set a minimum value for your component. You cannot drag your slider under this value.

#### name: string

Set a name for your form component.

#### onChange: (value: number | Range): void

Whenever your user interacts with your component (i.e.: dragging a slider), this function gets called. Inside the function, you should assign the new value to your component.

#### onChangeStart: (value: number | Range): void

Whenever your user starts interacting with your component (i.e.: `onMouseDown`, or `onTouchStart`), this function gets called.

#### onChangeComplete: (value: number | Range): void

Every mouse / touch event can trigger multiple updates, therefore causing `onChange` callback to fire multiple times. On the other hand, `onChangeComplete` callback only gets called when the user stops dragging.

#### setTrackLengths: bool

Use this to indicate you will be providing values for a specific set value for the 'active' track to be extended over the track. This is used, in our project at least, to color the slider to designate two seperate areas of spread over the track. The active track can then be styled in opposition to the inactive, or background track.

#### setTrackValueEnd: number | string

This is the percentage for the set track length (see immediately above) to extend in relation to the background/inactive track.

#### step: number

The default increment/decrement of your component is 1. You can change that by setting a different number to this property.

### styles: object

Provide style for main track (.track), active track (.active), or label (.label).

#### value: number | Range

Set the current value for your component. If only a single number is provided, only a single slider will get rendered. If a range object (min/max) is provided, two sliders will get rendered

### Types

#### InputRangeClassNames
* activeTrack: string
* disabledInputRange: string
* inputRange: string
* labelContainer: string
* maxLabel: string
* minLabel: string
* slider: string
* sliderContainer: string
* track: string
* valueLabel: string

#### Range
* max: number
* min: number

## Development

If you want to work on this project locally, you need to grab all of its dependencies, for which 
we recommend using [yarn]. You can find the instructions to setup yarn [here](https://yarnpkg.com/docs/install).
```
yarn install
```

After that, you should be able run to preview
```
yarn dev
```

To test
```
yarn test
```

Contributions are welcome. :)

[yarn]: https://yarnpkg.com/
