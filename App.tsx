import React from 'react';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Components
import DropdownSelect from './components/DropdownSelect';
import HorizontalRule from './components/HorizontalRule';


function App(): JSX.Element {

  const [translation, setTranslation] = useState<Translation | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  interface Translation {
    Translation: string;
  }

  interface MessageRequest {
    Message: string;
  }

  const handleInput = (text: string) => {
    setInputValue(text);
  };

  const handlePost = async (message: string) => {
    const messageRequest: MessageRequest = {
      Message: `Translate this text to ${selectedValue}. (Translation ONLY): ${message}`
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageRequest),
      credentials: 'include'
    };

    fetch('http://10.0.2.2:5054/Message', requestOptions)
      .then(response => response.json())
      .then((data) => {
        if (data) {
          console.log("API response:", data);
          setTranslation({ Translation: data.response });
          console.log("Translation state:", translation);

        } else {
          console.log("Null response from API.");
          setTranslation(null);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">

        <View style={styles.pageContainer}>

          <Text style={styles.pageTitle}>Language Translator</Text>

          <HorizontalRule />

          <View>
            <Text style={{ color: 'black', padding: 5 }}>Select a language:</Text>

            <DropdownSelect onValueChange={handleValueChange} />
          </View>

          <HorizontalRule />

          <View>
            <Text style={{ color: 'black', padding: 5 }}>Your English Text:</Text>

            <TextInput
              onChangeText={(text) => handleInput(text)}
              value={inputValue}
              placeholder="Enter text to translate"
              placeholderTextColor="gray"
            />
          </View>

          <HorizontalRule />


          <View>
            <Text>Translation:</Text>
            <Text>{translation?.Translation}</Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Button
              title="Translate"
              onPress={() => inputValue && handlePost(inputValue)}
            />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    margin: 20,
    backgroundColor: 'white'
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 10
  }
});

export default App;