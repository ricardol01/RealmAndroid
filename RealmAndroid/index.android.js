/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Realm from 'realm';
class Car {}
Car.schema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: 'int',
  }
};
class Person {}
Person.schema = {
  name: 'Person',
  properties: {
    name:    {type: 'string'},
    cars:    {type: 'list', objectType: 'Car'},
    picture: {type: 'data', optional: true}, // optional property
  }
};
export default class RealmAndroid extends Component {
  render() {
        // Get the default Realm with support for our objects
     let realm = new Realm({schema: [Car, Person]});

     // Create Realm objects and write to local storage
     realm.write(() => {
       let myCar = realm.create('Car', {
         make: 'Honda',
         model: 'Civic',
         miles: 1000,
       });
       myCar.miles += 20; // Update a property value
     });

     // Query Realm for all cars with a high mileage
     let cars = realm.objects('Car').filtered('miles > 1000');

     // Will return a Results object with our 1 car
     cars.length // => 1

     // Add another car
     realm.write(() => {
       let myCar = realm.create('Car', {
         make: 'Ford',
         model: 'Focus',
         miles: 2000,
       });
     });

   return (
     <View style={styles.container}>
       <Text style={styles.welcome}>
         Count of Dogs in Realm: {cars.length}
       </Text>
     </View>
   );
 }
}

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
});

AppRegistry.registerComponent('RealmAndroid', () => RealmAndroid);
