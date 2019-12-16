import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePaySlip } from "../../../actions/payslipActions";
import { pushHistory } from "../../../actions/historyActions";

class PaySlipRow extends Component {
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
    this.props.pushHistory(`/payslip/edit/${id}`);
  };
  handleDelete = id => {
    this.props.deletePaySlip(id);
  };

  render() {
    const { payslip, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{payslip.idMember}</td>
        <td>{payslip.idSupplier}</td>
        <td>{this.convertDate(payslip.createddate)}</td>
        <td>{payslip.totalAmt}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(payslip._id)}
              type="button"
              className="btn btn-success"
            >
              Edit
            </button>

            <button
              onClick={() => this.handleDelete(payslip._id)}
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

export default connect(null, { deletePaySlip, pushHistory })(PaySlipRow);
