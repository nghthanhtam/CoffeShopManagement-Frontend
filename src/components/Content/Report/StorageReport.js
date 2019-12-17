import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAllMaterials } from "../../../actions/materialActions";
import { getSearchStorageReports } from "../../../actions/storageReportActions";
import Select from 'react-select';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import DateTimePicker from 'react-datetime-picker';

class StorageReport extends Component {

    state = {
        // data: [{ name: 'Page A', pv: 200, amt: 2400 },
        // { name: 'Page B', pv: 6000, amt: 2400 },

        data: [],
        options: [],
        idMaterial: '',
        startdate: null,
        enddate: null,
    };

    componentDidMount() {
        this.props.getSearchStorageReports('');
        this.props.getAllMaterials('');
    }

    convertDate = date => {
        const newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let dt = newDate.getDate();

        dt = dt < 10 ? `0${dt}` : dt;
        month = month < 10 ? `0${month}` : month;
        return dt + "/" + month;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { idMaterial, startdate, enddate } = this.state;

        if (prevState.idMaterial !== idMaterial ||
            prevState.startdate !== startdate ||
            prevState.enddate !== enddate) {

            if (idMaterial === '' || startdate === null || enddate === null) {
                return;
            }

            this.setState(state => {
                let data = [];
                for (let i = 0; i < 7; i++) {
                    data.push({ 'idMaterial': '', 'quantity': 0, 'name': '', 'amt': 2400 });
                }
                this.props.storagereport.storagereports.map((el, index) => {
                    let createddate = new Date(el.createddate);
                    console.log('crearedate:' + createddate);
                    console.log('enddate: ' + enddate);

                    if (el.idMaterial === idMaterial) {
                        if ((createddate > startdate && createddate < enddate) ||
                            (createddate.toDateString() == startdate.toDateString() ||
                                createddate.toDateString() == enddate.toDateString())) {
                            // const obj = data.find(i => i.idMaterial = el.idMaterial);
                            // if (obj) {
                            //     data[data.indexOf(obj)]["name"] = createddate;
                            //     data[data.indexOf(obj)]["quantity"] = el.quantity
                            // }
                            // else {
                            data[index]["quantity"] = el.quantity;
                            data[index]["name"] = this.convertDate(createddate);
                            //}
                            //data.push({ 'name': el.createddate, 'quantity': el.quantity, 'amt': 2400 })
                        }
                    }

                });

                return {
                    data
                }
            });
        }
    }


    onMenuOpen = () => {
        const { materials } = this.props.material;
        this.setState(state => {
            let options = [...state.options]
            if (materials.length === options) return;
            else options = [];

            materials.map(el => {
                options.push({ 'value': el._id, 'label': el.name })
            });
            console.log(materials)
            return {
                options
            }
        });
    };

    onChangeSelectedMaterial = selectedMaterial => {
        this.setState({ idMaterial: selectedMaterial.value })
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
                                            name='idMaterial'
                                            id='idMaterial'
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
                                    <BarChart fill="#8884d8" width={500} height={350} data={this.state.data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="quantity" fill="#8884d8" barSize={30} />
                                    </BarChart>
                                    <br />
                                    <div className="col-sm-5">
                                        <div
                                            className="dataTables_info"
                                            id="example1_info"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            Chart only shows quantity in 7 latest days
                                        </div>
                                    </div>
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
    isLoaded: state.material.isLoaded,
    material: state.material,
    storagereport: state.storagereport,
});

export default connect(
    mapStateToProps,
    { getAllMaterials, getSearchStorageReports }
)(StorageReport);

const menuStyle = {
    display: 'inline-block',
};