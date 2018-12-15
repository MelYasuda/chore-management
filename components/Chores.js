import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
 
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
    ],
  },
  {
    title: "Monday", 
    data: [
      {
        desc: "Cook Dinner",
        assignedName: "Meguru",
        priority: "High",
        note: "Make it yummy"
      }
    ],
  },
  {
    title: "Tuesday", 
    data: [
      {
        desc: "Clean",
        assignedName: "Meguru",
        priority: "High",
        note: "Do it"
      }
    ],
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
    ],
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
    ],
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
    ],
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
    ],
  },
]
 
export default class Chores extends React.Component {
  state = {
    activeSections: []
  };
  
  _renderHeader = section => {
    return (
      <View >
        <Text>{section.title}</Text>
      </View>
    );
  };
 
  _renderContent = section => {
    return (
      <View >
        <FlatList data={section.data} renderItem={({item}) => <Text>{item.desc} {item.assignedName}</Text>} />
      </View>
    );
  };
 
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
 
  render() {
    return (
      <View style={styles.container}>
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
    margin: 100,
    flex: 1
  }
});