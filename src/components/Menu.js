import React from 'react';
import { Link } from 'react-router-dom';

class MenuLink extends React.Component {
  render() {
    return(
      <li className={this.props.to === window.location.pathname ? 'active' : ''}>
        <Link {...this.props} />
      </li>
    );
  }
}

class Menu extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-header">
          <a className="navbar-brand" href="index.html" title="Ginko">銀行</a>
        </div>

        <div className="nav navbar-right top-nav">
          <div className="navbar-header">
            <div className="navbar-brand" id="register-funds"></div>
          </div>
        </div>

        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav side-nav">
            <MenuLink to="/"><i className="fa fa-fw fa-bank"></i> Dashboard</MenuLink>
            <MenuLink to="/budget"><i className="fa fa-fw fa-life-ring"></i> Budget</MenuLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Menu;
