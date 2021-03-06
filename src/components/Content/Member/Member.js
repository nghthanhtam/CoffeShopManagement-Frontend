import React, { Component, Fragment } from "react";
import MemberModal from "./MemberModal";
import MemberRow from "./MemberRow";
import { connect } from "react-redux";
import { getMembers, deleteMember } from "../../../actions/memberActions";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";

const mapStateToProps = state => ({
  member: state.member,
  isLoaded: state.member.isLoaded
});

class Member extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: ""
  };

  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();
    this.getPages();
    this.props.getMembers(select, currentPage, query);
  }

  getTotalDocuments = () => {
    const { query } = this.state;
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/api/member/count/${newQuery}`)
      .then(response => {
        this.setState({ totalDocuments: response.data });
        console.log(response.data);
      })
      .catch(er => {
        console.log(er.response);
      });
  };

  getPages = () => {
    const { select, query } = this.state;
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/api/member/count/${newQuery}`)
      .then(response => {
        let pages = Math.floor(response.data / select);
        let remainder = response.data % select;
        let newArray = [];
        if (remainder !== 0) pages += 1;

        for (let i = 0; i < pages; i++) {
          newArray.push({ pageNumber: i + 1 });
        }

        this.setState({ pages: newArray });
      })
      .catch(er => {
        console.log(er.response);
      });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getMembers(select, currentPage, query);
      this.getPages();
      this.getTotalDocuments();
    });
  };

  handleChoosePage = e => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getMembers(select, currentPage, query);
    });
  };

  renderPageButtons = () => {
    const { pages, currentPage } = this.state;

    return pages.map(eachButton => (
      <li
        key={eachButton.pageNumber}
        className={
          currentPage === eachButton.pageNumber
            ? "paginae_button active"
            : "paginate_button "
        }
      >
        <a
          name="currentPage"
          href="fakehref"
          onClick={() => this.handleChoosePage(eachButton.pageNumber)}
          aria-controls="example1"
          data-dt-idx={eachButton.pageNumber}
          tabIndex={0}
        >
          {eachButton.pageNumber}
        </a>
      </li>
    ));
  };

  render() {
    const { members } = this.props.member;
    const { select, totalDocuments } = this.state;
    const { isLoaded } = this.props;

    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
          <React.Fragment>
            {/* Content Header (Page header) */}
            <section className="content-header">
              <h1>
                Member
                {/* <small>Preview</small> */}
              </h1>
              <ol className="breadcrumb">
                <li>
                  <a href="fake_url">
                    <i className="fa fa-dashboard" /> Home
                  </a>
                </li>
                <li>
                  <a href="fake_url">Member</a>
                </li>
              </ol>
            </section>
            {/* Main content */}
            <section className="content">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header" style={{ marginTop: "5px" }}>
                      <div style={{ paddingLeft: "5px" }} className="col-md-8">
                        <h3 className="box-title">
                          Data Table With Full Features
                        </h3>
                      </div>

                      <div className="col-md-4">
                        <MemberModal />
                      </div>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      <div
                        id="example1_wrapper"
                        className="dataTables_wrapper form-inline dt-bootstrap"
                      >
                        <div className="row">
                          <div>
                            <div className="col-sm-6">
                              <div
                                className="dataTables_length"
                                id="example1_length"
                              >
                                <label>
                                  Show
                                  <select
                                    onChange={this.handleOnChange}
                                    name="select"
                                    aria-controls="example1"
                                    style={{ margin: "0px 5px" }}
                                    className="form-control input-sm"
                                    value={this.state.select}
                                  >
                                    {this.state.sort.map(option => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.value}
                                      </option>
                                    ))}
                                  </select>
                                  entries
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="example1_filter"
                                className="dataTables_filter"
                              >
                                <label style={{ float: "right" }}>
                                  Search:
                                  <input
                                    type="search"
                                    name="query"
                                    style={{ margin: "0px 5px" }}
                                    className="form-control input-sm"
                                    placeholder="Find me  "
                                    aria-controls="example1"
                                    onChange={this.handleOnChange}
                                    value={this.state.query}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12">
                            <table
                              id="example1"
                              className="table table-bordered table-striped"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "5%" }}>#</th>
                                  <th style={{ width: "20%" }}>Member</th>
                                  <th style={{ width: "15%" }}>Phone</th>
                                  <th style={{ width: "15%" }}>Point</th>
                                  <th style={{ width: "15%" }}>Created date</th>
                                  <th style={{ width: "40%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {members.map((eachMember, index) => (
                                  <MemberRow
                                    onHandler={this.handler}
                                    history={this.props.history}
                                    key={eachMember._id}
                                    member={eachMember}
                                    index={index}
                                    isLoaded={isLoaded}
                                    // deleteCategory={this.props.deleteCategory}
                                  />
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th>#</th>
                                  <th>Member</th>
                                  <th>Phone</th>
                                  <th>Point</th>
                                  <th>Created date</th>
                                  <th>Action</th>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <div
                              className="dataTables_info"
                              id="example1_info"
                              role="status"
                              aria-live="polite"
                            >
                              Showing 1 to {select} of {totalDocuments} entries
                            </div>
                          </div>
                          <div className="col-sm-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="example1_paginate"
                            >
                              <ul
                                className="pagination"
                                style={{ float: "right" }}
                              >
                                {this.renderPageButtons()}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*/.col (left) */}
                    </div>
                    {/* /.row */}
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
          </React.Fragment>
        )}
      </Fragment>
    );
  }
}

Member.propTypes = {
  getMembers: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getMembers, deleteMember })(Member);
