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
 

export default class AddInterview extends React.Component
{
  constructor( props )
  {
    super( props );
   
    this.state = {
    };
  }
 // <div className="my-logo">Searchkit Acme co</div>  
   
  render( )
  {
    
        return (
        <Card>
          <CardHeader
            title="Add Interview"
          />
          <CardText> 
          </CardText>
        </Card>
      );
   /* if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    else*/ 
  }
}