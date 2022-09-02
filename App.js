import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNum, setUserNum] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(false);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  const pickedNumHandler = (num) => {
    setUserNum(num);
  }

  const gameOverHandler = (roundsCount) => {
    setGameOver(true);
    setGuessRounds(roundsCount);
  }

  const startNewGameHandler = () => {
    setUserNum(null);
    setGuessRounds(0);
    setGameOver(false);
  }

  let screen = <StartGameScreen onPickNum={pickedNumHandler} style={styles.container} />

  if (userNum) {
    screen = <GameScreen userNum={userNum} onGameOver={gameOverHandler} />
  }
  if (gameOver && userNum) {
    screen = <GameOverScreen userNum={userNum} rounds={guessRounds} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover" style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
          <SafeAreaView style={styles.rootScreen}>
            {/* Adjust space to keep content out of phone screen notch  */}
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25
  }

});
