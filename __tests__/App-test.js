/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {create, renderer, act} from 'react-test-renderer';

let itemArr = [
  {item: 85, index: 9},
  {item: 86, index: 11},
];
let flipIndexArr = [1, 6, 5, 10, 7, 2, 4, 3, 0, 8];
const CARD_PAIRS_VALUE = 6;
let winnerCount = 5;
const tree = create(<App />);

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
describe('flopFunction', () => {
  test('should flop with different cards and cards will be flip backside', () => {
    const flopfunction = (val1, val2) => {
      var flipIndexArr1 = val2.filter(item => item !== val1[0].index);
      var flipIndexArr2 = flipIndexArr1.filter(item => item !== val1[1].index);
      _flipIndexArray = flipIndexArr2;
      if (val1[0].item != val1[1].item) {
        return true;
      }
    };
    expect(flopfunction(itemArr, flipIndexArr)).toEqual(true);
    //result should be your functionality return value
  });

  test('should flop with same card and card will be resolved', () => {
    const flopfunction = (val1, val2) => {
      var flipIndexArr1 = val2.filter(item => item !== val1[0].index);
      var flipIndexArr2 = flipIndexArr1.filter(item => item !== val1[1].index);
      _flipIndexArray = flipIndexArr2;
      if (val1[0].item === val1[1].item) {
        // flop two cards with same number
        val2.push(val1[0].index), val2.push(val1[1].index);
        return true;
      }
    };
    expect(flopfunction(itemArr, flipIndexArr)).toEqual(true);
  });

  test('should all flops resolved', () => {
    const flopfunction = (val1, val2) => {
      var flipIndexArr1 = val2.filter(item => item !== val1[0].index);
      var flipIndexArr2 = flipIndexArr1.filter(item => item !== val1[1].index);
      _flipIndexArray = flipIndexArr2;
      val2.push(val1[0].index), val2.push(val1[1].index);
      winnerCount = winnerCount + 1;
      if (winnerCount === CARD_PAIRS_VALUE) {
        return true;
      }
    };
    expect(flopfunction(itemArr, flipIndexArr)).toEqual(true);
  });

  test('reset value', () => {
    const flopfunction = (val1, val2) => {
      val2 = [];
      winnerCount = 0;
      val1 = [];
      return true;
    };
    expect(flopfunction(itemArr, flipIndexArr)).toEqual(true);
  });
});
