import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteMember } from "../../../actions/memberActions";

class MemberRow extends Component {
  convertDate = date => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;
    // if (month < 10) {
    //   month = "0" + month;
    // }

    return year + "-" + month + "-" + dt;
  };
  handleEdit = id => {
    this.props.history.push(`/member/edit/${id}`);
  };
  handleDelete = id => {
    this.props.deleteMember(id);
  };

  render() {
    const { member, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{member.name}</td>
        <td>{member.phone}</td>
        <td>{member.point}</td>
        <td>{this.convertDate(member.createAt)}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(member._id)}
              type="button"
              className="btn btn-success"
            >
              Edit
            </button>

            <button
              onClick={() => this.handleDelete(member._id)}
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

export default connect(null, { deleteMember })(MemberRow);
