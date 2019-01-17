React = require('react');

/**
 * @author: figuarnieri
 * @copyright: The MIT License
 * @name Maskfy
 * @description: A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, it's also well accepted on mobile devices
 * @since: 2018
 * @version: 2.0.5
 */
"use strict";

class Maskfy extends React.Component{
  /**
   * @param {String || Object} Selector String
   * @return {String || Object}
   */
  constructor(props){
    super(props);
    this.state = {
      mask: this.props.mask, // {String} Input mask
      reverse: this.props.reverse, // {Boolean} Content insert invert (like coins)
      minSize: this.props.minSize, // {Number} Minimum number of characters
      defaultValue: this.props.defaultValue, // {String} Initial value
      letters: this.props.letters, // {Boolean} Allowed alpha characters
      after: this.props.after, // {Function} Function after insert new input value
    }
  }
  componentDidMount(){
    const _tag = this._reactInternalFiber.child.stateNode;
    const _input = _tag.tagName==='INPUT' ? _tag : _tag._reactInternalFiber.child.stateNode.querySelector('input');
    if(!_input){
      return console.error(new Error('Maskfy: Insert tag selector required. Ex.: Maskfy({tag: "[data-maskfy]"})'))
    } else {
      this.tag = _input;
      this.init();
    };
  }
  
  /**
   * function to execute foreach of objectTag
   * @param {String} input
   * @return {String}
   */
  init(){
    this.tag.addEventListener('input', e => this.format(e));
    const _value = this.tag.value.trim();
    if(this.state.defaultValue || _value!==''){
      this.tag.value = this.tag.value || this.state.defaultValue || this.tag.dataset.maskfyValue;
    }
    this.event(this.tag);
  }
  
  /**
   * dispatchEvent Input
   * @param {String} input
   * @return {String}
   */
  event(tag){
    if(window.navigator.msPointerEnabled){
      const event = document.createEvent("Event");
      event.initEvent("input", false, true);
      tag.dispatchEvent(event);
    } else {
      tag.dispatchEvent(new Event('input'));
    }
  }
  
  /**
   * Event Input
   * @param {String} input
   * @return {String}
   */
  format(e){
    const _value = e.target.value;
    const _mask = this.state.mask || e.target.dataset.maskfy;
    const _reverse = this.state.reverse || e.target.dataset.maskfyReverse==='true';
    const _letters = this.state.letters || e.target.dataset.maskfyLetters==='true';
    let _valueFormat;
    if(!_mask) return true;
    if(_mask.length>=_value.length){
      _valueFormat = _value.replace((_letters ? /\W/g : /\D/g), '').split('');
    } else {
      _valueFormat = _value.split('');
      _valueFormat.pop();
      if(e.target.selectionEnd!==_value.length){
        setTimeout(() => this.event(e.target), 10);
      }
    }
    if(/^\W+/.test(_mask) && _mask.length>=_value.length){
      _valueFormat.unshift(/^\W+/.exec(_mask)[0]);
    }
    if(_reverse){
      const _minSize = this.state.minSize || Number(e.target.dataset.maskfyMinsize);
      const _maskReverse = _mask.split('');
      const _valueReverse = _valueFormat.concat('');
      _maskReverse.reverse();
      _valueReverse.reverse().shift();
      if(_minSize && _valueFormat.length<_minSize){
        _valueReverse.push('0');
      } else {
        if(_valueReverse[_valueReverse.length-1]==='0'){
          if(/\d/.test(_value[_value.length-1])){
            _valueReverse.pop();
          }
        }
      }
      for(let i=0; i<_valueReverse.length; i++){
        if(/\W/.test(_maskReverse[i])){
          _valueReverse.splice(i, 0, _maskReverse[i]);
        }
      }
      if(_maskReverse.length>=_valueReverse.length){
        _valueFormat = _valueReverse.reverse();
      }
    } else {
      for(let i=0; _mask.length>i && _mask.length>=_value.length; i++){
        if(isNaN(parseInt(_mask[i])) && _valueFormat[i-1]){
          _valueFormat.splice(i, 0, _mask[i])
        }
      }
    }
    _valueFormat.splice(_mask.length, _valueFormat.length);
    e.target.value = _valueFormat.join('').replace(/(\W+)$/, '');
    setTimeout(() => {
      if(!e.target.classList.contains('maskfy--active')){
        e.target.classList.add('maskfy--active');
        this.event(e.target);
      }
      if(this.state.after){
        this.formatAfter(e.target);
      }
    }, 10);
  }

  /**
   * Event After Insert Value
   * @param {String} input
   * @return {String}
   */
  formatAfter(tag){
    this.state.after(tag, this);
  }
  render(){
    return this.props.children;
  }
}

module.exports = Maskfy;
