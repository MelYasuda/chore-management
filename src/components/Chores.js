import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { Header } from "react-native-elements";
import { connect } from "react-redux";

class Chores extends React.Component {
  static navigationOptions = {
    title: 'Chores',
    headerStyle: {
      backgroundColor: '#4f63d6',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25
    }
  };

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


export default connect(mapStateToProps)(Chores);