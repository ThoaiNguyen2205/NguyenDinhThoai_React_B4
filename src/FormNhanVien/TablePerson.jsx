import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPerson,
  changeInput,
  handleError,
  resetForm,
  updatePerson,
} from "../redux/reducers/personReducer";

class TablePerson extends Component {
  handleSubmit = (e) => {
    let { values, errors } = this.props.personReducer;
    e.preventDefault();
    for (let key in errors) {
      if (errors[key] !== "") {
        alert("Vui lòng nhập đúng dữ liệu !");
        return;
      }
    }
    const action = addPerson(values);
    this.props.dispatch(action);
    this.handleReset();
  };
  handleUpdate = () => {
    let { values, errors } = this.props.personReducer;
    for (let key in errors) {
      if (errors[key] !== "") {
        alert("Vui lòng nhập dữ liệu !");
        return;
      }
    }
    const action = updatePerson({ id: values.id, value: values });
    this.props.dispatch(action);
    this.handleReset();
  };
  handleChangeInput = (e) => {
    let { id, value } = e.target;
    const action = changeInput({ id, value });
    this.props.dispatch(action);
    this.handleValidation(e);
  };
  handleReset = () => {
    const action = resetForm(this.props.personReducer);
    this.props.dispatch(action);
    console.log("action reset", action);
  };
  handleValidation = (e) => {
    let { id, value } = e.target;
    let dataType = e.target.getAttribute("data-type");
    let dataMinLength = e.target.getAttribute("data-minlength");
    let dataMaxLength = e.target.getAttribute("data-maxlength");

    let newError = { ...this.props.personReducer.errors };
    let messError = "";
    if (value.trim() === "") {
      messError = id + " không được bỏ trống !";
    } else {
      if (dataType) {
        switch (dataType) {
          case "number": {
            let regexNumber = /^-?\d*\.?\d+$/;
            if (!regexNumber.test(value)) {
              messError = id + " phải là số !";
            }
            break;
          }
          case "string": {
            let regexString =
              /^[a-z A-Z xyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđÁÂẢÝẾỐỚÍƯĐÊ]+$/;
            if (!regexString.test(value)) {
              messError = id + " phải là ký tự !";
            }
            break;
          }
          case "email": {
            let regexEmail =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!regexEmail.test(value)) {
              messError = id + " không hợp lệ !";
            }
            break;
          }
        }
      }
      if (dataMinLength) {
        if (value.length < dataMinLength) {
          messError =
            id + " từ " + dataMinLength + " đến " + dataMaxLength + " kí tự !";
        }
      }
      if (dataMaxLength) {
        if (value.length > dataMaxLength) {
          messError =
            id + " từ " + dataMinLength + " đến " + dataMaxLength + " kí tự !";
        }
      }
      if (id === "id") {
        let regexNumber = /^([a-zA-Z0-9]+)$/;
        if (!regexNumber.test(value)) {
          messError = id + " không đúng định dạng !";
        }
        let { arrPerson } = this.props.personReducer;
        const idPer = arrPerson.map((per) => per.id.toLowerCase());
        if (idPer.includes(value.toLowerCase())) {
          messError = id + " đã tồn tại !";
        }
      }
    }
    newError[id] = messError;
    const action = handleError({ id, value: messError });
    this.props.dispatch(action);
  };
  render() {
    let { values, errors } = this.props.personReducer;
    return (
      <div className=" ">
        <h2 className="text-white text-center bg-dark py-2 mx-0">
          Thông tin sinh viên
        </h2>
        <div className="">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>Mã sinh viên</p>
                  <input
                    disabled={this.props.personReducer.disabled}
                    className="form-control"
                    data-minlength={4}
                    data-maxlength={6}
                    id="id"
                    value={values.id}
                    onInput={this.handleChangeInput}
                  />
                  <p className="text-danger">{errors.id}</p>
                </div>
                <div className="form-group">
                  <p>Số điện thoại</p>
                  <input
                    className="form-control"
                    data-type="number"
                    id="phone"
                    value={values.phone}
                    onInput={this.handleChangeInput}
                  />
                  <p className="text-danger">{errors.phone}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Họ tên</p>
                  <input
                    className="form-control"
                    id="name"
                    data-type="string"
                    value={values.name}
                    onInput={this.handleChangeInput}
                  />
                  <p className="text-danger">{errors.name}</p>
                </div>
                <div className="form-group">
                  <p>Email</p>
                  <input
                    className="form-control"
                    data-type="email"
                    id="email"
                    value={values.email}
                    onInput={this.handleChangeInput}
                  />
                  <p className="text-danger">{errors.email}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={this.props.personReducer.disabled}
            >
              Add person
            </button>
            <button
              type="button"
              disabled={this.props.personReducer.disUpdate}
              className="btn btn-success mx-3"
              onClick={() => {
                this.handleUpdate();
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TablePerson);
