import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAllInvoices } from "../../../actions/invoiceActions";
import Select from 'react-select';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class SaleReport extends Component {

    state = {
        // data: [{ name: 'Page A', pv: 200, amt: 2400 },
        // { name: 'Page B', pv: 6000, amt: 2400 },
        yearData: [
            {
                label: '2018',
                value: '2018'
            },
            {
                label: '2019',
                value: '2019'
            }
        ],
        monthData: [
            {
                label: '11',
                value: '11'
            },
            {
                label: '12',
                value: '12'
            }
        ],
        data: [],
        options: [],
        idMaterial: '',
        selectedYear: '',
        selectedMonth: '',
    };

    componentDidMount() {
        this.props.getAllInvoices('');
        //this.setState({ selectedYear: (new Date()).getFullYear() });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { selectedYear, selectedMonth } = this.state;
        if (selectedYear === '') return;

        //ng dung chon thang thi hien thi 4 tuan trong thang
        //ng dung ko chon thang ma chi chon nam thi hien thi 12 thang trong nam do

        if (prevState.selectedYear !== selectedYear) {
            if (selectedMonth === '') {
                this.setState(state => {
                    let data = [...state.data];
                    for (let i = 0; i < 12; i++) {
                        data.push({ 'total': 0, 'month': i + 1, 'amt': 2400 });
                    }
                    this.props.invoice.invoices.map(el => {
                        if ((new Date(el.createddate)).getFullYear() == selectedYear) {
                            let month = (new Date(el.createddate)).getMonth() + 1;
                            switch (month) {
                                case 1:
                                    data[0]["total"] += el.totalAmt;
                                    return true;
                                case 2:
                                    data[1]["total"] += el.totalAmt;
                                    return true;
                                case 3:
                                    data[2]["total"] += el.totalAmt;
                                    return true;
                                case 4:
                                    data[3]["total"] += el.totalAmt;
                                    return true;
                                case 5:
                                    data[4]["total"] += el.totalAmt;
                                    return true;
                                case 6:
                                    data[5]["total"] += el.totalAmt;
                                    return true;
                                case 7:
                                    data[6]["total"] += el.totalAmt;
                                    return true;
                                case 8:
                                    data[7]["total"] += el.totalAmt;
                                    return true;
                                case 9:
                                    data[8]["total"] += el.totalAmt;
                                    return true;
                                case 10:
                                    data[9]["total"] += el.totalAmt;
                                    return true;
                                case 11:
                                    data[10]["total"] += el.totalAmt;
                                    return true;
                                case 12:
                                    data[11]["total"] += el.totalAmt;
                                    return true;
                                default:
                                    return false;
                            }
                        }
                    });
                    return {
                        data
                    }
                });
            }
        }

        if (prevState.selectedMonth !== selectedMonth) {
            this.setState(state => {
                let data = [...state.data];
                data = [];
                for (let i = 0; i < 4; i++) {
                    data.push({ 'total': 0, 'month': i + 1, 'amt': 2400 });
                    //month dong tren dung ra la "week" nhung luoi ve lai chart :)
                }
                this.props.invoice.invoices.map(el => {
                    if ((new Date(el.createddate)).getFullYear() == selectedYear) {

                        if ((new Date(el.createddate)).getMonth() + 1 == selectedMonth) {
                            let date = (new Date(el.createddate)).getDate();

                            switch (date) {
                                case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                                    data[0]["total"] += el.totalAmt;
                                    return true;
                                case 8: case 9: case 10: case 11: case 12: case 13: case 14:
                                    data[1]["total"] += el.totalAmt;
                                    return true;
                                case 15: case 16: case 17: case 18: case 19: case 20: case 21:
                                    data[2]["total"] += el.totalAmt;
                                    return true;
                                default:
                                    data[3]["total"] += el.totalAmt;
                                    return true;
                            }
                        }
                    }
                });
                return {
                    data
                }
            });
        }
    }

    onChangeSelectedYear = selectedItem => {
        this.setState({ selectedYear: selectedItem.value });
    }
    onChangeSelectedMonth = selectedItem => {
        this.setState({ selectedMonth: selectedItem.value });
    }
    onChangeSelectedMaterial = selectedMember => {
        this.setState({ idMaterial: selectedMember.value })
    }

    render() {
        const { isLoaded } = this.props;
        const { options, yearData, monthData } = this.state;
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

                                        <div style={container}>
                                            <div style={menuStyle}>
                                                <strong> Year</strong>
                                                <Select
                                                    onChange={this.onChangeSelectedYear}
                                                    isSearchable={true}
                                                    options={yearData}
                                                    placeholder="Select year..." >
                                                </Select>
                                            </div>
                                            <div style={menuStyle}>
                                                <strong> Month</strong>
                                                <Select
                                                    onChange={this.onChangeSelectedMonth}
                                                    isSearchable={true}
                                                    options={monthData}
                                                    placeholder="Select month..." >
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    {/* /.box-body */}
                                    <BarChart fill="#8884d8" width={700} height={300} data={this.state.data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" fill="#8884d8" barSize={40} />
                                    </BarChart>
                                    <br />
                                    <div className="col-sm-5">
                                        <div
                                            className="dataTables_info"
                                            id="example1_info"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            Chart show yearly or monthly sale report
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
    isLoaded: state.member.isLoaded,
    member: state.member,
    invoice: state.invoice,
});

export default connect(
    mapStateToProps,
    { getAllInvoices }
)(SaleReport);

const menuStyle = {
    display: 'inline-block',
    width: '20%',
    marginRight: '30px'
};

const container = {
    flexDirection: 'row',
    display: 'flex'
};