import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class stagingBinSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      stagingBinNumber: 0,
    };
    this.onGoBtnClick = this.onGoBtnClick.bind(this);
    this.onConfirmQtyClick = this.onConfirmQtyClick.bind(this);
  }

  onInputValueChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
      isError: false,
    });
  };

  onGoBtnClick() {
    const { stagingBinNumber } = this.state;
    if (!stagingBinNumber) {
      this.setState({
        isError: true,
      });
    } else {
      this.setState({
        confirm: true,
      });
    }
  }

  onConfirmQtyClick() {
    this.setState({
      onConfirmQtyClick: true,
    });
  }

  render() {
    const {
      isError,
      stagingBinNumber,
      confirm,
      onConfirmQtyClick,
    } = this.state;
    if (onConfirmQtyClick) {
      return <Redirect to={`/stagingConfirmation`} />;
    }
    return (
      <center>
        <h5>Staging</h5>
        <tr>
          <td align="center">
            {isError && (
              <div class="errors">
                Bin scanned is not a valid staging bin. Please choose another
                bin.
              </div>
            )}
          </td>
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
              <u>KSN</u>
            </td>
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
            <td name="ksn">KSN</td>
            <td name="sku">SKU</td>
            <td name="itemDesc">description</td>
            <td name="openQty">2</td>
            <td name="stageQty">2</td>
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
            <td colspan="4">&nbsp;</td>
          </tr>
          <tr style={{ fontSize: "14px" }}>
            {/* <td colSpan="2">SubOrder No:</td> */}
            <td colSpan="2">SalesCheck:</td>
            {/* <td colSpan="2">
              <b>
                Go To Stage Bin:<div>12345</div>
              </b>
            </td> */}
            <td colSpan="2">
              <b>Scan Staging Bin:{confirm && <div>{stagingBinNumber}</div>}</b>
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              {/* <div name="suborderNo"></div> */}
              <div name="salesCheck">12345</div>
            </td>
            <td colSpan="2">
              {confirm ? (
                <button onClick={this.onConfirmQtyClick}>Confirm Qty</button>
              ) : (
                <input
                  type="text"
                  name="stagingBinNumber"
                  value={stagingBinNumber}
                  onChange={this.onInputValueChange}
                  style={{ width: "100px" }}
                />
              )}
              {confirm ? (
                <input style={{ width: "15px" }} value={2} />
              ) : (
                <button onClick={this.onGoBtnClick}>Go</button>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="4">&nbsp;</td>
          </tr>

          <tr style={{ fontSize: "14px" }}>
            <td colspan="2">Customer Name:</td>
            <td colspan="2">&nbsp;</td>
          </tr>

          <tr>
            <td colSpan="2">
              <div>Customer Name</div>
            </td>
            <td colSpan="2">
              <button>
                <Link to="/" style={{ color: "#000" }}>
                  &nbsp;&nbsp;Exit&nbsp;&nbsp;
                </Link>
              </button>
            </td>
          </tr>
        </table>
      </center>
    );
  }
}
