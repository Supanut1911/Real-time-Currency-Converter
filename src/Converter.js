import React , { Component } from 'react'

class Converter extends Component {
    state = {
        currencies: ['USD', 'AUD', 'SGD', 'PHP', 'EUR', 'THB'],
        base: 'USD',
        amount: '',
        convertTo: 'EUR',
        result: '',
        date: ''    
    }

    handleSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            result : null
        },
        this.calculate
        )
    }

    handleInput = (e) => {
        this.setState({
            amount: e.target.value,
            result: null
        },
        this.calculate
        )
    }

    calculate = () => {
        const amount = this.state.amount
        if (amount === isNaN) {
            return
        } else {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const date = data.date
                const result = (data.rates[this.state.convertTo] * amount).toFixed(4)
                this.setState({
                    result, date
                })
            })
        }
    }

    handleSwap = (e) => {
        const base = this.state.base
        const convertTo = this.state.convertTo
        e.preventDefault()
        this.setState({
            convertTo: base,
            base: convertTo,
            result: null
        },
        this.calculate
        )
    }

    render() {

        const {currencies, base, amount ,convertTo, result, date} = this.state

        return(
            <div className = "container my-5">
                <div className = "row">
                    <div className = "col-lg-6 mx-auto">
                    <div className = "card card-body">
                        <h5>{amount} {base} is equal to </h5>
                        <h2>{result === null ? "Calculating..." : result} {convertTo}</h2>
                        <p>As of {date}</p>
                    <div className = "row">
                        <div className = "col-lg-10 col-md-10 col-sm-10">
                                {/* form1 */}
                                <form className = "form-inline mb-4">
                                <input
                                    type = "number"
                                    value = {amount}
                                    onChange = {this.handleInput}
                                    className = "form-control form-contorl-lg mx-3"/>
                                <select 
                                 name = "base"
                                 value = {base}
                                 onChange = {this.handleSelect}
                                className = "form-contorl form-contorl-lg">
                                    {currencies.map(currency => (
                                        <option key = {currency}value = {currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                                </form>
                                {/* form2 */}
                                <form className = "form-inline mb-4">
                                <input 
                                 disabled={true} 
                                 value = {result === null ? 'Calculating' : result}
                                 className = "form-control form-contorl-lg mx-3"/>
                                <select 
                                  name = "convertTo"
                                  value = {convertTo}
                                  onChange = {this.handleSelect}
                                  className = "form-contorl form-contorl-lg">
                                    {currencies.map(currency => (
                                        <option key = {currency}value = {currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                                </form>
                        </div>
                                <div className = "col-lg-2 col-md-2 col-sm-2 align-self-center">
                                    <button type="button" class="btn btn-primary" onClick={this.handleSwap}>Swap</button>
                                        {/* <h1 onClick={this.handleSwap} className = "swap ">&#8595;&#8593;</h1> */}
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            
        )
    }
}

export default Converter