/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import IconSocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/lib/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/lib/linear-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Popover from 'material-ui/lib/popover/popover';
import TextField from 'material-ui/lib/text-field';
import AppDispatcher from '../dispatchers/AppDispatcher';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { registerAuthenticationRequiredCallback } from '../RequiresAuthentication.js';
import auth from '../auth';
import Login from '../Pages/Login'
import { postXHR, getXHR } from '../scripts/XHR';
import scorePassword from '../scripts/scorePassword';
import AppActionCreators from '../actions/AppActionCreators'; 
import AuthStore from '../stores/AuthStore'; 
import AppConstants from '../constants/AppConstants';
import Colors from 'material-ui/lib/styles/colors';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ImageLoupe from 'material-ui/lib/svg-icons/image/loupe';
import ActionFace from 'material-ui/lib/svg-icons/action/face';
import CommunicationTextSms from 'material-ui/lib/svg-icons/communication/textsms';
import ActionHistory  from 'material-ui/lib/svg-icons/action/history';
import ActionPowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new';
import ActionSwapHoriz from 'material-ui/lib/svg-icons/action/swap-horiz';
var ActionTypes = AppConstants.ActionTypes;
var Recaptcha = require('react-recaptcha');
const styles = {
  popover: {
    padding: 0,
  },
};

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      User_AccountName: '',
      User_AccountEmail: '',
      User_AccountPassword: '',
      Account_information_Supplied: false,

      //Authentication
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,


      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,


      Dialog_LogOutUserConfirmation_IsOpen : false,
      Dialog_LogOutUserInProgress_IsOpen: false,
      Dialog_LogOutUserFailed_IsOpen: false,
      
      
      
      Dialog_CreateInterviewer_IsOpen : false,
      Dialog_CreateInterviewerInProgress_IsOpen: false,
      Dialog_CreateInterviewerFailed_IsOpen: false,
      
      Dialog_LogOutInterviewerConfirmation_IsOpen : false,
      Dialog_LogOutInterviewerInProgress_IsOpen: false,
      Dialog_LogOutInterviewerFailed_IsOpen: false,
      
      Popover_AuthorizedUser_IsOpen : false,
      Popover_AuthorizedInterviewer_IsOpen:false,
      error: false,
      Captcha_Pass: false
    }
  },
 



  // Handle popping open the login dialog if authentication is required
  componentWillMount( )
  {
    this.state.value = 1;
    registerAuthenticationRequiredCallback( this._callback_OpenAuthenticationChallenge ); 
  },
  
  componentDidMount () {
    var _this = this;
    console.log(this.props);
    
   //burda interviewer bilgilerini getir bakem token var
   /* 
    var url = 'http://localhost/hoditgo/get-interviewerid'; 
    getXHR(
    url,
    { 
        id: "1"
    }, 
    localStorage.token,
      ( response ) => this._handle_GetInterviewer_Response_Success( response ),
      ( response ) => this._handle_GetInterviewer_Response_Failure( response )
    ); 
    */
  },
  
    _handle_GetInterviewer_Response_Success( response )
  {  
      
  
   },
   
   _handle_GetInterviewer_Response_Failure(response)
   {
       
       
   },
   

  componentWillUnmount( )
  {
    registerAuthenticationRequiredCallback( null );
  },

  _callback_OpenAuthenticationChallenge ( )
  {
    this.setState( {
      User_AccountName: '',
      User_AccountEmail:'',
      User_AccountPassword: '',
      Account_information_Supplied: false,
      Dialog_AuthenticationChallenge_IsOpen: true,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen : false,
      Dialog_LogOutInterviewerInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
      Popover_AuthorizedInterviewer_IsOpen : false,
    } );
  },

  //Auth Start

  Dialog_AuthenticationChallenge_Open ( ) 
  { 
 
    AppDispatcher.handleViewAction('openAuthLogin') ;
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: true
    } );
  },
  
  //Auth Start Dialog

  Dialog_AuthenticationChallenge( )
  {
    return(
	
      <Dialog
      autoScrollBodyContent={true}
        open={ this.state.Dialog_AuthenticationChallenge_IsOpen }
        
        title="Log In"
        actions={ [
          <FlatButton key="CreateUser" label="Create User" secondary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_CreateUser } />,
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_Cancel } />,
          <FlatButton key="LogIn" label="Log In" primary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_LogIn } disabled={ ! this.state.Account_information_Supplied } />,
        ] }
      > 
        <TextField
          floatingLabelText="E-Mail"
          fullWidth={ true }
          value={ this.state.User_AccountEmail }
          onKeyDown={ this._handle_onKeyDown_AuthenticationChallenge_User_AccountEmail }
          onChange={ this._handle_onChange_AuthenticationChallenge_User_AccountEmail }
        />
        <TextField
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          value={ this.state.User_AccountPassword }
          onKeyDown={ this._handle_onKeyDown_AuthenticationChallenge_User_AccountPassword }
          onChange={ this._handle_onChange_AuthenticationChallenge_User_AccountPassword }
          ref="User_AccountPassword"
        />
        If you are running the in-memory implementation, your users accounts will be lost upon app restart / heroku sleep.
      </Dialog>
    );
  },

  //Auth Success
  
  _handle_Authentication_Response_Success( response ) //loginde bi sayfaya yönlendirme yok.
  { 
    var that = this;
    try{ 
        let responseJSON = JSON.parse( response );  
        if( !responseJSON.token ) throw new Error( "Login failed" );
        localStorage.token = responseJSON.token; 
        responseJSON.status = "connected";
        AppDispatcher.dispatch({
            actionType: ActionTypes.LOGGED_IN,
            data: responseJSON
        });
        that.setState( { 
            Dialog_AuthenticationInProgress_IsOpen: false,
        });
    } catch( err ) { this._handle_Authentication_Response_Failure( "1" ); return; } 
  },
  
  //Auth Failure

  _handle_Authentication_Response_Failure( response : string )
  { 
    let message;
    try{
        let responseJSON = JSON.parse( response ); 
        message = responseJSON.error;
        responseJSON.status = "notconnected";
        AppDispatcher.dispatch({
          actionType: ActionTypes.NOT_LOGGED_IN,
          data: responseJSON
        });
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: true,
      Dialog_AuthenticationFailed_Message: message,
    } );
  },



  //

  _handle_CreateUser_Response_Success( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "New User Creation failed" );
    } catch( err ) { this._handle_CreateUser_Response_Failure( "1" ); return; }

    location.replace( location.href );
  },

  _handle_CreateUser_Response_Failure( response : string )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: true,
      Dialog_CreateUserFailed_Message: message,
    } );
  },



  //

  _handle_LogOutInterviewerConfirmation_Response_Success( response )
  {  

    var that = this; 
    try{       
        //response gelmiyor!!!
       var responseJSON = JSON.parse('{}');   
        localStorage.removeItem("token");
        responseJSON.status = "notconnected"; 
        this.context.router.push( '/' );
            setTimeout(function(){ 
             AppDispatcher.dispatch({
                actionType: ActionTypes.LOGGED_OUT,
                data: responseJSON
             });  
              that.setState( { 
                Dialog_LogOutInterviewerInProgress_IsOpen: false,
              });
        }, 500);
        
    } catch( err ) { console.log(err);  this._handle_LogOutInterviewerConfirmation_Response_Failure( "1" ); return; }     
  },

  _handle_LogOutInterviewerConfirmation_Response_Failure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_LogOutInterviewerInProgress_IsOpen: false,
      Dialog_LogOutInterviewerFailed_IsOpen: true,
      Dialog_LogOutFailed_Message: message,
    } );
  },


  //

  _handle_LogOutUserConfirmation_Response_Success( response )
  {  
    var that = this; 
    try{       
        //response gelmiyor!!!
       var responseJSON = JSON.parse('{}');   
        localStorage.removeItem("token");
        responseJSON.status = "notconnected"; 
        this.context.router.push( '/' );
            setTimeout(function(){ 
             AppDispatcher.dispatch({
                actionType: ActionTypes.LOGGED_OUT,
                data: responseJSON
             });  
              that.setState( { 
                Dialog_LogOutUserInProgress_IsOpen: false,
              });
        }, 500);
        
    } catch( err ) { console.log(err);  this._handle_LogOutUserConfirmation_Response_Failure( "1" ); return; }               
  },

  _handle_LogOutUserConfirmation_Response_Failure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
     // Dialog_LogOutUserInProgress_IsOpen: false,
      Dialog_LogOutUserFailed_IsOpen: true,
      Dialog_LogOutFailed_Message: message,
    } );
  },


  _handle_onChange_AuthenticationChallenge_User_AccountEmail  ( event ) 
  {
    this.setState( { User_AccountEmail: event.target.value } );
    this._handle_onChange_AuthenticationChallenge_User_AccountEmail_or_Password( event.target.value, this.state.User_AccountPassword );
  },

  _handle_onKeyDown_AuthenticationChallenge_User_AccountEmail ( e ) 
  {
    if (e.keyCode === 13)
      this.refs.User_AccountPassword.focus( );
  },
 
  _handle_onChange_AuthenticationChallenge_User_AccountPassword  ( event ) 
  {
    this.setState( { User_AccountPassword: event.target.value } );
    this._handle_onChange_AuthenticationChallenge_User_AccountEmail_or_Password( this.state.User_AccountEmail, event.target.value );
  },

  _handle_onKeyDown_AuthenticationChallenge_User_AccountPassword  ( e ) 
  {
    if (e.keyCode === 13)
      this._handle_onTouchTap_AuthenticationChallenge_LogIn( );
  },

  _handle_onChange_AuthenticationChallenge_User_AccountEmail_or_Password  ( AccountEmail, AccountPassword ) 
  {
    this.setState( { Account_information_Supplied: AccountEmail.length > 3 && AccountPassword.length > 3 } );
  },

  _handle_onTouchTap_AuthenticationChallenge_LogIn ( ) 
  { 

    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: true,
    } ); 

        //it only get access token 
        var url = 'http://192.168.99.100:5000/token-auth'; 
        postXHR(
          url,
          {
            User_AccountEmail: this.state.User_AccountEmail,
            User_AccountPassword: this.state.User_AccountPassword,
          }, 
          null,
            ( response ) => this._handle_Authentication_Response_Success( response ),
            ( response ) => this._handle_Authentication_Response_Failure( response )
        ); 
    },
    
  _handle_onTouchTap_AuthenticationChallenge_CreateUser ( ) 
  {
    this.setState( {
      Captcha_Pass: false,
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_CreateUser_IsOpen: true,
      Dialog_CreateUser_AccountPasswordStrength: 0,
      User_AccountPassword: '',
    } );
  },

  _handle_onTouchTap_AuthenticationChallenge_Cancel  ( ) 
  { 
    this.setState( {
      Dialog_AuthenticationChallenge_IsOpen: false
    } );
  },



  //

  Dialog_AuthenticationInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationInProgress_IsOpen }
        title="Logging In ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_AuthenticationInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  },

  _handle_onTouchTap_AuthenticationInProgress_Cancel ( ) 
  {
    this.setState( {
      Dialog_AuthenticationInProgress_IsOpen: false
    } );
  },



  //

  Dialog_AuthenticationFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_AuthenticationFailed_IsOpen }
        title="Login failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogInFailure_OK } />,
        ] }
      >
        { this.state.Dialog_AuthenticationFailed_Message }
      </Dialog>
    );
  },

  _handle_onTouchTap_LogInFailure_OK  ( ) 
  {
    this.setState( {
      Dialog_AuthenticationFailed_IsOpen: false
    } );
  },

   handleChange  (event, index, value){
            this.setState({value});  
   },


