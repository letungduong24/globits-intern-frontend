import React, { Component } from "react";
// import ConstantList from "../../appConfig";
// import { Link } from "react-router-dom";
// import { Helmet } from 'react-helmet';
class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          {/* <Link to={ConstantList.HOME_PAGE}>
            <img src= {ConstantList.ROOT_PATH+ "assets/images/Logo_Viettel.png"} alt="company-logo" />          
          </Link>    */} 
            <span className="brand__text">Globits React</span> 
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default Brand;
