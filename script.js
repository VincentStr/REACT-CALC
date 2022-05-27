class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentVal: [],
            output: 0,
            setDecimal: true,
            setZero: false,
            newNum: false,
            
        }
        this.handleNums = this.handleNums.bind(this);
        this.hanldeOper = this.hanldeOper.bind(this);
        this.hanldeIntial = this.hanldeIntial.bind(this);
        this.handleOut = this.handleOut.bind(this);
        this.handleEval = this.handleEval.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);

    }

    handleNums(e) {
        const value = e.target.value
       
        if (value == "0") {
            if (this.state.setZero || !this.state.currentVal.length || (this.state.newNum && this.state.currentVal[this.state.currentVal.length-1] != 0) ) {
               
                this.state.currentVal.push(value)
            }
        } else {
            if (this.state.currentVal[0] === "0") {
               
                this.state.currentVal.shift()
            }

            if(this.state.newNum && this.state.currentVal[this.state.currentVal.length-1]  == 0){
                this.state.currentVal.pop()
            }

            this.state.currentVal.push(value)
          
            this.setState({ setZero: true, newNum: false })
        }


        this.handleOut()
    }

    hanldeOper(e) {
        const value = e.target.value

        const prev = this.state.currentVal.length - 1
        const prevVal = this.state.currentVal[prev]
        const prePreVal = this.state.currentVal[prev - 1]

        this.setState({ setDecimal: true, newNum: true , setZero: false});

        if (prevVal) {

            if (value == " - ") {
               
                if (prevVal >= 0) {
                    this.state.currentVal.push(value)
                }
                else {
                    if (prePreVal >= 0) {
                        this.state.currentVal.push(value)
                    }
                }
            } else {

                if (prevVal >= 0 || prevVal == ".") {

                    this.state.currentVal.push(value)
                }

                else {
                    if (prevVal == " - ") {

                        this.state.currentVal.pop()
                        this.state.currentVal.pop()
                        this.state.currentVal.push(value)

                    }
                    else {
                     
                        this.handleOut()
                    }
                }
            }


        }
        else {
            if (value == " - ") {

                this.state.currentVal.push(value)
            } else {

            }
        }


        this.handleOut()
    }

    handleClear = (event) => {
        const length = this.state.currentVal.length
        if (length > 0) {
         

            this.state.currentVal.pop()
            this.state.currentVal.includes(".") ? null : this.setState({ setDecimal: true })
            this.state.currentVal.length == 0 ? this.setState({ setZero: false }) : null
            length !== 1 ? this.handleOut() : this.setState({ output: 0 })

        }
    }


    hanldeIntial() {
        this.setState(
            {
                currentVal: [],
                output: 0,
                setDecimal: true,
                setZero: false
            }
        )
    }

    handleOut() {

        if(this.state.currentVal.length < 26){
            const out = this.state.currentVal.join("")
            this.setState({ output: out })
        } else{
            this.setState({output: "Too long to display"})
        }
        
     
    }
    handleDecimal(e) {

        const value = e.target.value
        const prevVal = this.state.currentVal[this.state.currentVal.length - 1]

        if (this.state.setDecimal) {
          
            if (isNaN(parseInt(prevVal)) || this.state.currentVal.length == 0) {
                this.state.currentVal.push(0)
            }
            this.state.currentVal.push(value)
            this.setState({ setDecimal: false, setZero: true });


        } else {
            this.setState({ output: "Double Decimal Error" })
        }


        this.handleOut()

    }

    handleEval() {
        const equation = this.state.output
        const result = eval(equation)
        this.setState({ output: result })
        this.setState({ currentVal: [result] })

    }

    render() {
        return (
            <div id="app">
                <div id="display">
                    {this.state.output}
                    <p id="out"></p>
                </div>
                <Buttons
                    numbers={this.handleNums}
                    operators={this.hanldeOper}
                    intial={this.hanldeIntial}
                    eval={this.handleEval}
                    decimal={this.handleDecimal}
                    clear={this.handleClear}
                />
            </div>
        )
    }
}
const operStyle = {backgroundColor :"orange"}

class Buttons extends React.Component {
   
    render() {
        return (
            <div>
                <div className="keypad">

                    {/* 1st Row*/}

                    <button  className="button" id="clear" onClick={this.props.intial} >AC</button>

                    <button  className="button" id="delete" onClick={this.props.clear}>DEL</button>

                    <button style = {operStyle} className="button" id="multiply" value=" * " onClick={this.props.operators}>*</button>

                    {/* 2nd Row*/}

                    <button className="button" id="seven" value="7" onClick={this.props.numbers}>7</button>

                    <button className="button" id="eight" value="8" onClick={this.props.numbers}>8</button>

                    <button  className="button" id="nine" value="9" onClick={this.props.numbers}>9</button>

                    <button style = {operStyle} className="button" id="divide" value=" / " onClick={this.props.operators}>/</button>

                    {/* 3rd Row*/}

                    <button className="button" id="four" value="4" onClick={this.props.numbers}>4</button>

                    <button className="button" id="five" value="5" onClick={this.props.numbers}>5</button>

                    <button className="button" id="six" value="6" onClick={this.props.numbers}>6</button>

                    <button style = {operStyle} className="button" id="subtract" value=" - " onClick={this.props.operators}>-</button>

                    {/* 4th Row*/}

                    <button className="button" id="one" value="1" onClick={this.props.numbers}>1</button>

                    <button className="button" id="two" value="2" onClick={this.props.numbers}>2</button>

                    <button className="button" id="three" value="3" onClick={this.props.numbers}>3</button>

                    <button style = {operStyle} className="button" id="add" value=" + " onClick={this.props.operators}>+</button>

                    {/* 5th Row*/}

                    <button className="button" id="zero" value="0" onClick={this.props.numbers}>0</button>

                    <button className="button" id="decimal" value="." onClick={this.props.decimal} >.</button>

                    <button style = {operStyle}className="button" id="equals" onClick={this.props.eval} >=</button>


                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("root"))