_callback( ) {
    console.log('captcha load!!!');
},
_verifyCallback(response){
    if(response){
        this.setState({Captcha_Pass: true});
    }
},
_expireCallback(){
    this.setState({Captcha_Pass: false});

},

//
  
  Dialog_CreateUser( )
  { //email check yapılabilir!!!
    return(
      <Dialog
      autoScrollBodyContent={true}
        open={ this.state.Dialog_CreateUser_IsOpen }
        title="Sign Up"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUser_Cancel } />,
          <FlatButton key="Create" label="Create" primary={true}
            onTouchTap={ this._handle_onTouchTap_CreateUser_Create }
            disabled={ !this.state.Captcha_Pass || this.state.Dialog_CreateUser_AccountPasswordStrength < 60 || this.state.User_AccountName.length < 4 || this.state.User_AccountPasswordCheck !== this.state.User_AccountPassword }
          />,
        ] }
      >
      <div >
       <TextField
          floatingLabelText="Email"
          fullWidth={ true }
          value={ this.state.User_AccountEmail }
          onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountEmail}
          onChange={ this._handle_onChange_CreateUser_User_AccountEmail}
        />
        
        <TextField
          floatingLabelText="Username"
          fullWidth={ true }
          value={ this.state.User_AccountName }
          onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountName }
          onChange={ this._handle_onChange_CreateUser_User_AccountName }
        />
     
        <TextField
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          value={ this.state.User_AccountPassword }
          onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountPassword }
          onChange={ this._handle_onChange_CreateUser_User_AccountPassword }
          ref="User_AccountPassword"
        />

	<TextField
          type="password"
		  errorText =  {(this.state.User_AccountPasswordCheck !== this.state.User_AccountPassword) ? "Şifreler farklı": ""}
          floatingLabelText="Password Check"
          fullWidth={ true }
          value={ this.state.User_AccountPasswordCheck }
          onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountPasswordCheck }
          onChange={ this._handle_onChange_CreateUser_User_AccountPasswordCheck}
          ref="User_AccountPasswordCheck"
        />
          <br/>Password strength
