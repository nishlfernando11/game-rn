import { useEffect, useState } from "react";
import { useWindowDimensions, View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNum, onGameOver }) => {
    const initGuess = generateRandomBetween(1, 100, userNum);
    const [curGuess, setCurrGuess] = useState(initGuess);
    const [guessRounds, setGuessRounds] = useState([]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (curGuess === userNum) {
            onGameOver(guessRounds.length);
        }

    }, [curGuess, userNum, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])
    const nextGuessHandler = (direction) => {
        let nextGuess;
        if ((direction === 'lower' && curGuess < userNum) || direction === 'higher' && curGuess > userNum) {
            Alert.alert("Don't lie!", "Wrong direction was given..", [{ text: 'Sorry', style: 'cancel' }])
            return;
        } else if (direction === 'lower') {
            maxBoundary = curGuess;
        } else {
            minBoundary = curGuess + 1;
        }
        nextGuess = generateRandomBetween(minBoundary, maxBoundary, curGuess);

        setCurrGuess(nextGuess);
        setGuessRounds(round => [nextGuess, ...round])
    };

    const guessRoundsListLength = guessRounds.length;

    let content = (<>
        <NumberContainer>{curGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
            <View style={styles.btnsContainer}>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>);

    if (width > 500) {
        content = (<>
            <View style={styles.btnsContainerWide}>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                <NumberContainer>{curGuess}</NumberContainer>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>)
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
                    keyExtractor={item => item} />
            </View>
        </View>
    )

}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 28,
        alignItems: 'center'
    },
    btnsContainer: {
        flexDirection: 'row'
    },
    btnsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16
    }

});