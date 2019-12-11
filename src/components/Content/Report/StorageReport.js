import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    getSearchMembers
} from "../../../actions/memberActions";
import { getSearchStorageReports } from "../../../actions/storageReportActions";
import Select from 'react-select';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


class StorageReport extends Component {

    state = {
        // data: [{ name: 'Page A', pv: 200, amt: 2400 },
        // { name: 'Page B', pv: 6000, amt: 2400 },
        // { name: 'Page C', pv: 1800, amt: 2400 },
        // { name: 'Page D', pv: 700, amt: 2400 }]
        data: [],
        options: [],
        idMaterial: '',
        startdate: null,
        enddate: null,
    };

    componentDidMount() {
        this.props.getSearchStorageReports('');
        this.props.getSearchMembers('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { idMaterial, startdate, enddate } = this.state;
        // if (this.props.storagereport.storagereports.length !== this.state.data.length) {

        //     this.setState(state => {
        //         let data = [...state.data]
        //         this.props.storagereport.storagereports.map(el => {
        //             data.push({ 'name': el.idMaterial, 'pv': 500, 'amt': 2400 })
        //         });
        //         return {
        //             data
        //         }
        //     });
        // }

        if (prevState.idMaterial !== idMaterial ||
            prevState.startdate !== startdate ||
            prevState.enddate !== enddate) {

            if (idMaterial === '' || startdate === null || enddate === null) {
                return;
            }

            this.setState(state => {
                let data = [];
                this.props.storagereport.storagereports.map(el => {
                    let createddate = new Date(el.createddate.toString());

                    if (createddate.getDate() >= startdate.getDate() && createddate.getDate() <= enddate.getDate()
                        && createddate.getMonth() >= startdate.getMonth() && createddate.getMonth() <= enddate.getMonth()
                        && createddate.getFullYear() >= startdate.getFullYear() && createddate.getFullYear() <= enddate.getFullYear()) {

                        data.push({ 'name': el.createddate, 'pv': 500, 'amt': 2400 })
                    }
                });

                return {
                    data
                }
            });
        }
    }


    onMenuOpen = () => {
        const { members } = this.props.member;
        this.setState(state => {
            let options = [...state.options]
            if (members.length === options) return;
            else options = [];

            members.map(el => {
                options.push({ 'value': el._id, 'label': el.name })
            });
            return {
                options
            }
        });
    };

    onChangeSelectedMaterial = selectedMember => {
        this.setState({ idMaterial: selectedMember.value })
    }
    onStartDateChange = date => {
        this.setState({ startdate: date });
    }
    onEndDateChange = date => {
        this.setState({ enddate: date });
    }

    render() {
        const { isLoaded } = this.props;
        const { options } = this.state;
        return (
            <Fragment>
                {/* {!isLoaded ? (
                    <Loader></Loader>
                ) : ( */}
                {/* Content Header (Page header) */}
                <section className="content-header">

                </section>
                {/* Main content */}
                <section className="content">

                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            <div className="box">
                                {/* /.box-header */}
                                <div className="box-body">
                                    <div className="box-body">
                                        <strong> Material</strong>
                                        <Select
                                            name='idMember'
                                            id='idMember'
                                            onMenuOpen={this.onMenuOpen}
                                            onChange={this.onChangeSelectedMaterial}
                                            isSearchable={true}
                                            options={options}
                                            placeholder="Select material..."
                                            required>
                                        </Select>
                                        {/* <input
                                        style={{ opacity: 0, height: 0 }}
                                         required
                                        value={invisibleInpMemVal}
                                        /> */}
                                        <br />
                                        <strong> Report Date</strong>
                                        <br />
                                        <div style={menuStyle}>
                                            <DateTimePicker
                                                name="startdate"
                                                onChange={this.onStartDateChange}
                                                value={this.state.startdate}

                                            />
                                            <DateTimePicker
                                                name="enddate"
                                                onChange={this.onEndDateChange}
                                                value={this.state.enddate}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    {/* /.box-body */}
                                    <BarChart fill="#8884d8" width={200} height={350} data={this.state.data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#8884d8" />
                                    </BarChart>
                                </div>
                                {/* /.row */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}

                {/* )} */}
            </Fragment >
        );
    }
}

const mapStateToProps = state => ({
    isLoaded: state.member.isLoaded,
    member: state.member,
    storagereport: state.storagereport,
});

export default connect(
    mapStateToProps,
    { getSearchMembers, getSearchStorageReports }
)(StorageReport);

const menuStyle = {
    display: 'inline-block',
};