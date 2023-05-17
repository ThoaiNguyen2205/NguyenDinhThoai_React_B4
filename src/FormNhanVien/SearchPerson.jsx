import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import { searchPerson } from "../redux/reducers/personReducer";

class SearchPerson extends Component {
  handleOnSearch = (e) => {
    const { value } = e.target;
    const action = searchPerson(value);
    this.props.dispatch(action);
  };

  render() {
    // let { keyword } = this.props.personReducer;

    return (
      <div className="w-50 form-group my-3 mx-auto">
        <input
          type="search"
          name="keywork"
          //   value={keyword}
          disabled={this.props.personReducer.disabled}
          onChange={this.handleOnSearch}
          className="form-control bg-light"
          placeholder="Nhập tên sinh viên cần tìm....."
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SearchPerson);
