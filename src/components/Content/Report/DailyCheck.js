import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    getSearchMembers,
    deleteMember
} from "../../../actions/memberActions";
import { addStorageReport } from "../../../actions/storageReportActions"
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";
import Select from 'react-select';

const mongoose = require("mongoose");

class DailyCheck extends Component {

    state = {
        sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
        select: "5",
        currentPage: 1,
        pages: [],
        totalDocuments: 0,
        query: "",
        rows: [],
        options: [],
        index: 0,
    };

    convertDate = date => {
        const newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let dt = newDate.getDate();

        dt = dt < 10 ? `0${dt}` : dt;
        month = month < 10 ? `0${month}` : month;

        return year + "-" + month + "-" + dt;
    };

    addRow = () => {

        let options = [...this.state.options]
        this.setState(state => {
            if (this.props.member.members.length === this.state.options.length) return;
            else options = [];
            this.props.member.members.map(el => {
                options.push({ 'value': el._id, 'label': el.name, 'quantityIndb': el.point })
            });

            return {
                //...state.options,
                options
            }
        });

        this.setState(state => {
            let rows = [...state.rows];
            rows = [...rows, { _id: this.state.index + 1, materialId: '', quantity: 0, quantitydb: 0, usedqty: 0, options: options, createAt: new Date() }];
            return {
                ...state.rows,
                rows
            }
        });
        this.setState({ index: this.state.index + 1 });
    };

    onSubmit = (e => {
        this.state.rows.map(el => {
            e.preventDefault();

            // axios
            //     .put(`/api/material/${el.materialId}`, { quantity: el.quantity })
            //     .then(response => {
            //         console.log(response.data);
            //     })
            //     .catch(error => {
            //         console.log(error.response);
            //     });

            const newItem = {
                _id: mongoose.Types.ObjectId(),
                idMember: 'abc',
                idMaterial: 'abc',
                createddate: new Date(),
                quantity: 30
            };
            this.props.addStorageReport(newItem);
        });
    });

    componentDidMount() {
        const { } = this.state;
        this.props.getSearchMembers('');
    }

    getTotalDocuments = () => {
        const { query } = this.state;
        console.log(query);
        let newQuery = "";
        if (query === "") newQuery = "undefined";
        else newQuery = query;

        axios
            .get(`/api/member/count/${newQuery}`)
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
        console.log(query);
        let newQuery = "";
        if (query === "") newQuery = "undefined";
        else newQuery = query;

        axios
            .get(`/api/member/count/${newQuery}`)
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

    onSelect = (selectedMaterial, index) => {
        //selectedMaterial.quantity
        //selectedMaterial.value - _id
        //selectedMaterial.label - name

        this.setState(state => {
            let rows = [...state.rows];

            rows.map(el => {
                if (el._id === index + 1) {
                    const newItem = { _id: index, MaterialId: selectedMaterial.value, quantity: 0, quantitydb: selectedMaterial.quantityIndb, usedqty: 0, options: this.state.options, createAt: new Date() };
                    rows.splice(index, 1); //xoa 1 phan tu o vi tri index
                    rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index
                }
            });

            return {
                rows
            }
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

    renderPageButtons = (event) => {
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

    handleClick = (e, index) => {
        const val = e.target.textContent;
        this.setState(state => {
            let rows = [...state.rows];

            rows.map(el => {
                if (el._id == index + 1) {
                    const newItem = { _id: el._id, quantity: el.quantityIndb - val, quantitydb: el.quantityIndb, usedqty: val, options: this.state.options, createAt: new Date() };
                    rows.splice(index, 1); //xoa 1 phan tu o vi tri index
                    rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index

                }
            });
            return {
                rows
            }
        });
    };

    render() {
        const { members } = this.props.member;
        const { select, totalDocuments, pages, options } = this.state;
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
                                                    <h3 className="box-title">Data Table With Full Features</h3>
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
                                                                    <button
                                                                        type="button"
                                                                        id="btnAdd"
                                                                        style={{ float: "left" }}
                                                                        className="btn btn-primary"
                                                                        data-toggle="modal"
                                                                        onClick={this.addRow}
                                                                    >
                                                                        + Add
                                  </button>
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
                                                                        <th style={{ width: "15%" }}>Material</th>
                                                                        <th style={{ width: "15%" }}>Quantity</th>
                                                                        <th style={{ width: "15%" }}>Used Quantity</th>
                                                                        <th style={{ width: "15%" }}>Created date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.rows.map((el, index) => (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <Select
                                                                                onChange={e => this.onSelect(e, index)}
                                                                                styles={{
                                                                                    control: (base, state) => ({
                                                                                        ...base,
                                                                                        borderColor: 'transparent',
                                                                                    }),
                                                                                }}
                                                                                border='false'
                                                                                name='idMaterial'
                                                                                id='idMaterial'
                                                                                options={el.options}>
                                                                            </Select>
                                                                            <td bgcolor="#f4f4f4">{el.quantitydb}</td>
                                                                            <td onBlur={e => this.handleClick(e, index)} id="used-qty" bgcolor='#FFFFFF' style={inputField} contentEditable="true"></td>
                                                                            <td>{this.convertDate(el.createAt)}</td>
                                                                        </tr >
                                                                    ))}
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Material</th>
                                                                        <th>Quantity</th>
                                                                        <th>Used Quantity</th>
                                                                        <th>Created date</th>
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
                                                                Input material quantity at the end of the day
                        </div>
                                                        </div>
                                                        <div className="col-sm-7">
                                                            <div
                                                                className="dataTables_paginate paging_simple_numbers"
                                                                id="example1_paginate"
                                                            >
                                                                <button
                                                                    type="button"
                                                                    id="btnSubmit"
                                                                    style={{ float: "right" }}
                                                                    className="btn btn-primary"
                                                                    onClick={this.onSubmit}
                                                                >
                                                                    Submit
                                  </button>
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

DailyCheck.propTypes = {
    getSearchMembers: PropTypes.func.isRequired,
    addStorageReport: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    member: state.member,
    isLoaded: state.member.isLoaded,
    storagereport: state.storagereport
});

export default connect(
    mapStateToProps,
    { getSearchMembers, deleteMember, addStorageReport }
)(DailyCheck);

const inputField = {
    "&:focus": {
        outline: 'none',
    },
};