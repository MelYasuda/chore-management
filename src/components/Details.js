import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";

class Details extends React.Component {
  static navigationOptions = {
    title: 'Chore Detail',
  };

  render() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const categoryId = navigation.getParam('categoryId', 'NO-ID');

    return(
      <View>
        <Text>
          {this.props.chores.chores[categoryId].data[itemId].desc}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    chores: state,
  };
};

export default connect(mapStateToProps)(Details);