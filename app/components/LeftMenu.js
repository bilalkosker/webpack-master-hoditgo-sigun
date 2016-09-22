import React from 'react';
import auth from '../auth'
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);

import AppDispatcher from '../dispatchers/AppDispatcher' 


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
     leftNavOpen: this.props.open,
     docked: this.props.docked
    }
  }, 

  _handle_onTouchTap_NavigationToggle( ){ 
    this._handle_onRequestChange( ! this.state.leftNavOpen );
  },

  _handle_onTouchTap_Close( ){ 
    this._handle_onRequestChange( false );
  },

  _handle_onRequestChange ( open )
  { 
    this.setState( {
      leftNavOpen: open,
    } );
  },

  componentDidMount () {
    var that = this;
      /*AppDispatcher.register(function(payload) {  
         if (payload.actionType === 'openAuthLogin' || payload.actionType === 'openAuthUser') {  
             that._handle_onTouchTap_Close();  
         }		   
      });*/ 
  },

  _handle_onRequestChangeList ( event, value ) 
  {
    this.context.router.push( value );
   // this._handle_onTouchTap_NavigationToggle( );
  },
  render() { 
	// TODO Temporary example how to modify the menu depending on whether the user has logged in or not.
    // Later integrate with example of requesting login and
    // https://github.com/codefoundries/isomorphic-material-relay-starter-kit/issues/36
    let systemMenuContents = [
      <ListItem primaryText="Home" value="/" />,
    ];
    
    if(!this.props.IsAnonymous){
       if(this.props.isUser){ 
          systemMenuContents.push( <ListItem primaryText="User Profile" value="/User" /> );    
        } else{  
            systemMenuContents.push( <ListItem primaryText="Interviewer Profile" value="/Interviewer" /> ); 
            systemMenuContents.push( <ListItem primaryText="Interviews" value="/Interviewer/interviews" /> ); 
        }  
    }  
    //console.log(this.props.searchMenu);
    return ( 
        <LeftNav 
          open={ this.state.leftNavOpen }
          style={{ marginTop: 56 ,height: 'calc(100% - 56px)'}}
          docked= {true}
          onRequestChange={ this._handle_onRequestChange }
        >          <SelectableList
            valueLink={ { value: location.pathname, requestChange: this._handle_onRequestChangeList } }
          >
            <ListItem
              primaryText="Menu"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={ systemMenuContents }
            />
                    </SelectableList>
            {this.props.searchMenu} 
	</LeftNav>
    )
  }
})

 