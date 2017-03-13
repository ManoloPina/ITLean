import React, { Component } from 'react';
import Helper from '../Helper';
import { 
  AppRegistry, Text,
  View,TextInput, 
  Button, Alert,ListView, StyleSheet
} from 'react-native';


export default class ResultComponent extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {};
    this.state.dataSource = ds.cloneWithRows([]);
  }

  static navigationOptions = {
    title: 'Resultado'
  }

  componentDidMount() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.getData().then(responseJson => {
      this.setState({dataSource: ds.cloneWithRows(responseJson[0].hour)});
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text style={styles.title}>{params.city}</Text>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={
          (rowData, sectionID, rowID) => 
          <Text>{Helper.toHours(rowData.time)+"  "+rowData.temp_c+" graus"}</Text>
          }
        />
      </View>
    );    
  }

  getData() {
    const {params} = this.props.navigation.state;
    return new Promise((resolve, reject) => {
      fetch(`https://api.apixu.com/v1/forecast.json?key=aaa4974b42534ce2a7845302171303&q=${params.city}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson.forecast.forecastday);
      });
    });
  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#000',
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5
  }
});

AppRegistry.registerComponent('ResultComponent', () => ResultComponent);

