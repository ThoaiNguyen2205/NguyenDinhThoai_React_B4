import React, { Component } from "react";
import { connect } from "react-redux";
import { delPerson, editPerson } from "../redux/reducers/personReducer";

class InfoPerSon extends Component {
  render() {
    console.log(this.props);
    let { arrPerson } = this.props.personReducer;
    return (
      <table className="table text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>
              <i className="fa fa-cog"></i>
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
                    Del
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      const action = editPerson(person);
                      this.props.dispatch(action);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(InfoPerSon);
