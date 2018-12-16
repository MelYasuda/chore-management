import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { Header } from "react-native-elements";

const SECTIONS = [
  {
    title: "Sunday",
    data: [
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet"
      },
      {
        desc: "Doing the dishes",
        assignedName: "Elton",
        priority: "Medium",
        note: "Use pods"
      }
    ]
  },
  {
    title: "Monday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      },
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet"
      },
      {
        desc: "Doing the dishes",
        assignedName: "Elton",
        priority: "Medium",
        note: "Use pods"
      }
    ]
  },
  {
    title: "Tuesday",
    data: [
      {
        desc: "Clean",
        assignedName: "Meguru",
        priority: "High",
        note: "Do it"
      },
      {
        desc: "Laundry",
        assignedName: "Meguru",
        priority: "High",
        note: "Use dry sheet"
      }
    ]
  },
  {
    title: "Wednesday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  },
  {
    title: "Thursday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  },
  {
    title: "Friday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  },
  {
    title: "Saturday",
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ]
  }
];

export default class Chores extends React.Component {
  state = {
    activeSections: []
  };

  _renderHeader = section => {
    return (
      <View
        style={{
          backgroundColor: "rgb(77,120, 140)"
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
          renderItem={({ item }) => (
            <Text
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
        <Header
          centerComponent={{
            text: "Chores",
            style: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 25,
              marginTop: 22,
              paddingBottom: 23
            }
          }}
        />
        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%"
  }
});
