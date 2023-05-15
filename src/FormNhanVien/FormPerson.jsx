import React, { Component } from "react";
import { connect } from "react-redux";
import TablePerson from "./TablePerson";
import InfoPerSon from "./InfoPerSon";
import SearchPerson from "./SearchPerson";

export class FormPerson extends Component {
  render() {
    return (
      <div className="container">
        <TablePerson />
        <SearchPerson />
        <InfoPerSon />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FormPerson);
