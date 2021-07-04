import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      axios.get('https://mobile-server-ii.herokuapp.com/users', {
       headers: {
         authorization: token,
       }
      }).then((response) => {
        console.log(response);
        this.setState({
          users: response.data
        });
      });
    });
    console.log(this.state);
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Welcome to Content!</Text>
        </View>
        <View>
          <FlatList
            data={this.state.users}
            renderItem={({ item }) => {
              return <Text>{item.email}</Text>;
            }}
            keyExtractor={item => item.email}  />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});