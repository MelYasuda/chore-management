<script src="http://localhost:8097"></script>

import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  SectionList
} from "react-native";
import { WebBrowser } from "expo";
import { Header } from 'react-native-elements';

class SectionListItem extends React.Component {
  render() {
    return(
      <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'rgb(98, 197, 184)'
            }}>
            <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'rgb(173, 252, 250)',
                    marginLeft: 20,
                    marginRight: 10,

                }}>{this.props.item.desc}
            </Text>
            <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'rgb(173, 252, 250)',
                    marginLeft: 20,
                    marginRight: 10,

                }}>{this.props.item.assignedName}
            </Text>
      </View>
    )
  }
}

class SectionHeader extends React.Component {

  render() {
      return (
          <View style={{
              flex: 1,
              backgroundColor: 'rgb(77,120, 140)',
          }}>
              <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 20
              }}>{this.props.section.title}
              </Text>
          </View>
      );
  }
}

export default class Chores extends React.Component {
    choreList = [
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
    ]

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
      <Header
              centerComponent={{ text: "Chores", style: { color: "#fff" } }}
            />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
            <SectionList
            renderItem={({ item, index }) => {
              return (<SectionListItem item={item} index={index}>

                </SectionListItem>);
            }}
            renderSectionHeader={({ section }) => {
                        return (<SectionHeader section={section} />);
                    }}
            sections={this.choreList}
            keyExtractor={(item, index) => item.name}
            >
            </SectionList>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});