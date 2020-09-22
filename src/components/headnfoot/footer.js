import React, { Component } from "react";
import styles from './footer.module.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={`${styles.footerWrapper} footerWrapper`}>
        <footer className="page-footer font-small white">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright: Chop Chop Shop
            <br/>
            Shopping Made Quick
          </div>
        </footer>
      </div>
    );
  }
}
