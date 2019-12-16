import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteSupplier } from "../../../actions/supplierActions";

class SupplierRow extends Component {
  convertDate = date => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;

    return year + "-" + month + "-" + dt;
  };
  handleEdit = id => {
    this.props.history.push(`/supplier/edit/${id}`);
  };
  handleDelete = id => {
    // console.log(id);

    this.props.deleteSupplier(id);
  };
  render() {
    const { supplier, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{supplier.name}</td>
        <td>{supplier.phone}</td>
        <td>{supplier.address}</td>
        <td>{this.convertDate(supplier.createAt)}</td>
        <td>Uknown</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(supplier._id)}
              type="button"
              className="btn btn-success"
            >
              Edit
            </button>

            <button
              onClick={() => this.handleDelete(supplier._id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteSupplier })(SupplierRow);
