import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { apiRepo } from "../repository/apiRepo";
// import { orderInformation } from "../APIMocks";
import _ from "lodash";

export default class stagingItemSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upc: "",
      upcError: false,
      orderDetails: {},
    };
    this.onGoBtnClick = this.onGoBtnClick.bind(this);
  }

  componentDidMount() {
    // orderInformation()
    //   .then((res) => {
    //     this.setState({
    //       orderDetails: res,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({
    //       err: err,
    //     });
    //   });
    apiRepo
      .serviceCall("get", "/multiorderlist")
      .then((res) => {
        this.setState({
          orderDetails: _.get(res, "data.serviceResponse", {}),
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          err: err,
        });
      });
  }

  onGoBtnClick() {
    const { upc } = this.state;
    if (!upc) {
      this.setState({
        upcError: true,
      });
    } else {
      this.setState({
        redirectToStagingPrintItem: true,
      });
    }
  }

  loadTableItems() {
    const { orderDetails } = this.state;
    const stageScanResponseItem = _.get(
      orderDetails,
      "stageScanResponse[0]",
      {}
    );
    const cartonDetails = _.get(stageScanResponseItem, "orders", []);

    const multiorder = _.get(this.props, "location.state.multiorder", false);

    return cartonDetails.map((carton) => {
      const inbCartons = _.get(carton, "inbCarton", {});
      const shipToName = _.get(carton, "customerName", "");
      return (
        <tr>
          <td>
            <Link
              to={{
                pathname: "/stagingPrintItem",
                state: {
                  multiorder: multiorder,
                  carton: inbCartons.cartonId,
                  barcode: stageScanResponseItem.barcode,
                  salesCheck: carton.salesCheck,
                  sku: inbCartons.sku,
                },
              }}
            >
              <input type="button" value="Select" />
            </Link>
          </td>
          <td>{_.get(carton, "salesCheck")}</td>
          {/* <td>{_.get(carton, "subOrderNo")}</td> */}
          <td>
            <a href="#" name="skulink">
              {_.get(inbCartons, "sku")}
            </a>
          </td>
          {/* <td>00999941000</td> */}
          {/* <td>00999941000</td> */}
          <td align="center">{_.get(inbCartons, "asnQty")}</td>
          <td>{shipToName}</td>
          <td>{_.get(carton, "barcode")}</td>
          {/* <td align="center">{_.get(inbCartons, "putupQty")}</td> */}
        </tr>
      );
    });
  }

  onInputValueChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  };

  render() {
    const multiorder = _.get(this.props, "location.state.multiorder", false);
    const { upc, redirectToStagingPrintItem } = this.state;
    if (redirectToStagingPrintItem) {
      return (
        <Redirect
          to={{
            pathname: "/stagingPrintItem",
            state: { multiorder: multiorder },
          }}
        />
      );
    }
    return (
      <>
        <table
          align="center"
          cellPadding="0"
          cellSpacing="0"
          border="1"
          width="75%"
          className="dccdTable"
        >
          <tr>
            <th
              align="center"
              colSpan="7"
              style={{ textAlign: "center", fontSize: "14px" }}
            >
              Select a line item for staging
            </th>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th name="SCAN_CARTON_SES">Salescheck</th>
            {/* <th name="SCAN_CARTON_SES">Suborder</th> */}
            <th name="SCAN_CARTON_SES">Item</th>
            {/* <th name="SCAN_CARTON_SES">KSN</th> */}
            {/* <th>3RD Party Item #</th> */}
            <th>Qty</th>
            <th>Customer Name</th>
            <th>Carton</th>
            {/* <th>Putup Qty</th> */}
          </tr>
          {this.loadTableItems()}
        </table>
        <center>
          Or Scan Retail UPC:&nbsp;
          <input
            type="text"
            name="upc"
            id="upc"
            size="15"
            maxlength="12"
            value={upc}
            style={{ width: "100px" }}
            onChange={this.onInputValueChange}
          />
          <button onClick={this.onGoBtnClick}>Go</button>
          <Link to="/">
            <button style={{ marginTop: "10px", marginLeft: "5px" }}>
              Cancel
            </button>
          </Link>
        </center>
      </>
    );
  }
}
