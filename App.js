/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { Text, View, Animated, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles/AppStyles'
const CARD_PAIRS_VALUE = 6  // no of pairs


export default class App extends Component {
  constructor() {
    super()
    this.animatedValue = []
    this.frontInterpolate = []
    this.backInterpolate = []
    this.frontOpacity = []
    this.backOpacity = []
    this.value = []
    
    this.valueArr = []
      // item selction array
    this.itemArr = []
      // winner count index variable.
     this.winnerCount = 0
      // flipped card store in this array
      this.flipIndexArr = []
    this.state = {
      steps: 0
    }
  }
    componentDidMount() {
        // generate pairs of numbers(from 1 to 100) and assign to different cards with random order when app launchApp Launch
      for (i = 0; i < CARD_PAIRS_VALUE; i++) {
      var randomNumber = Math.floor(Math.random() * 100) + 1;
      if (!this.valueArr.includes(randomNumber)) {
        this.valueArr.push(randomNumber)
        this.valueArr.push(randomNumber)
      }
    }
   // alert('value arr'+ JSON.stringify(this.valueArr))
    this.valueArr = this.shuffleArray(this.valueArr)
    this.valueArr.map((item, index) => {
      this.animatedValue[index] = new Animated.Value(0);
      this.value[index] = 0;

      this.animatedValue[index].addListener(({ value }) => {
        this.value[index] = value;
      })
      this.frontInterpolate[index] = this.animatedValue[index].interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      })
      this.backInterpolate[index] = this.animatedValue[index].interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      })
      this.frontOpacity[index] = this.animatedValue[index].interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0]
      })
      this.backOpacity[index] = this.animatedValue[index].interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1]
      })
    })
        
        this.setState({ steps: 0 })
  }

  // Array suffle from next game or restart game
  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

// Flipcard animation and logic for winner amd match card.
  flipCard(item, index) {
    if (!this.flipIndexArr.includes(index)) {
      if (this.itemArr.length < 2) {
        Animated.spring(this.animatedValue[index], {
          toValue: 180,
          friction: 8,
          tension: 10,
        useNativeDriver: true
        }).start();
        // this['card' + index].flip()
        this.setState({ steps: this.state.steps + 1 })
        let obj = { item: item, index: index }
        this.itemArr.push(obj)
        this.flipIndexArr.push(index)
      }

      //Check both card are same or not
      if (this.itemArr.length == 2) {
          this.onCheckCardMatchOrNot()

      }
    }


  }
  // this function check both card same or not.
  onCheckCardMatchOrNot() {
    var flipIndexArr1 = this.flipIndexArr.filter(item => item !== this.itemArr[0].index)
    var flipIndexArr2 = flipIndexArr1.filter(item => item !== this.itemArr[1].index)
    this.flipIndexArr = flipIndexArr2
    if (this.itemArr[0].item != this.itemArr[1].item) {  //flop two cards with different number
        let tempArr  = this.itemArr
        // these 2 cards will flip to back side after 1 second
        setTimeout(() => {
        this.flipBackSideCardAnimation(tempArr)
        }, 1000)
                        
    } else {  // flop two cards with same number
      this.flipIndexArr.push(this.itemArr[0].index),
        this.flipIndexArr.push(this.itemArr[1].index)
      this.winnerCount = this.winnerCount + 1
      if (this.winnerCount === CARD_PAIRS_VALUE) {
        this.onShowAlert()
      }
        
    }
      this.itemArr = []
  }
    
    flipBackSideCardAnimation(itemArr){
        Animated.spring(this.animatedValue[itemArr[0].index], {
          toValue: 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start();
        Animated.spring(this.animatedValue[itemArr[1].index], {
          toValue: 0,
          friction: 8,
          tension: 10,
         useNativeDriver: true
        }).start();
        
        //this.itemArr = []
    }

  // Alert when all card are open.
  onShowAlert() {
    Alert.alert(
      "Congratulation!! You won.",
       "You win this game by " + this.state.steps + " steps!",
      [
        { text: "Try another round", onPress: () => this.onRestart() }
      ],
      { cancelable: false }
    );
  }

  // Restart game when tap on restart button
  onRestart() {
    console.log('flip index', this.flipIndexArr);
    this.flipIndexArr.map((item) => {
      Animated.spring(this.animatedValue[item], {
        toValue: 0,
        friction: 8,
        tension: 10,
      useNativeDriver: true
      }).start();
    })
    this.valueArr=[]
      for (i = 0; i < CARD_PAIRS_VALUE; i++) {
      var randomNumber = Math.floor(Math.random() * 100) + 1;
      if (!this.valueArr.includes(randomNumber)) {
        this.valueArr.push(randomNumber)
        this.valueArr.push(randomNumber)
      }else{
        
        this.valueArr.push(randomNumber+1)
        this.valueArr.push(randomNumber+1)
      }
    }
    this.valueArr = this.shuffleArray(this.valueArr)
    this.flipIndexArr = []
    this.winnerCount = 0
    this.itemArr = []
    this.setState({ steps: 0 })
  }


  // Header menu design in this function.
  renderRestartAndSteps() {
    return (
      <View style={styles.startButtonView}>
        <TouchableOpacity onPress={() => this.onRestart()}>
          <Text style={styles.startText}> RESTART </Text>
        </TouchableOpacity>
        <Text style={[styles.startText]}> STEPS:<Text >{this.state.steps}</Text> </Text>
      </View>
    )
  }

  // card design in this function
  renderCards() {
    return (
      <View style={styles.gameCardView}>
        <FlatList
          data={this.valueArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.flipCardView}>

              <TouchableOpacity style={{ position: 'absolute' }} >

                <Animated.View ref={(card) => this['card' + index] = card} style={[styles.flipCard, styles.flipCardBack, {
                  opacity: this.backOpacity[index], transform: [{ rotateY: this.backInterpolate[index] }]
                }]}>
                  <Text style={styles.backText}>{item}</Text>
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.flipCard(item, index)}>
                <Animated.View ref={(card) => this['card' + index] = card} style={[styles.flipCard, {
                  opacity: this.frontOpacity[index], transform: [{ rotateY: this.frontInterpolate[index] }]
                }]}>
                  <Text style={styles.faceText}>?</Text>
                </Animated.View>
              </TouchableOpacity>


            </View>
          )}
          numColumns={3}
        />
      </View >
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        {this.renderRestartAndSteps()}
        {this.renderCards()}
      </View >
    )
  }
}
