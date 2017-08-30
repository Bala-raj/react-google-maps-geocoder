import React from 'react';

import MyComponent from '../src/index';

class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('test');
    }

    render() {
        return (
            <div>
                <MyComponent address='portland'/>
            </div>
        )
    }
}

export default Example;