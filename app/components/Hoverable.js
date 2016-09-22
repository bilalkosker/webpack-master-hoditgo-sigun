import React from 'react';
import Paper from 'material-ui/lib/paper';

const style = {
 
};
export default class Hoverable extends React.Component
{ 
     handleMouseEnter = () => {
        this.setState({
          zDepth: 4,
        });
      };
    state = {
            zDepth: 1,
     };
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    });
  };
  render() {  
    return (
        <Paper style={style}
 onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        zDepth={this.state.zDepth}
        >
        {this.props.children}
        </Paper>
    )
  }
}; 