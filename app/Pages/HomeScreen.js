
/* @flow weak */
'use strict';

import Relay from 'react-relay'; 
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';  
import CardMedia from 'material-ui/lib/card/card-media'; 
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import auth from '../auth';
import AppDispatcher from '../dispatchers/AppDispatcher';  
import AppActionCreators from '../actions/AppActionCreators'; 
import AuthStore from '../stores/AuthStore';   
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ActiveTheme from '../../mui-themes/active-theme.js';
import ThemeManager from 'material-ui/lib/styles/theme-manager'; 

import Hoverable from '../components/Hoverable';

import brace from 'brace';
import AceEditor from 'react-ace';
 

import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/lua';
import 'brace/mode/csharp';

import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';
import 'brace/ext/language_tools';


function onLoad(editor) {
  //console.log('i\'ve loaded');
}



const styles = {
    Interview: {
       paddingTop:0, 
       paddingBottom: 10,
       paddingLeft:15,
       paddingRight:15,
       marginBottom:20,
       width:320,
       float: 'left'
    }
};



var modes  = [
    {"id":0,"name":"Javascript", "api" : 'javascript'},
    {"id":1,"name":"Java", "api" :'java'},
    {"id":2,"name":"CSS", "api" :'css'},
    {"id":3,"name":"Lua", "api": 'lua'},
    {"id":4,"name":"Csharp", "api": 'csharp'}
];

var featured = [
    {"id":0, "title":"First Featured Card", "content": "Featured Card Content"},
    {"id":1, "title":"Second Featured Card", "content": "Featured Card Content"},
    {"id":2, "title":"Third Featured Card", "content": "Featured Card Content"},
     {"id":3, "title":"Fourth Featured Card", "content": "Featured Card Content"},
];

var top = [
    {"id":0, "title":"First Top Card", "content": "Top Card Content"},
    {"id":1, "title":"Second Top Card", "content": "Top Card Content"},
    {"id":2, "title":"Third Top Card", "content": "Top Card Content"},
    {"id":3, "title":"Fourth Top Card", "content": "Top Card Content"},
];




const defaultValue=
  `function onLoad(editor) {
    if (true) {
      console.log(\"i\'ve loaded\");
    }
  }`;

export default React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
      //the key passed through context must be called "muiTheme"
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(ActiveTheme),
    };
  },

    getInitialState() {
      return {
        error: false,
        loggedIn: false,
        selectedLang: 0,
        mode: modes[0].api,
        startValue : defaultValue
      }
    },
    onChange(startValue) {
        
        this.setState({startValue});
    },
 
    _onAuthChange() {  
        console.log('change listen from homescreen');
       this.setState(this.getAuthState()); 
    },

    componentWillMount () {  
      this.state.loggedIn = this.getAuthState().loggedIn;
      this.state.token = this.getAuthState().token; 
    

      document.title =  "MyApp | HomePage";
    },

    componentDidMount(){
         AuthStore.addChangeListener(this._onAuthChange); 
    },
    
    componentWillUnmount() { 
        AuthStore.removeChangeListener(this._onAuthChange);
    },
    
  
    getAuthState(){
        return {
            loggedIn: AuthStore.loggedIn,
            token : AuthStore.token
        } 
    }, 

    handleChange(event, index, selectedLang){ 
        this.setState({selectedLang});      
        this.setState({mode: modes[selectedLang].api});
    },

    send(){
       console.log(this.getChildContext());  
      alert(this.state.startValue);  
    },

    render() {
  
	if(this.state.loggedIn){
          var token = this.state.token;
            var dash;
            if (false) {
              dash =  <div>Add Interview
                        My Profile
                        My Interviews
                        History
                        Accounting
                        Requestst 
                                </div>;
            } else {
              dash =  <div>My Profile 
                    History(Rank)   
                    Upcoming(Features)
                    Development(Self)
                    </div>;
              
            } 
	} 
        return (
            <Card>
                <div className={'row'} style={{paddingTop:20, paddingLeft: 24,paddingRight: 24}}> 
                    <h3 className={"header"}>FEATURED INTERVIEWS</h3> 
            
            
                    { featured.map(function(result){
                        return  (<div key = {result.id} style= {styles.Interview}>
                                    <Hoverable >
                                       <Card style= {{ 
                                           backgroundColor: ActiveTheme.card.backgroundColor,
                                       }} >

                                           <CardHeader
                                              title="URL Avatar"
                                              subtitle="Subtitle"
                                              avatar="http://lorempixel.com/100/100/nature/"
                                            />
                                            <CardMedia
                                              overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                                            >
                                              <img src="http://lorempixel.com/600/337/nature/" />
                                            </CardMedia>
                                            <CardTitle title={result.title} subtitle="Card subtitle" />
                                            <CardText>
                                             { result.content}
                                            </CardText>
                                            <CardActions>
                                              <FlatButton label="Action1" style={{
                                                  color: ActiveTheme.card.actionColor
                                              }}/>
                                              <FlatButton label="Action2" style={{
                                                  color: ActiveTheme.card.actionColor
                                              }}/>
                                            </CardActions> 
                                       </Card> 
                                   </Hoverable> 
                                </div>)
                    })}
                </div>
                <div className={'row'} style={{paddingTop:20, paddingLeft: 24,paddingRight: 24}}> 
                    <h3 className={"header"}>TOP INTERVIEWS</h3> 
                    { top.map(function(result){
                     return  (<div key = {result.id} style= {styles.Interview}>
                              <Hoverable >
                                 <Card style= {{ 
                                     backgroundColor: ActiveTheme.card.backgroundColor,
                                 }} >
                                     
                                     <CardHeader
                                        title="URL Avatar"
                                        subtitle="Subtitle"
                                        avatar="http://lorempixel.com/100/100/nature/"
                                      />
                                      <CardMedia
                                        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                                      >
                                        <img src="http://lorempixel.com/600/337/nature/" />
                                      </CardMedia>
                                      <CardTitle title={result.title} subtitle="Card subtitle" />
                                      <CardText>
                                       { result.content}
                                      </CardText>
                                      <CardActions>
                                        <FlatButton label="Action1" />
                                        <FlatButton label="Action2" />
                                      </CardActions> 
                                 </Card>
                          </Hoverable >
                             </div>)
                     })}
                </div>
                <div className={"row"}>
                    <div className={"col-xs-6"} style={{paddingTop:10, paddingLeft: 24}}>
                        <RaisedButton label="GÖNDER" secondary={true} onTouchTap={ this.send } />
                    </div> 
                    <div className={"pull-right"} style={{paddingTop:10, paddingRight: 24}}>
                        <SelectField value={this.state.selectedLang} onChange={this.handleChange}>
                            { modes.map(function(result){
                                return  <MenuItem key={result.id} value={result.id} primaryText={result.name}/>;
                            })}
                         </SelectField>
                    </div>

                </div>
                <div className={'row'}>
                    <div className={"col-xs-12"} style={{paddingTop:20, paddingLeft: 24}}>
                        <AceEditor
                        mode={this.state.mode}
                        theme="monokai"
                         height="100px"
                        width= "100%"
                         setOptions={{
                          enableBasicAutocompletion: false,
                          enableLiveAutocompletion: false,
                          tabSize: 4,
                          fontSize: 14,  
                          showGutter: true,
                          showPrintMargin: true,
                          highlightActiveLine: true
                        }}
                        onChange={this.onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        value={this.state.startValue}
                      />
                    </div>
                </div>
            </Card>
        ) 
  }
});

 