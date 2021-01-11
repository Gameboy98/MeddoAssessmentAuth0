import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  AsyncStorage,Alert,
  ImageBackground,
  ScrollView,
  Button
} from "react-native";


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials:null,
      token:null,
    };
  }

  async componentDidMount() {
    let response =  await AsyncStorage.getItem("token");
    this.setState({token:response});
    this.userinfo();
  }

  async userinfo(){
    const response = await fetch(`https://${params.domain}/oauth/token`, {
      method: 'GET',
      headers: {
        'Authorization': this.state.token,
      }
    });
    const data = await response.json();
     this.setState({ credentials: data });
  }


  signout(){
    this.setState({ credentials: null });
    this.storeData();
    this.props.navigation.navigate("Landing");
  }

  async storeData() {
    try {
       await AsyncStorage.setItem("credentials",null);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.credentials}</Text>
        <TouchableOpacity
          onPress={this.signout}
          style={styles.button}>
          <Text style={styles.text}>LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",    
  },
  button: {
    backgroundColor:'#ffc313',
    borderRadius:10,
    borderWidth: 0.5,
    borderColor: '#fff',
    width:"80%",
    alignSelf:"center",
    marginTop:30,
    height:50,
    textAlign:"center",
    justifyContent:"center",
    marginBottom:30
  },
  text: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 16,
  },
});