/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text,
  View, TextInput, Button, Alert

} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ResultComponent from './app/components/ResultComponent';

export default class Init extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.cityText = '';
    this.state.btnTitle = 'Verificar temperatura';
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder='Digite o nome da cidade...'
          onChangeText={(text) => this.setState({ cityText: text })}
          value={this.state.cityText}
        />
        <Button
          title={this.state.btnTitle}
          onPress={() => this.changeScreen()}
        />
      </View>
    );
  }

  changeScreen() {
    const { navigate } = this.props.navigation;
    if (this.state.cityText != '') {
      navigate('Result', { city: this.state.cityText });
    } else {
      Alert.alert('Alerta', 'Você deve preencher o campo com uma cidade.');
    }
  }

  static navigationOptions = {
    title: 'Clima Tempo',
  };

}

const ITLean = StackNavigator({
  Home: {screen: Init},
  Result: {screen: ResultComponent}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 45
  }
});

AppRegistry.registerComponent('ITLean', () => ITLean);
