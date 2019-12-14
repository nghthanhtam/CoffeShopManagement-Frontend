import React, { Fragment, Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { pushHistory } from "../../../actions/historyActions";
import Loader from "react-loader";
import { updateMaterial } from "../../../actions/materialActions";

class MaterialEdit extends Component {
  state = {
    name: "",
    quantity: 0,
    _id: ""
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/material/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then(response => {
        console.log(response.data);
        if (!response.data) this.props.history.push("/404");
        else {
          const { name, quantity, _id } = response.data;
          this.setState({
            name,
            quantity,
            _id
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  tokenConfig = token => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    //Header
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    const { _id, name, quantity } = this.state;
    e.preventDefault();

    const newMaterial = {
      name,
      quantity,
      _id
    };

    // axios
    //   .put(`/api/material/${_id}`, newMaterial)

    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
    this.props.updateMaterial(newMaterial);

    //Quay về trang chính
    this.props.history.push("/material");
  };

  handleCancel = e => {
    this.props.history.push("/material");
  };
  render() {
    const { name, quantity, _id } = this.state;
    console.log(quantity);

    return (
      <Fragment>
        {!_id ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            {/* Content Header (Page header) */}
            <section className="content-header">
              <h1>
                Material
                {/* <small>Preview</small> */}
              </h1>
              <ol className="breadcrumb">
                <li>
                  <a href="fake_url">
                    <i className="fa fa-dashboard" /> Home
                  </a>
                </li>
                <li>
                  <a href="fake_url">Material</a>
                </li>
                <li>
                  <a href="fake_url">Edit</a>
                </li>
              </ol>
            </section>
            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">Material Edit Form</h3>
                    </div>
                    {/* /.box-header */}
                    {/* form start */}
                    <form
                      className="form-horizontal"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="box-body">
                        <div className="form-group">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-2 control-label"
                          >
                            ID
                          </label>
                          <div className="col-sm-10">
                            <input
                              name="_id"
                              type="text"
                              id="inputEmail3"
                              placeholder="Loading..."
                              className="form-control"
                              value={_id}
                              disabled
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Name</label>
                          <div className="col-sm-10">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              id="materialName"
                              placeholder="Loading..."
                              value={name}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">
                            Quantity
                          </label>
                          <div className="col-sm-10">
                            <input
                              name="quantity"
                              type="text"
                              className="form-control"
                              id="materialQuantity"
                              placeholder="Loading..."
                              value={quantity}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* /.box-body */}
                      <div className="box-footer">
                        <button
                          type="button"
                          onClick={this.handleCancel}
                          className="btn btn-default"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-info pull-right"
                        >
                          Save
                        </button>
                      </div>
                      {/* /.box-footer */}
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  pushHistory,

  updateMaterial
})(MaterialEdit);
