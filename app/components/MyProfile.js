/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import Chip from '../components/Chip';

//import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';

//import Viewer_updateMutation from '../../relay/Viewer_updateMutation';


export default class MyProfile extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      User_ProfilePhoto: null,
      Interviewer_ProfilePhoto:null,
    };
  }

  _handle_onChange_User_ProfilePhoto = ( event, index, value ) =>
  {
    this.setState( {
      User_ProfilePhoto: value
    } );
  };

  _handleUpdateUser = ( ) =>
  {
     
  };
  
    _handleUpdateInterviewer= ( ) =>
  {
     
  };
  
  _handle_onChange_Interviewer_ProfilePhoto = ( event, index, value ) =>
  {
    this.setState( {
      Interviewer_ProfilePhoto: value
    } );
  };

   
  render( )
  {
     if(this.props.route.type == 'user'){
        return (
        <Card>
          <CardHeader
            title="User profile"
          />
          <CardText>
            <TextField
              ref="User_DisplayName"
              defaultValue={ this.props.User_DisplayName }
              floatingLabelText="Display Name"
              fullWidth={ true }
            />
            <TextField
              ref="User_Email"
              defaultValue={ this.props.User_Email }
              floatingLabelText="Email"
              fullWidth={ true }
            />
            <SelectField
              value={ this.state.User_ProfilePhoto }
              floatingLabelText="Choose profile photo"
              onChange={ this._handle_onChange_User_ProfilePhoto }
              fullWidth={ true }
            >
              <MenuItem value={ "/profile_photos/griz.jpg" }   primaryText="Griz"/>
              <MenuItem value={ "/profile_photos/grumpy.jpg" } primaryText="Grumpy"/>
              <MenuItem value={ "/profile_photos/ice.jpg" }    primaryText="Ice"/>
              <MenuItem value={ "/profile_photos/jack.jpg" }   primaryText="Jack"/>
              <MenuItem value={ "/profile_photos/jill.jpg" }   primaryText="Jill"/>
              <MenuItem value={ "/profile_photos/panda.jpg" }  primaryText="Panda"/>
            </SelectField>
            <img src={ this.state.User_ProfilePhoto }/>
            <TextField
              ref="User_Locale"
              defaultValue={ this.props.User_Locale }
              floatingLabelText="Locale"
              fullWidth={ true }
            />
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                onTouchTap={ ( ) => this._handleUpdateUser( ) }
              />
            </div>
          </CardText>
        </Card>
      );
        
    } else {
        
             return (
        <Card>
          <CardHeader
            title="Interviewer profile"
          />
          <CardText> 
            <TextField
              ref="Interviewer_summary"
              defaultValue={ this.props.Interviewer_Email }
              floatingLabelText="Summary"
              fullWidth={ true }
              multiLine={true}
                rows={6}
            />
                <div>
                <div>
                SKILLSSET
                </div>
                <div style={{border:'1px solid rgba(0,0,0,0.3)',overflow:'auto'}}>
            <Chip close={true}>
            <div>C#sdfsdf sdfsdf sd fsd fs df</div>
            </Chip>
            <Chip close={true}>
            <div>C#</div>
            </Chip>
            <Chip close={true}>
            <div>C#</div>
            </Chip>
            <div style={{height:40,width:170, backgroundColor:'red' ,overflow:'auto'}}>
                <input
                    style={{border:'none',height:40}}
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>



            </div>
            </div>

            <SelectField
              value={ this.state.Interviewer_ProfilePhoto }
              floatingLabelText="Choose profile photo"
              onChange={ this._handle_onChange_Interviewer_ProfilePhoto }
              fullWidth={ true }
            >
              <MenuItem value={ "/profile_photos/griz.jpg" }   primaryText="Griz"/>
              <MenuItem value={ "/profile_photos/grumpy.jpg" } primaryText="Grumpy"/>
              <MenuItem value={ "/profile_photos/ice.jpg" }    primaryText="Ice"/>
              <MenuItem value={ "/profile_photos/jack.jpg" }   primaryText="Jack"/>
              <MenuItem value={ "/profile_photos/jill.jpg" }   primaryText="Jill"/>
              <MenuItem value={ "/profile_photos/panda.jpg" }  primaryText="Panda"/>
            </SelectField>
            <img src={ this.state.Interviewer_ProfilePhoto }/> 
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                onTouchTap={ ( ) => this._handleUpdateInterviewer( ) }
              />
            </div>
          </CardText>
        </Card>
      ); 
    }
   /* if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    else*/ 
  }
}

 
