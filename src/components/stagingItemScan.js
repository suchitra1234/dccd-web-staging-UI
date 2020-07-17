import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class stagingItemScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  render() {
    const { isError } = this.state;
    return (
      <center>
        <h5>Staging</h5>
        <tr>
          <td align="center">{isError && <div class="errors"></div>}</td>
        </tr>

        <table
          style={{
            textAlign: "center",
            cellsPacing: "0px",
            cellPadding: "0px",
            border: "1px solid black",
          }}
          className="dccdTable"
        >
          <tr style={{ fontSize: "14px" }}>
            <td>
              <u>Div-Item-Sku</u>
            </td>
            <td>
              <u>Desc</u>
            </td>
            <td>
              <u>Qty</u>
            </td>
            <td>
              <u>Staged</u>
            </td>
          </tr>

          <tr>
            <td name="sku">00946820000</td>
            <td name="itemDesc">CM WRENCH SET RATCHE</td>
            <td name="openQty">1</td>
            <td name="stageQty">1</td>
          </tr>
        </table>
        <table
          style={{
            textAlign: "center",
            cellsPacing: "0px",
            cellPadding: "0px",
            border: "0",
          }}
          className="dccdTable"
        >
          <tr>
            <td colSpan="4">&nbsp;</td>
          </tr>
          <tr style={{ fontSize: "14px" }}>
            {/* <td colSpan="2">SubOrder No:</td> */}
            <td colSpan="2">SalesCheck:</td>
            <td colSpan="2">
              <b>
                Scan Staging Bin:
                <div>
                  12345
                  <button>Go</button>
                </div>
              </b>
            </td>
          </tr>

          <tr>
            <td colSpan="2"></td>
          </tr>
          <tr>
            <td colSpan="4">&nbsp;</td>
          </tr>
          <tr style={{ fontSize: "14px" }}>
            <td colSpan="2">Customer Name:</td>
            <td colSpan="2">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="2">
              <span name="custName" property="custName">
                Guy Tomlin
              </span>
              {/* <span
                name="stagingItemScanActionForm"
                property="custName"
              ></span> */}
            </td>
            <td colSpan="2">
              <Link to="/">
                <button>&nbsp;&nbsp;Exit&nbsp;&nbsp;</button>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </td>
          </tr>
        </table>
      </center>
    );
  }
}
