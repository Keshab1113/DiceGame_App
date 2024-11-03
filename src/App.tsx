import React, { PropsWithChildren, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View, Modal, TextInput, Alert } from 'react-native';
import DiceOne from '../assets/One.png';
import DiceTwo from '../assets/Two.png';
import DiceThree from '../assets/Three.png';
import DiceFour from '../assets/Four.png';
import DiceFive from '../assets/Five.png';
import DiceSix from '../assets/Six.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

const Dice = ({ imageUrl }: DiceProps) => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};

const App = () => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const [userGuess, setUserGuess] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [winMessage, setWinMessage] = useState(false);

  const handleUserInput = () => {
    const num = parseInt(inputValue);
    if (num >= 1 && num <= 6) {
      setUserGuess(num);
      setIsModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 6.');
    }
  };

  const rollDiceTap = () => {
    if (userGuess === null) {
      setIsModalVisible(true);
      return;
    }

    let randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        break;
      case 2:
        setDiceImage(DiceTwo);
        break;
      case 3:
        setDiceImage(DiceThree);
        break;
      case 4:
        setDiceImage(DiceFour);
        break;
      case 5:
        setDiceImage(DiceFive);
        break;
      case 6:
        setDiceImage(DiceSix);
        break;
      default:
        setDiceImage(DiceOne);
        break;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (randomNumber === userGuess) {
      setWinMessage(true);
      setAttempts(0);
      setUserGuess(null);
      setInputValue('');
      setIsModalVisible(true);
    } else if (newAttempts >= 5) {
      setAttempts(0);
      setUserGuess(null);
      setInputValue('');
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {winMessage && (
              <Text style={styles.winMessage}>Congratulations! You guessed correctly!</Text>
            )}
            <Text style={styles.modalTitle}>Enter your Guess</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="1-6"
            />
            <Pressable onPress={handleUserInput} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.instruction}>Roll the dice and try your luck!</Text>
      {userGuess !== null && (
        <Text style={styles.guessText}>Your Guess: {userGuess}</Text>
      )}
      <Dice imageUrl={diceImage} />
      <Pressable onPress={rollDiceTap} style={styles.rollButton}>
        <Text style={styles.rollButtonText}>Roll the Dice</Text>
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  instruction: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  guessText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#4C51BF',
    borderRadius: 8,
  },
  rollButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  winMessage: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#4C51BF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