<LinearProgress
mode="determinate"
value={ this.state.Dialog_CreateUser_AccountPasswordStrength }
color={ this.state.Dialog_CreateUser_AccountPasswordStrength < 60 ? "#ff0000" : ( this.state.Dialog_CreateUser_AccountPasswordStrength < 80 ? "#c0c000" : "#00d000" ) }
/>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="User"/>
          <MenuItem value={2} primaryText="Interviewer"/> 
        </SelectField>

            <Recaptcha
            sitekey="6LfC1R8TAAAAAPQxG8YYdhx9GVWfnmMOI3-mEkML"
            render="explicit"
            verifyCallback={this._verifyCallback}
            expiredCallback={this._expireCallback}
            onloadCallback={this._callback}
            />
                </div>
      </Dialog>
    );
  },
  _handle_onChange_CreateUser_User_AccountEmail ( event ) 
  {
     this.setState( { User_AccountEmail: event.target.value } );
  },
  
  _handle_onChange_CreateUser_User_AccountName ( event ) 
  {
    this.setState( { User_AccountName: event.target.value } );
    this._handle_onChange_CreateUser_User_AccountName_or_Password( event.target.value, this.state.User_AccountPassword );
  },
  _handle_onKeyDown_CreateUser_User_AccountEmail ( e ) 
  {
    if (e.keyCode === 13)
      this.refs.User_AccountName.focus( );
  },

  _handle_onKeyDown_CreateUser_User_AccountName ( e ) 
  {
    if (e.keyCode === 13)
      this.refs.User_AccountPassword.focus( );
  },

  _handle_onChange_CreateUser_User_AccountPassword ( event ) 
  {
    this.setState( { User_AccountPassword: event.target.value } );
    this._handle_onChange_CreateUser_User_AccountName_or_Password( this.state.User_AccountName, event.target.value );
  },

  _handle_onKeyDown_CreateUser_User_AccountPassword ( e ) 
  {
    if (e.keyCode === 13)
      this.refs.User_AccountPasswordCheck.focus( );
  },
  
  
  
  
  _handle_onChange_CreateUser_User_AccountPasswordCheck  ( event ) 
  {
    this.setState( { User_AccountPasswordCheck: event.target.value } ); 
  },

  _handle_onKeyDown_CreateUser_User_AccountPasswordCheck  ( e ) 
  {
    if (e.keyCode === 13)
      this._handle_onTouchTap_CreateUser_Create( );
  },
  
  
  
  _handle_onChange_CreateUser_User_AccountName_or_Password  ( AccountName, AccountPassword ) 
  {
    const passwordScore = scorePassword( AccountPassword );
    this.setState( {
      Account_information_Supplied: AccountName.length > 3 && AccountPassword.length > 3,
      Dialog_CreateUser_AccountPasswordStrength: passwordScore,
    } ); 
  },

  _handle_onTouchTap_CreateUser_Create ( ) 
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false,
      Dialog_CreateUserInProgress_IsOpen: true,
    } );


        //it only get access token 
        var url = 'http://localhost/hoditgo/create-user'; 
        postXHR(
          url,
          {
            Username: this.state.User_AccountName,
            Password: this.state.User_AccountPassword,
            Email : this.state.User_AccountEmail
          }, 
          null,
            ( response ) => this._handle_CreateUser_Response_Success( response ),
            ( response ) => this._handle_CreateUser_Response_Failure( response )
        ); 
  },

  _handle_onTouchTap_CreateUser_Cancel ( ) 
  {
    this.setState( {
      Dialog_CreateUser_IsOpen: false
    } );
  },


  //

  Dialog_CreateUserInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserInProgress_IsOpen }
        title="Creating user ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUserInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  },


  _handle_onTouchTap_CreateUserInProgress_Cancel ( ) 
  {
    this.setState( {
      Dialog_CreateUserInProgress_IsOpen: false
    } );
  },

  //

  Dialog_CreateUserFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_CreateUserFailed_IsOpen }
        title="Creating user failed"
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_CreateUserFailed_OK } />,
        ] }
      >
        { this.state.Dialog_CreateUserFailed_Message }
      </Dialog>
    );
  },

  _handle_onTouchTap_CreateUserFailed_OK  ( ) 
  {
    this.setState( {
      Dialog_CreateUserFailed_IsOpen: false
    } );
  },


  //

  Dialog_LogOutUserConfirmation( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutUserConfirmation_IsOpen }
        title="Log Out"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutUserConfirmation_Cancel } />,
          <FlatButton key="LogOut" label="Log Out" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutUserConfirmation_LogOut } />,
        ] }
      >
      <List subheader="You are currently logged in as">
        <ListItem
          primaryText={ this.props.User.User_DisplayName }
          leftAvatar={<Avatar src={ this.props.User.User_ProfilePhoto } />}
        />
      </List>
      <List subheader="Are you sure you want to log out?" />
      </Dialog>
    );
  },
  
  
  Dialog_LogOutInterviewerConfirmation( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutInterviewerConfirmation_IsOpen }
        title="Log Out"
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutInterviewerConfirmation_Cancel } />,
          <FlatButton key="LogOut" label="Log Out" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutInterviewerConfirmation_LogOut } />,
        ] }
      >
      <List subheader="You are currently logged in as">
        <ListItem
          primaryText={ this.props.Interviewer.Interviewer_DisplayName }
          leftAvatar={<Avatar src={ this.props.Interviewer.Interviewer_ProfilePhoto } />}
        />
      </List>
      <List subheader="Are you sure you want to log out?" />
      </Dialog>
    );
  },
  
  
  _handle_onTouchTap_LogOutUserConfirmation_LogOut ( ) //logout bittiğinde çıkış yapılabilmişse anasayfaya 
  {

    this.setState( { 
      Dialog_LogOutUserConfirmation_IsOpen: false,
      Dialog_LogOutUserInProgress_IsOpen: true,
    });

   var url = 'http://localhost/hoditgo/logout'; 
    getXHR(
      url,
      { 
      }, 
        localStorage.token,
        ( response ) => this._handle_LogOutUserConfirmation_Response_Success( response ),
        ( response ) => this._handle_LogOutUserConfirmation_Response_Failure( response )
      );  
  },

  _handle_onTouchTap_LogOutUserConfirmation_Cancel ( ) 
  {
    this.setState( {
      Dialog_LogOutUserConfirmation_IsOpen: false
    } );
  },  
  
  
  
 
  _handle_onTouchTap_LogOutInterviewerConfirmation_LogOut ( ) //logout bittiğinde çıkış yapılabilmişse anasayfaya 
  {

    this.setState( {
        
      Dialog_LogOutInterviewerConfirmation_IsOpen: false,
      Dialog_LogOutInterviewerInProgress_IsOpen: true,
    });

    var url = 'http://localhost/hoditgo/logout'; 
    getXHR(
      url,
      { 
      }, 
        localStorage.token,
        ( response ) => this._handle_LogOutInterviewerConfirmation_Response_Success( response ),
        ( response ) => this._handle_LogOutInterviewerConfirmation_Response_Failure( response )
      );  
  },

  _handle_onTouchTap_LogOutInterviewerConfirmation_Cancel ( ) 
  {
    this.setState( {
      Dialog_LogOutInterviewerConfirmation_IsOpen: false
    } );
  },


  Dialog_LogOutUserInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutUserInProgress_IsOpen }
        title="Logging out ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutUserInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  },
  
   //
  _handle_onTouchTap_LogOutUserInProgress_Cancel ( ) 
  {
    this.setState( {
     // Dialog_LogOutUserInProgress_IsOpen: false
    } );
  },
    
  //
  
  Dialog_LogOutInterviewerInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutInterviewerInProgress_IsOpen }
        title="Logging out ..."
        actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_LogOutInterviewerInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  },
  
   //
  _handle_onTouchTap_LogOutInterviewerInProgress_Cancel ( ) 
  {
    this.setState( {
      Dialog_LogOutInterviewerInProgress_IsOpen: false
    } );
  },

  //

  Dialog_LogOutUserFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutUserFailed_IsOpen }
        title="Log out failed."
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutUserFailed_OK } />,
        ] }
      >
        <List subheader=" You are still logged in as">
          <ListItem
            primaryText={ this.props.User.User_DisplayName }
            leftAvatar={<Avatar src={ this.props.User.User_ProfilePhoto } />}
          />
        </List>
        <List subheader={ this.state.Dialog_LogOutUserwFailed_Message } />
      </Dialog>
    );
  },

  //

 Dialog_LogOutInterviewerFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutInterviewerFailed_IsOpen }
        title="Log out failed."
        actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutInterviewerFailed_OK } />,
        ] }
      >
        <List subheader=" You are still logged in as">
          <ListItem
            primaryText={ this.props.Interviewer.Interviewer_DisplayName }
            leftAvatar={<Avatar src={ this.props.Interviewer.Interviewer_ProfilePhoto } />}
          />
        </List>
        <List subheader={ this.state.Dialog_LogOutInterviewerFailed_Message } />
      </Dialog>
    );
  },
  
  //
  
  _handle_onTouchTap_LogOutFailed_OK ( ) 
  {
    this.setState( {
      Dialog_LogOutFailed_IsOpen: false
    } );
  },


  //
  Popover_AuthorizedInterviewer( )
  {
 
   return (
      <Popover
        open={this.state.Popover_AuthorizedInterviewer_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedInterviewer_Close}
         animation={PopoverAnimationFromTop}
      >
        <div style={styles.popover}>
          <List subheader="Logged In as">
            <ListItem
              primaryText={ this.props.Interviewer.Interviewer_DisplayName }
              leftAvatar={<Avatar src={ this.props.Interviewer.Interviewer_ProfilePhoto } />}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Add Interview" leftIcon={<ImageLoupe />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_AddInterView } />
            <ListItem primaryText="My Profile" leftIcon={<ActionFace />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_Profile } />
            <ListItem primaryText="My Interviews" leftIcon={<CommunicationTextSms />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_Interviews } />
            <ListItem primaryText="History" leftIcon={<ActionHistory />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_History } />
            <ListItem primaryText="Accounting Request" leftIcon={<ContentInbox />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_Accounting_Request } />
           </List>
          <Divider />
          <List>
            <ListItem primaryText="Log in as a different user" leftIcon={<ActionSwapHoriz />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_LogInAsADifferentUser } />
            <ListItem primaryText="Log out" leftIcon={<ActionPowerSettingsNew />} onTouchTap={ this._handle_Popover_AuthorizedInterviewer_LogOut } />
          </List>
        </div>
      </Popover>
    );  
  },

  Popover_AuthorizedUser( )
  { 
   return (
      <Popover
        open={this.state.Popover_AuthorizedUser_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedUser_Close}
        animation={PopoverAnimationFromTop}
      >
        <div style={styles.popover}>
          <List subheader="Logged In as">
            <ListItem
              primaryText={ this.props.User.User_DisplayName }
              leftAvatar={<Avatar src={ this.props.User.User_ProfilePhoto } />}
            />
          </List>
          <Divider />
          <List> 
            <ListItem primaryText="My Profile" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="History(Ranks)(Past)" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Upcoming(Feature)" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Development" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Change Password" onTouchTap={ this._handle_Popover_AuthorizedUser_ChangePassword } />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Log in as a different user" onTouchTap={ this._handle_Popover_AuthorizedUser_LogInAsADifferentUser } />
            <ListItem primaryText="Log out" onTouchTap={ this._handle_Popover_AuthorizedUser_LogOut } />
          </List>
        </div>
      </Popover>
    );  
  },
  
  
  
  _handle_Popover_AuthorizedInterviewer_AddInterView ( )
  { 
      this.setState( {
        Popover_AuthorizedInterviewer_IsOpen: false,
      });
      this.context.router.push( '/Interviewer/addInterview' );
  },
  
  
    _handle_Popover_AuthorizedInterviewer_Profile ( ) 
  {
    this.setState( {
      Popover_AuthorizedInterviewer_IsOpen: false,
    } );
    this.context.router.push( '/Interviewer' );
  },
  
  _handle_Popover_AuthorizedInterviewer_Interviews ()
  {
    this.setState( {
      Popover_AuthorizedInterviewer_IsOpen: false,
    } );
    this.context.router.push( '/Interviewer/interviews' );
  },
  
  _handle_Popover_AuthorizedUser_Profile ( ) 
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/User' );
  },

  _handle_Popover_AuthorizedUser_ChangePassword ( ) 
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/User/UpdatePassword' );
  },

  _handle_Popover_AuthorizedUser_LogInAsADifferentUser ( ) 
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.Dialog_AuthenticationChallenge_Open( );
  },
  
  
  
  _handle_Popover_AuthorizedInterviewer_LogInAsADifferentUser ( ) 
  {
     
    this.setState( {
      Popover_AuthorizedInterviewer_IsOpen: false,
    } ); 
    this.Dialog_AuthenticationChallenge_Open( );
  },
  
  
  
  _handle_Popover_AuthorizedUser_LogOut ( ) 
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
      Dialog_LogOutUserConfirmation_IsOpen: true
    } );
  },
  
  
    _handle_Popover_AuthorizedInterviewer_LogOut ( ) 
  {
    this.setState( {
      Popover_AuthorizedInterviewer_IsOpen: false,
      Dialog_LogOutInterviewerConfirmation_IsOpen: true
    } );
  },

  _handle_Popover_AuthorizedUser_Close ( ) 
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
  },

  _handle_Popover_AuthorizedInterviewer_Close ( ) 
  { 
    this.setState( {
      Popover_AuthorizedInterviewer_IsOpen: false,
    } );
  },

  //

  render( )
  {  
      if(this.props.IsAnonymous){ //giriş yapılmamış ortak login ve create ekranı
          return(
            <IconButton key='login' tooltip="Log In" onTouchTap={ this.Dialog_AuthenticationChallenge_Open }>
              <IconSocialPersonOutline  color={Colors.white}/>
              { this.Dialog_AuthenticationChallenge( ) }
              { this.Dialog_AuthenticationInProgress( ) }
              { this.Dialog_AuthenticationFailed( ) }
              { this.Dialog_CreateUser( ) }
              { this.Dialog_CreateUserInProgress( ) }
              { this.Dialog_CreateUserFailed( ) }
            </IconButton>
          ); 
      } else {
            if(this.props.isUser) {  
               return(
                 <IconButton key='authenticated' tooltip="User menu" onTouchTap={ this._handle_AuthorizedUserIcon_TouchTap }>
                   <IconSocialPerson color={Colors.white} />
                   { this.Popover_AuthorizedUser( ) }
                   { this.Dialog_LogOutUserConfirmation( ) }
                   { this.Dialog_LogOutUserInProgress( ) }
                   { this.Dialog_LogOutUserFailed( ) }
                       { this.Dialog_AuthenticationChallenge( ) }
              { this.Dialog_AuthenticationInProgress( ) }
              { this.Dialog_AuthenticationFailed( ) }
                    { this.Dialog_CreateUser( ) }
              { this.Dialog_CreateUserInProgress( ) }
              { this.Dialog_CreateUserFailed( ) }
                 </IconButton>
               );  
           } else { 
                   // Interviewer has already logged in
                   return(
                     <IconButton key='authenticated' tooltip="Interviewer menu" onTouchTap={ this._handle_AuthorizedInterviewerIcon_TouchTap }>
                       <IconSocialPerson color={Colors.white} />
                        { this.Popover_AuthorizedInterviewer( ) }
                        { this.Dialog_LogOutInterviewerConfirmation( ) }
                        { this.Dialog_LogOutUserInProgress( ) }
                        { this.Dialog_LogOutUserFailed( ) }
                            { this.Dialog_AuthenticationChallenge( ) }
              { this.Dialog_AuthenticationInProgress( ) }
              { this.Dialog_AuthenticationFailed( ) }
                    { this.Dialog_CreateUser( ) }
              { this.Dialog_CreateUserInProgress( ) }
              { this.Dialog_CreateUserFailed( ) }
                     </IconButton>
                   );
           } 
      }
       
  },
  
  
  
  /*
 { this.Dialog_CreateUserInProgress( ) }
                    
                   { this.Dialog_LogOutUserInProgress( )} 
                   { this.Dialog_CreateUser( ) } 
                   { this.Dialog_CreateUserFailed( ) }
                       { this.Dialog_LogOutInterviewerConfirmation( ) }
                        { this.Dialog_AuthenticationChallenge( ) }
                     { this.Dialog_AuthenticationInProgress( ) }
                     { this.Dialog_AuthenticationFailed( ) }
                     { this.Dialog_CreateUser( ) }
                     { this.Dialog_CreateUserInProgress( ) }
                     { this.Dialog_CreateUserFailed( ) }
                     
                     { this.Dialog_LogOutInterviewerFailed( ) }
   */
  
 
  _handle_AuthorizedUserIcon_TouchTap ( event ) 
  {
	AppDispatcher.handleViewAction('openAuthUser') ;
    this.setState( {
      Popover_AuthorizedUser_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  },
  
    _handle_AuthorizedInterviewerIcon_TouchTap ( event ) 
  {
      
    AppDispatcher.handleViewAction('openAuthUser') ;
    this.setState( {
      Popover_AuthorizedInterviewer_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  }
});


          /*  <ListItem primaryText="History(Ranks)(Past)" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Upcoming(Feature)" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="Development" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />*/