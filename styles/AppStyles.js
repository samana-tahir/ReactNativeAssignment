import { StyleSheet, Dimensions } from 'react-native';

// Theme color set all about code color
const themeColor = '#008080'
//  stylesheet for design ui

const {width, height} = Dimensions.get('window')


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F6F8',
    },
    startButtonView: {
        flexDirection: 'row',
        paddingHorizontal: width*0.024,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    startText: {
        color: themeColor,
        paddingVertical: height*0.012,
        fontSize: height*0.037
    },
    starttextColor: {
        color: 'white'
    },
    face: {
        flex: 1,
        backgroundColor: themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    back: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
    },
    faceText: {
        color: 'white',
        fontSize: height*0.03,
        fontWeight: 'bold'
    },
    backText: {
        fontSize: height*0.03,
        fontWeight: 'bold'
    },
    gameCardView: {
        width: '100%',
        height: height*0.80,
        flexDirection: 'row',
        flexWrap: "wrap",
        marginHorizontal: width*0.015,
        justifyContent: 'center'
    },
    flipCardView: {
        margin: width*0.011,
        width: width*0.30,
        height: height*0.202,
        borderRadius: 10,
    },
    flipCard: {
        width: width*0.30,
        height: height*0.20,
        backgroundColor: themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    flipCardBack: {
        backgroundColor: 'white',
        width: width*0.30,
        height: height*0.20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor:'black'
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});
