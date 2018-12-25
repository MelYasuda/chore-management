import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Create from './Create.js';
import Icon from 'react-native-vector-icons/Ionicons';

class Chores extends React.Component {
  state = {
    activeSections: [],
  };

  _renderHeader = (section, index) => {
    return (
      <View
        style={{
          backgroundColor: "rgb(77,120, 140)",
          flex: 1, flexDirection: 'row'
        }}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", margin: 20 }}>
          {section.title}
        </Text>
        <Icon style={{ color: '#fff', marginTop: 12, right: 20, position: "absolute",  }} name={ this.state.activeSections[0] === index ? "ios-arrow-down" : "ios-arrow-up" } size={30}/>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "rgb(98, 197, 184)"
        }}
      >
        <FlatList
          data={section.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
              <Text
              onPress={() => this.props.navigation.navigate('Details', {
                itemId: index,
                categoryId: item.categoryId
              })}
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "rgb(173, 252, 250)",
                  marginLeft: 20,
                  marginRight: 10,
                  paddingBottom: 10,
                  paddingTop: 10
                }}
              >
                {item.desc} {item.assignedName}
              </Text>
          )}
        />
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <Accordion
            sections={this.props.chores}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(77,120, 140)",
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    chores: state.chores.choreList,
  };
};

const TabNavigator = createMaterialBottomTabNavigator({
  Chores: { screen: connect(mapStateToProps)(Chores),
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(
        <Icon name="ios-list" color={tintColor} size={30}/>
      )},
    },
  Create: { screen: Create,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(
        <Icon name="md-add" color={tintColor} size={30}/>
      )} },
},
{
  initialRouteName: "Chores",
  barStyle: { backgroundColor: '#4f63d6' },
  labeled: false
}
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  const headerTitle = routeName;
  const headerStyle = {
    backgroundColor: '#4f63d6',
  }
  const headerTintColor = '#fff'
  const headerTitleStyle = {
    fontWeight: 'bold',
    fontSize: 25,
  }

  return {
    headerTitle,
    headerStyle,
    headerTintColor,
    headerTitleStyle
  };
};

export default TabNavigator;