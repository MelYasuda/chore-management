import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Create from './Create.js';

class Chores extends React.Component {

  state = {
    activeSections: []
  };

  _renderHeader = section => {
    return (
      <View
        style={{
          backgroundColor: "rgb(77,120, 140)",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
          {section.title}
        </Text>
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
            sections={this.props.chores.chores}
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
    chores: state,
  };
};

const TabNavigator = createMaterialBottomTabNavigator({
  Chores: { screen: connect(mapStateToProps)(Chores) },
  Create: { screen: Create },
},
{
  initialRouteName: "Chores",
}
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
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