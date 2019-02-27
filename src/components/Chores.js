import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Create from './CreateNew/CreateForm.js';
import User from './User.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Chore from './Chore';
import { NavigationEvents, StackActions, NavigationActions } from "react-navigation";
import FirebaseConfig from '../../constants/FirebaseConfig.js';
import * as firebase from 'firebase';

firebase.initializeApp(FirebaseConfig);

class Chores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      renderFlatlist: false,
      chores: null
    };
    this._handleRenderFlatlist=this._handleRenderFlatlist.bind(this);
  }

  componentDidMount(){
    let dataArray;
  
    const getUsersChores = (choreListId) => {
      return new Promise (
        function (resolve, reject) {
          firebase.database().ref(`choreLists/${choreListId}/chores/`).on('value', function (snapshot) {
              const value = snapshot.val();
              let valuesArray;
              if(value){
                const keyArray = Object.keys(value);
                      valuesArray = Object.values(value);
                for(i = 0; i < keyArray.length; i++){
                  valuesArray[i].id = keyArray[i]
                 }
              }
              dataArray = valuesArray;   
              resolve(dataArray);
        });
        }
      )
    }
  
    const dispatchStoresChores = (dataArray) => {
      return new Promise ((resolve, reject) => {
        if(dataArray){
          const { dispatch } = this.props;
          const action = {
            type: 'STORED_CHORES',
            dataArray: dataArray
          }
          dispatch(action)
          resolve()
        }
      })
    }

    const setStateChores = () => {
      this.setState({chores: this.props.chores})
    }
  
    this.getUsersChoreListId().then(getUsersChores).then(dispatchStoresChores).then(setStateChores)
  
    console.log('didmount')
    
  }

  getUsersChoreListId = () => {
    return new Promise ((resolve, reject) => {
      const currentUid = firebase.auth().currentUser.uid;
      firebase.database().ref(`users/${currentUid}/`).child('choreLists').on('value', snapshot => {
        const choreListId = snapshot.val();
        console.log(choreListId)
        resolve(choreListId)
      })
    })
  }

_handleRenderFlatlist = () => {
  if(!this.renderFlatlist){
    this.setState({renderFlatlist: true})
  } else {
    this.setState({renderFlatlist: false})
  }
}

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

  showEmptyListView = () => {
    return(
      <View>
        <Text>
          You don't have assigned chores yet
        </Text>
      </View>
    );
  }

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
          extraData={this.state}
          data={section.data}
          keyExtractor={(item, index) => Math.random().toString()}
          ListEmptyComponent={this.showEmptyListView()}
          renderItem={({ item, index }) => (
              <Chore
              toDetail={() =>
              this.props.navigation.navigate('Details', {
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
                getUsersChoreListId={this.getUsersChoreListId}
                item={item.desc}
                id={item.id}
                categoryId={item.categoryId}
                assignedName= {item.assignedName}
                index={index} 
                rerenderFlatlist={this.props.rerenderFlatlist}
                _handleRenderFlatlist={this._handleRenderFlatlist}
                >
              </Chore>
          )}
        />
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    if(!this.state.chores) return <Text>loading</Text>
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            let categoryIdAddedTo = this.props.navigation.getParam('categoryIdAddedTo');
            if(categoryIdAddedTo || categoryIdAddedTo === 0){
              this.setState({activeSections:[categoryIdAddedTo]})
            }}
          }
          onDidBlur={()=>{
            this.props.navigation.setParams({
              categoryIdAddedTo: false
            })
          }}
        />
        <ScrollView style={{flex: 1}}>
          <Accordion
            sections={this.state.chores}
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
  User: { screen: User,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(
        <Icon name="md-person" color={tintColor} size={30}/>
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