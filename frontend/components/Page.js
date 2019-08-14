import React, { Component } from 'react';

//components
import Meta from "./Meta";
import Header from "./Header";

class Page extends Component {
    render() {
        return (
            <div>
                {/* puts the meta details in head tag */}
                <Meta />
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default Page;