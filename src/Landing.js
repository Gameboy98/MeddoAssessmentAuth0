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

const params = {
  "domain": "dev-g38mwg50.us.auth0.com",
  "clientId": "rAUPgPprgburG37zVMxIHZCKkTFBXNQN",
}

export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password:'',
        credentials:null,
    };
  }

  CheckTextInput = () => {
    if (this.state.email == '' || this.state.password == '') {
        alert('Please Enter Fields');
      } else {
        this.signin(this.state.email, this.state.password);
      }
  };

  async signin(email, password){
    const bodyParams = {
      client_id: params.clientId,
      grant_type: 'password',
      username: email,
      password: password,
    };
    const response = await fetch(`https://dev-g38mwg50.us.auth0.com/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(bodyParams)
    });
    const data = await response.json();
    if(data.access_token){
       this.setState({ token: data.access_token });
       this.storeData(data.access_token);
       this.props.navigation.navigate("Profile");
     }else {
        alert("Wrong Credentials");
     }
  }

  async storeData(response) {
    try {
       await AsyncStorage.setItem("token",response);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  render() {
    let log = this.state.token === null ? false : true;
    return (
      <View style={styles.container}>
        <TextInput placeholder="Enter Email" style={styles.textInput} onChangeText={(text) => this.setState({email: text}) }/>
        <TextInput placeholder="Enter Password" secureTextEntry style={styles.textInput} onChangeText={(text) => this.setState({password: text}) }/>
        <TouchableOpacity
          onPress={this.CheckTextInput}
          style={styles.button}>
          <Text style={styles.text}>LogIn</Text>
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
  textInput: {
    width: "80%",
    height: 50,
    color: "#ffc313",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 0.5,
    alignSelf: "center",
    textAlign:"center",
    marginTop:30,
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