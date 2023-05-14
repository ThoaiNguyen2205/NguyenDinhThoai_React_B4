import React, { Component } from "react";
import { connect } from "react-redux";
import TablePerson from "./TablePerson";
import InfoPerSon from "./InfoPerSon";

export class FormPerson extends Component {
  render() {
    return (
      <div>
        <TablePerson />
        <InfoPerSon />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FormPerson);
