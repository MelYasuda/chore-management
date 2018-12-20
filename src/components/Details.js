import React from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";

class Details extends React.Component {
  static navigationOptions = 
  
  
  // ({ navigation } = this.props ) => {
  //   const itemId = navigation.getParam('itemId', 'NO-ID');
  //   const categoryId = navigation.getParam('categoryId', 'NO-ID');
  //   return {
  //     title: this.props.chores.chores[categoryId].data[itemId].desc
  //   }
   { title: 'Chore Detail',
    headerStyle: {
      backgroundColor: '#4f63d6',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25
    }
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