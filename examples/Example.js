import React from 'react';

import MyComponent from '../src/index';

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            value: ''
        }
        
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        this.setState({address: this.state.value });
    }

    onChange(e) {
        this.setState({value: e.target.value });
    }

    render() {
        return (
            <div style={{ height: '600px' }}>
                <center style={{margin: "30px"}}> <input type="text" value={this.state.value} onChange={this.onChange} placeholder="Search" style={{height:"28px",width:"400px", fontSize:"25px"}} /> <button style={{fontSize:"28px"}} onClick={this.onClick}>Load</button> </center>
                <MyComponent address={this.state.address || 'india'} options={{draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true, zoom: 6, showMarker: true}}/>
            </div>
        )
    }
}

export default Example;