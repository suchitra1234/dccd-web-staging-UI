import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import _ from "lodash";
// import { orderInformation } from "../APIMocks";
import { apiRepo } from "../repository/apiRepo";
import "react-confirm-alert/src/react-confirm-alert.css";

export default class stagingPrintItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
    this.onForceSplitShip = this.onForceSplitShip.bind(this);
  }

  componentDidMount() {
    const multiorder = _.get(this.props, "location.state.multiorder", false);

    let urlPath;
    if (!multiorder) {
      const barcode = _.get(this.props, "location.state.barcode", null);
      console.log(barcode);
    //  urlPath = "/orderinformation";
    urlPath = "/singleOrderlist";
    } else {
      const carton = _.get(this.props, "location.state.carton", null);
      const barcode = _.get(this.props, "location.state.barcode", null);
      const salesCheck = _.get(this.props, "location.state.salesCheck", null);
      const sku = _.get(this.props, "location.state.sku", null);

      console.log(carton);
      console.log(barcode);
      console.log(salesCheck);
      console.log(sku);

      urlPath = `/${carton}`;
    }
    apiRepo
      .serviceCall("get", urlPath)
      .then((res) => {
        this.setState({
          orderDetails: res.data.serviceResponse,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          err: err,
        });
      });

    // orderInformation()
    //   .then((res) => {
    //     this.setState({
    //       orderDetails: res,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       err: err,
    //     });
    //   });
  }

  onForceSplitShip() {
    confirmAlert({
      // title: "Confirm to submit",
      message: "Are you sure you want to ship this order in multiple cartons",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.setState({
              redirectToStagingConfirmation: true,
            });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  loadOrderDetailsItems() {
    const { orderDetails } = this.state;

    const stageScanResponseItem = _.get(
      orderDetails,
      "stageScanResponse[0]",
      {}
    );
    const order = _.get(stageScanResponseItem, "orders[0]", {});

    const OrderDetails = _.get(order, "orderDetails", []);

    if (OrderDetails && OrderDetails.length) {
      return OrderDetails.map((orderItem) => {
        return (
          <tr>
            <td align="center">
              <a href="#" name="skulink">
                <span>{_.get(orderItem, "sku")}</span>
              </a>
            </td>
            <td align="left">
              <span name="itemDesc">{_.get(orderItem, "description")}</span>
            </td>
            <td align="center">
              <span name="orderQty">{_.get(orderItem, "orderQty", 0)}</span>
            </td>
            <td align="center">
              <span name="stageQty">{_.get(orderItem, "stageQty", 0)}</span>
            </td>
            <td align="center">
              <span name="binNo">{_.get(orderItem, "stageBin", 0)}</span>
            </td>
            <td align="center">
              <span name="shipQty">{_.get(orderItem, "shipQty", 0)}</span>
            </td>
            {/* <td align="center">
              <span name="putupShiQty">{_.get(orderItem, "putupShipQty", 0)}</span>
            </td> */}
            <td align="center">
              <span name="statusCd">{_.get(orderItem, "statusCd", 0)}</span>
            </td>
          </tr>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    const { isError, redirectToStagingConfirmation, orderDetails } = this.state;
    const stageScanResponseItem = _.get(
      orderDetails,
      "stageScanResponse[0]",
      {}
    );
    const order = _.get(stageScanResponseItem, "orders[0]", {});

    const subOrderNo = _.get(stageScanResponseItem, "subOrderNo");
    const shipToName = _.get(order, "customerName", "");
    const salesCheck = _.get(order, "salesCheck", "");

    const inbCartons = _.get(order, "inbCarton", {});

    if (redirectToStagingConfirmation) {
      return <Redirect to="/stagingConfirmation" />;
    }
    return (
      <>
        <table
          align="center"
          border="0"
          cellPadding="0"
          cellSpacing="0"
          width="50%"
        >
          <tr align="center">
            <td align="center">
              {isError && <div class="errors">Some error</div>}
            </td>
          </tr>

          <tr>
            {subOrderNo && (
              <td style={{ fontSize: "14px" }}>
                SubOrder No: &nbsp;
                <span>{_.get(orderDetails, "salesCheck")}</span>
              </td>
            )}
            <td style={{ fontSize: "14px" }}>
              Sales Chk: &nbsp;<span>{salesCheck}</span>
            </td>
            {/* <td style={{ fontSize: "14px" }}>
              3RD Party Order#: &nbsp;<span>093001184762</span>
            </td> */}
            <td style={{ fontSize: "14px" }}>
              Customer Name: &nbsp;
              <span>{shipToName}</span>
            </td>
          </tr>
        </table>

        <table
          align="center"
          border="0"
          cellPadding="0"
          cellSpacing="0"
          width="75%"
          className="dccdTable"
        >
          <tr>
            <td width="100%">
              <div
                style={{
                  // height: "60px",
                  width: "100%",
                  overflow: "auto",
                  overflowX: "hidden",
                }}
              >
                <table
                  align="center"
                  border="1"
                  cellPadding="0"
                  cellSpacing="0"
                  width="100%"
                  class="dccdTable"
                >
                  <thead>
                    <tr>
                      {/* <th>KSN</th> */}
                      <th style={{ textAlign: "center" }}>SKU</th>
                      {/* <th>3RD Party Item #</th> */}
                      <th style={{ textAlign: "center" }}>Description</th>
                      <th style={{ textAlign: "center" }}>Ord Qty</th>
                      <th style={{ textAlign: "center" }}>Stg Qty</th>
                      <th style={{ textAlign: "center" }}>Stg Bin</th>
                      <th style={{ textAlign: "center" }}>Ship Qty</th>
                      {/* <th>Putup Ship Qty</th> */}
                      <th style={{ textAlign: "center" }}>Status Code</th>
                    </tr>
                  </thead>
                  <tbody>{this.loadOrderDetailsItems()}</tbody>
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <table
                align="center"
                border="1"
                cellPadding="0"
                cellSpacing="0"
                width="100%"
                className="dccdTable"
              >
                <tr>
                  <th style={{ textAlign: "center" }}>Inbound Carton</th>
                  {inbCartons.ksn && (
                    <th style={{ textAlign: "center" }} name="subOrderNo">
                      KSN
                    </th>
                  )}
                  {inbCartons.sku && (
                    <th style={{ textAlign: "center" }} name="subOrderNo">
                      SKU
                    </th>
                  )}
                  {/* <th style={{ textAlign: "center" }} name="3RDPY">
                    3RD Pty Item
                  </th> */}
                  <th style={{ textAlign: "center" }}>Desc</th>
                  <th style={{ textAlign: "center" }}>Qty</th>
                </tr>
                <tr style={{ backgroundColor: "#87F717" }}>
                  <td style={{ width: "33%" }}>
                    <span name="barcode">
                      {_.get(stageScanResponseItem, "barcode")}
                    </span>
                  </td>
                  {inbCartons.ksn && (
                    <td style={{ width: "15%" }}>
                      <span name="ksn">{inbCartons.ksn || ""}</span>
                    </td>
                  )}
                  {inbCartons.sku && (
                    <td style={{ width: "15%" }}>
                      <span name="sku">{inbCartons.sku || ""}</span>
                    </td>
                  )}
                  {/* <td>
                    <span name="3RDPY"></span>
                  </td> */}
                  <td>
                    <span name="desc" style={{ width: "42%" }}>
                      {inbCartons.description || ""}
                    </span>
                  </td>
                  <td align="center" style={{ width: "10%" }}>
                    <span name="qty">{inbCartons.asnQty || 0}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <center>
          <button className="button1" onClick={this.onForceSplitShip}>
            Force Split Ship
          </button>
          <button className="button1">
            <Link to="/stagingBinSelection" style={{ color: "#000" }}>
              Stage
            </Link>
          </button>
          <button className="button1">
            <Link to="/stagingConfirmation" style={{ color: "#000" }}>
              Print
            </Link>
          </button>
          <button className="button1">
            <Link style={{ color: "#000" }} to="/scaleSelection">
              Print & Weigh
            </Link>
          </button>
          <button className="button1">
            <Link style={{ color: "#000" }} to="/">
              Cancel
            </Link>
          </button>
        </center>
      </>
    );
  }
}
