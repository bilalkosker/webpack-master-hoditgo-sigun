/**
 * Created by bilal on 13.05.2016.
 */

import React from 'react';
import ImageClear from 'material-ui/lib/svg-icons/content/clear';
import {grey500, grey800} from 'material-ui/lib/styles/colors';

class Chip extends React.Component {
    handlePress = () => {
        console.log('press');
    };

    render() {
        let close = '';
        if (this.props.close) {
            close = <ImageClear color={grey500} hoverColor={grey800} style={{width:28,height:28,padding:5, cursor:'pointer', backgroundColor:'transparent', borderRadius:15}}/>;
        }
        return (
            <div className='chip' style={{borderRadius:40,margin:5, float:'left', backgroundColor:'#e4e4e4'}}>
                <div style={ { float:'left'}}>
                    <div style={{float:'left', paddingTop:6,paddingBottom:6, paddingRight:15,paddingLeft:15}}>
                        {this.props.children}
                    </div>
                    <div  onClick={this.handlePress} style={{float:'right',paddingTop:2, verticalAlign:'middle',alignItems:'center',justifyContent:'center',lineHeight: '14px'}}>
                        {close}
                    </div>
                 </div>
            </div>
            );
    }
}

Chip.propTypes = {
    /**
     * If show a close icon
     * @default false
     */
    close: React.PropTypes.bool,
};

export default Chip;
