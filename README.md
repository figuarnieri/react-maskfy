# Maskfy (2.0.0) - Input Mask Simple
A React library without a dependency... Very simple to install and use. With only 1kb (gzip) code, IE Compatibility, it's also well accepted on mobile devices
## Install / Usage
Install npm Maskfy
```node
npm i react-maskfy
```
### Import Component
```javascript
import Maskfy from 'react-maskfy';
```
### Usage Component
```javascript
<Maskfy mask={'(99) 9999-99999'}>
  <input id="Phone" name="Phone" />
</Maskfy>
```
or
```javascript
<Maskfy mask={'(99) 9999-99999'}>
  <TextField id="Phone" label="Phone" />
</Maskfy>
```
## Component (props)
```javascript
<Maskfy mask={'999.999.999,99'} reverse={true} minSize={3} defaultValue={'123'} letters={false} after={handleEvent}>
  <input id="Money" name="Money" />
</Maskfy>
```
### mask
{String: undefined} **__(required)__ selector input**
### reverse
{Boolean: false} **reverse typing**
### minSize
{Number: undefined} **minimum digits**
### defaultValue
{String: undefined} **initial value**
### letters
{Boolean: false} **allowed letters**
### after
{Function: undefined} **after input event**

## Source
[Github](https://github.com/figuarnieri/maskfy) | [Vanilla npm](https://www.npmjs.com/package/maskfy) | [Example](https://figuarnieri.github.io/react-maskfy/) | [@figuarnieri](https://twitter.com/figuarnieri)
## License
The MIT License
Copyright 2018 © [Filipe Guarnieri](https://figuarnieri.github.io/)