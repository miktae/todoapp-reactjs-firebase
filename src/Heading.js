import React from 'react';

export default class Heading extends React.Component {
  render() {
    return <>
      <div className="heading">
        <img className="heading_img" src="favicon.png" alt="#" />
        &ensp;
        <h1 className="heading_title">{this.props.title}</h1>
      </div>
    </>;
  }
}