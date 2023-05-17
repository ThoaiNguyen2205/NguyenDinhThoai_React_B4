import React, { Component } from "react";
import { connect } from "react-redux";
import {
  delPerson,
  editError,
  editPerson,
} from "../redux/reducers/personReducer";

class InfoPerSon extends Component {
  handleChangeErrors = () => {
    const action = editError(this.props.personReducer.editErrors);
    this.props.dispatch(action);
    // console.log("actionError", action);
  };
  render() {
    // console.log(this.props);
    // console.log("keyword", this.props.personReducer.keyword);
    let { arrPerson } = this.props.personReducer;
    return (
      <div className="">
        <table className=" text-center table  table-bordered ">
          <thead className="bg-dark text-white">
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>
                <i className="fa fa-cogs"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {arrPerson.map((person, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>{person.id}</td>
                  <td>{person.name}</td>
                  <td>{person.phone}</td>
                  <td>{person.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        const action = delPerson(person.id);
                        this.props.dispatch(action);
                      }}
                      disabled={this.props.personReducer.disabled}
                    >
                      <i className="fa fa-trash-alt me-2"></i>Del
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        const action = editPerson(person);
                        this.props.dispatch(action);
                        this.handleChangeErrors();
                      }}
                    >
                      <i className="fa fa-edit me-2"></i>Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(InfoPerSon);
