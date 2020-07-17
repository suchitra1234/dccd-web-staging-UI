import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { getOrderType } from "../APIMocks";
// import { singleOrder } from "../Actions/index";
import { apiRepo } from "../repository/apiRepo";

export default class stagingScanCarton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      error: null,
      scanText: "",
      printer: null,
      redirect: false,
      redirectToMultiOrder: false,
    };
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.onGoBtnClick = this.onGoBtnClick.bind(this);
  }

  onInputValueChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
      isError: false,
      isPrinterError: false,
    });
  };

  onGoBtnClick() {
    const {
      scanText,
      // printer
    } = this.state;
    if (!scanText) {
      this.setState({
        isError: true,
      });
    }
    // else if (!printer) {
    //   this.setState({
    //     isPrinterError: true,
    //   });
    // }
    else {
      // this.setState({
      //   redirect: true,
      // });

      apiRepo
        .serviceCall("get", "/multi")
        .then((res) => {
          const { multiorder } = res.data;
          this.setState({
            redirect: true,
            redirectToMultiOrder: multiorder,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            err: err,
          });
        });

      // singleOrder()
      //   .then((res) => {
      //     const { multiorder } = res;
      //     this.setState({
      //       redirect: true,
      //       redirectToMultiOrder: multiorder,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.setState({
      //       err: err,
      //     });
      //   });
    }
  }

  render() {
    const {
      isError,
      scanText,
      isPrinterError,
      redirect,
      redirectToMultiOrder,
    } = this.state;
    if (redirect && !redirectToMultiOrder) {
      return (
        <Redirect
          to={{
            pathname: "/stagingPrintItem",
            state: { multiorder: false, barcode: scanText },
          }}
        />
      );
    } else if (redirect && redirectToMultiOrder) {
      return (
        <Redirect
          to={{
            pathname: "/stagingItemSelection",
            state: { multiorder: true },
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
          border="0"
          width="100%"
        >
          <tr>
            <th
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              Scan the Carton Barcode, or Enter Salescheck/Suborder#:
            </th>
          </tr>
          {(isError || isPrinterError) && (
            <tr height="15px">
              <td align="center">
                &nbsp;
                <div className="errors">
                  {isPrinterError ? "Please select a printer" : "Invalid entry"}
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td align="center">
              <input
                type="text"
                name="scanText"
                value={scanText}
                size="30"
                maxlength="26"
                onChange={this.onInputValueChange}
              />
              <button className="goButton" onClick={this.onGoBtnClick}>
                Go
              </button>
            </td>
          </tr>
          <tr height="7px">
            <th>&nbsp;</th>
          </tr>
          {/* <tr>
            <td align="center">
              <select name="printer" onChange={this.onInputValueChange}>
                <option>--Select Printer--</option>
                <option value="Test Printer 444">Test Printer 444</option>
                <option value="Test Printer 555">Test Printer 555</option>
                <option value="Test Printer 666">Test Printer 666</option>
              </select>
            </td>
          </tr> */}
          <tr height="7px">
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align="center">
              <table
                align="center"
                cellPadding="0"
                cellSpacing="0"
                border="0"
                width="100%"
              >
                <tr>
                  <td align="center">
                    <input type="button" value="Main Menu" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </>
    );
  }
}
