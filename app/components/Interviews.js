/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';

import ActiveTheme from '../../mui-themes/active-theme.js';
import ThemeManager from 'material-ui/lib/styles/theme-manager'; 

//import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';

//import Viewer_updateMutation from '../../relay/Viewer_updateMutation';

var interviews = [
    {"id":0, "title":"First Featured Card", "content": "Featured Card Content"},
    {"id":1, "title":"Second Featured Card", "content": "Featured Card Content"},
    {"id":2, "title":"Third Featured Card", "content": "Featured Card Content"},
    {"id":3, "title":"Fourth Featured Card", "content": "Featured Card Content"},
];


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

export default class AddInterview extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
    };
  }
   
  render( )
  { 
    return (
        <Card> 
            <div className={'row'} style={{paddingTop:20, paddingLeft: 24,paddingRight: 24}}> 
                    <h3 className={"header"}>MY INTERVIEWS</h3> 
                    { interviews.map(function(result){
                        return  (<div key = {result.id} style= {styles.Interview}>
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
                                </div>)
                    })}
                </div> 
        </Card>
      );
   /* if( this.props.Viewer.User_IsAnonymous )
      return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    else*/ 
  }
}

 
