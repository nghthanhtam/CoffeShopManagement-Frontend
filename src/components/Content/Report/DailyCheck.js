import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteMember } from "../../../actions/memberActions";
import { updateQtyMaterial, getAllMaterials } from "../../../actions/materialActions"
import { addStorageReport } from "../../../actions/storageReportActions"
import { showNoti } from "../../../actions/notificationActions"
import { NotificationContainer } from 'react-notifications';
import PropTypes from "prop-types";
import Loader from "react-loader";
import Select from "react-select";

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
        notiType: "",
    };

    removeItem(index) {

        this.setState(state => {
            let rows = [...state.rows]
            rows.splice(index, 1);

            return {
                rows
            }
        });

        this.setState(state => {
            let options = [...state.options];
            options[index].disabled = false;
            return {
                options
            }
        });
    }

    createNotification = () => {
        this.props.showNoti(this.state.notiType);
        this.setState({ notiType: '' });
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
            // if (this.props.member.members.length === this.state.options.length) return;
            // else options = [];
            // this.props.member.members.map(el => {
            //     options.push({ 'value': el._id, 'label': el.name, 'quantityIndb': el.point })
            // });
            if (this.props.material.materials.length === this.state.options.length) return;
            else options = [];
            this.props.material.materials.map(el => {
                options.push({ 'value': el._id, 'label': el.name, 'quantityIndb': el.quantity, 'disabled': false })
            });
            return {
                options
            }
        });

        this.setState(state => {
            let rows = [...state.rows];
            rows = [...rows, { _id: this.state.index + 1, materialId: '', name: 'Select...', quantity: 0, quantitydb: 0, usedqty: 0, options: options, createAt: new Date() }];
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

            const newMaterial = {
                _id: el.materialId,
                quantity: el.quantity
            }
            this.props.updateQtyMaterial(newMaterial);

            const newItem = {
                _id: mongoose.Types.ObjectId(),
                idMember: 'tam test',
                idMaterial: el.materialId,
                createddate: new Date(),
                quantity: el.quantity
            };
            this.props.addStorageReport(newItem);
        });
    });

    componentDidMount() {
        this.props.getAllMaterials('');
    }

    componentDidUpdate(prevProps) {
        let storagereport = this.props.storagereport;
        if (prevProps.storagereport.storagereports !== this.props.storagereport.storagereports) {
            //khi luu cai storage report cuoi cung thi moi thong bao
            if (storagereport.storagereports[0].idMaterial === this.state.rows[0].materialId) {
                if (this.props.storagereport.response === 200) {
                    console.log('200')
                    this.setState({ notiType: 'success' });
                } else {
                    this.setState({ notiType: 'failure' });
                }
            }

        }
    }

    onSelect = (index, selectedMaterial) => {
        //selectedMaterial.quantity
        //selectedMaterial.value - _id
        //selectedMaterial.label - name

        this.setState(state => {
            let rows = [...state.rows];

            rows.map(el => {
                if (el._id === index + 1) {
                    const newItem = { _id: el._id, materialId: selectedMaterial.value, name: selectedMaterial.label, quantity: 0, quantitydb: selectedMaterial.quantityIndb, usedqty: 0, options: this.state.options, createAt: new Date() };
                    rows.splice(index, 1); //xoa 1 phan tu o vi tri index
                    rows.splice(index, 0, newItem); //chen newItem vao vi tri thu index   
                    return false;
                }
            });

            return {
                rows
            }
        });

    };

    onMenuOpen = selectedMaterial => {
        this.setState(state => {
            let options = [...state.options];
            options.map((el, index) => {
                if (this.state.rows.some(r => r.materialId === el.value)) {

                    options[index].disabled = true;
                }
                else options[index].disabled = false;
            })
            return {
                options
            }
        });
    }

    handleChoosePage = e => {
        this.setState({ currentPage: e }, () => {
            const { select, currentPage, query } = this.state;
            this.props.getMembers(select, currentPage, query);
        });
    };


    handleClick = (e, index) => {

        const val = e.target.textContent;
        this.setState(state => {
            let rows = [...state.rows];

            rows.map(el => {
                if (el._id == index + 1) {
                    //const newItem = { _id: index, materialId: selectedMaterial.value, quantity: 0, quantitydb: selectedMaterial.quantityIndb, usedqty: 0, options: this.state.options, createAt: new Date() };
                    //const newItem = { _id: el._id, materialId:el.materialId, quantity: el.quantityIndb - val, quantitydb: el.quantitydb, usedqty: val, options: this.state.options, createAt: new Date() };
                    const newItem = Object.assign(el);
                    newItem["quantity"] = el.quantitydb - val;
                    newItem["usedqty"] = val;
                    newItem["options"] = this.state.options;
                    newItem["createAt"] = new Date();

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
        const { disabled } = this.state;
        const { isLoaded } = this.props;

        return (
            <Fragment>
                {!isLoaded ? (
                    <Loader></Loader>
                ) : (
                        <React.Fragment>
                            {this.state.notiType !== "" ? (
                                this.createNotification()
                            ) : null}
                            <NotificationContainer />
                            {/* Content Header (Page header) */}
                            <section className="content-header">
                                <h1>
                                    Storage Report
                                {/* <small>Preview</small> */}
                                </h1>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="fake_url">
                                            <i className="fa fa-dashboard" /> Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="fake_url">Storage Report</a>
                                    </li>
                                </ol>
                            </section>
                            {/* Main content */}
                            <section className="content">
                                <div className="row">
                                    {/* left column */}
                                    <div className="col-md-12">
                                        <div className="box">
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
                                                                        <th style={{ width: "5%" }}></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.rows.map((el, index) => (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <Select
                                                                                onMenuOpen={() => this.onMenuOpen(el.materialId)}
                                                                                onChange={(e) => this.onSelect(index, e)}
                                                                                styles={{
                                                                                    control: (base, state) => ({
                                                                                        ...base,
                                                                                        borderColor: 'transparent',
                                                                                    }),
                                                                                }}
                                                                                value={{
                                                                                    value: el.materialId,
                                                                                    label: el.name
                                                                                }}
                                                                                options={el.options}
                                                                                isOptionDisabled={el => el.disabled === true}
                                                                            />
                                                                            <td bgcolor="#f4f4f4">{el.quantitydb}</td>
                                                                            <td onBlur={e => this.handleClick(e, index)} id="used-qty" bgcolor='#FFFFFF' style={inputField} contentEditable="true"></td>
                                                                            <td>{this.convertDate(el.createAt)}</td>
                                                                            <td><a style={{ cursor: 'pointer' }} onClick={() => this.removeItem(index)} className="fa fa-trash-o"></a></td>
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
    addStorageReport: PropTypes.func.isRequired,
    storagereport: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isLoaded: state.material.isLoaded,
    storagereport: state.storagereport,
    material: state.material,
});

export default connect(
    mapStateToProps,
    { deleteMember, addStorageReport, updateQtyMaterial, getAllMaterials, showNoti }
)(DailyCheck);

const inputField = {
    "&:focus": {
        outline: 'none',
    },
};