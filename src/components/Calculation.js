import React, { Component } from "react";
import axios from "axios";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import "./Calculation.css";

class App extends Component {
    state = {
        amount: 1000,
        months: 10,
        interestRate: 0,
        monthlyPayment: 0,
        numPayments: 0
    };

    componentDidMount() {
        axios.get(
                `https://ftl-frontend-test.herokuapp.com/interest?amount=${
					this.state.amount
				}&numMonths=${this.state.months}`
            )
            .then(res => {
                this.setState({
                    interestRate: res.data.interestRate,
                    monthlyPayment: res.data.monthlyPayment.amount,
                    numPayments: res.data.numPayments
                });
            })
            .catch(e => console.log(e));
        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.amount !== prevState.amount ||
            this.state.months !== prevState.months
        ) {
            axios
                .get(
                    `https://ftl-frontend-test.herokuapp.com/interest?amount=${
						this.state.amount
					}&numMonths=${this.state.months}`
                )
                .then(res => {
                    console.log(res.data);
                    if (res.data.status && res.data.status === "error") {
                        console.log("Error occurred");
                    } else {
                        this.setState({
                            interestRate: res.data.interestRate,
                            monthlyPayment: res.data.monthlyPayment.amount,
                            numPayments: res.data.numPayments
                        });
                    }
                })
                .catch(e => console.log(e));
        }
    }

    formatAmountLabel = val => {
        return `$${val}`;
    };

    render() {
        return ( <
            >
            <div className="container w-100 eligibilitycalculator">
			    <div className="row justify-content-center">
			        <div className="col-sm-10">
			            <div className="panel panel-default">
			            	<div className="panel-heading">
								<h2 className="panel-title"><a>Calculate Loan EMI</a></h2>
							</div>
			                <div className="panel-body">
			                    <div className="form-group box-design">
			                        <h4>Loan Amount</h4>
			                        <InputRange maxValue={5000} minValue={500} value={this.state.amount} onChange={amount=> this.setState({ amount })}
			                            formatLabel={this.formatAmountLabel}
			                            />
			                    </div>
			                    <div className="form-group box-design">
			                        <h4>Tenor (in months)</h4>
			                        <InputRange maxValue={24} minValue={6} value={this.state.months} onChange={months=> this.setState({ months })}
			                            />
			                    </div>
			                    {/* Actual Data */}
			                    <div className="pointerspace">
			                        <div className="row">
			                            <div className="col-sm-4 greenpad">
			                                <div className="greentext2">
			                                    <p>Total Interest Payable</p>
			                                    <h2 className="totalIntPay">${this.state.interestRate}</h2>
			                                </div>
			                            </div>
			                            <div className="col-sm-4 greenpad1">
			                                <div className="newgreentext2">
			                                    <p>Monthly Payment</p>
			                                    <h2 className="TitalPayment1">${this.state.monthlyPayment}</h2>
			                                </div>
			                            </div>
			                            <div className="col-sm-4 greenpad2">
			                                <div className="newgreentext3">
			                                    <p>Monthly Payment</p>
			                                    <h2> <span className="loanEmiAmt">${this.state.numPayments}</span></h2>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                    {/* Actual Data end */}
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			</>
        );
    }
}

export default App;