import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class stagingConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      redirect: false,
    };
    this.onOKClick = this.onOKClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onInputValueChange = this.onInputValueChange.bind(this);
  }

  onOKClick() {
    this.setState({
      redirect: true,
    });
  }

  onCancelClick() {
    this.setState({
      redirect: true,
    });
  }

  onInputValueChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
      isError: false,
    });
    if (name === "cartonTypeSelect") {
      this.setState({
        envelopeTypeSelect: false,
      });
    } else if (name === "envelopeTypeSelect") {
      this.setState({
        cartonTypeSelect: false,
      });
    }
  };

  render() {
    const {
      isError,
      redirect,
      cartonTypeSelect,
      envelopeTypeSelect,
    } = this.state;
    if (redirect) {
      return <Redirect to={`/`} />;
    }
    return (
      <div style={{ margin: "0px", padding: "0px", textAlign: "center" }}>
        <h3>Print Confirmation: UPS</h3>
        <tr>
          <td>{isError && <div className="errors">Some Error</div>}</td>
        </tr>
        Click OK to Print Label/Packlist <br />
        <br />
        Carton or Envelope?
        <br />
        <br />
        <table align="center">
          <tr>
            <td>
              <input
                type="radio"
                name="selectType"
                value={cartonTypeSelect}
                checked
                onChange={this.onInputValueChange}
              />
              Carton
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="radio"
                name="selectType"
                value={cartonTypeSelect}
                checked={envelopeTypeSelect}
              />
              Envelope
              <br />
            </td>
          </tr>
        </table>
        <br />
        <input
          type="button"
          style={{ fontSize: "medium", marginRight: "5px" }}
          name="OK"
          value="OK"
          onClick={this.onOKClick}
        />
        <input
          type="button"
          style={{ fontSize: "medium" }}
          name="cancel"
          value="Cancel"
          onClick={this.onCancelClick}
        />
      </div>
    );
  }
}
