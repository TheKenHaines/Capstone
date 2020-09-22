import React, { Component } from "react";
import styles from "./thankyou.module.scss";
import cx from "classnames";
import findPic from "../Images/find2.png";
import { Link } from 'react-router-dom';

class thankyou extends Component {

  render() {
    return (
      <div
        className={`${cx(
          styles.pageWrapper,
          styles.routeWrapper
        )} row routeWrapper`}
      >
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className={`${styles.thankyou} col-8`}>
              Thank You For Registering 
            </div>
            <div className="col-2"></div>
          </div>

          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h4 className={styles.wordCarousel}>
                <span>Using Shop Chop Chop Means:</span>
                <div>
                  <ul className={styles.flip4}>
                    <li className={styles.red}>Building Better Lists</li>
                    <li className={styles.yellow}>Finding Items Faster</li>
                    <li>Contributing To Our Database</li>
                    <li>Getting Home Quicker</li>
                  </ul>
                </div>
              </h4>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-2"></div>

            <div className="col-8"><img className={styles.image} src={findPic} alt="Aisle"/></div>
            <div className="col-2"></div>
            <div className="col-2"></div>

            <div className="col-8"><Link to='/BuildList'><button className={styles.getStarted}>Get Started</button></Link></div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default thankyou;
