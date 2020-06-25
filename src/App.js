import React from "react";
import "./styles.css";
import { Helmet } from "react-helmet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: "",
      valores: "",
      result: ""
    };
    this.displayValoresHandler = this.displayValoresHandler.bind(this);
    this.displayReset = this.displayReset.bind(this);
    this.displayOperacionHandler = this.displayOperacionHandler.bind(this);
    this.displayOperacionResult = this.displayOperacionResult.bind(this);
  }
  displayValoresHandler(e) {
    if (this.state.valores === "0" && e.target.title === "0") {
      return;
    }
    if (this.state.result !== "") {
      this.setState({
        total: e.target.title,
        valores: e.target.title,
        result: ""
      });
      return;
    }

    if (this.state.valores === "0" && e.target.title !== "0") {
      this.setState({
        valores: e.target.title
      });
      return;
    }
    if (this.state.valores.match(/[-+*/]/) && e.target.title !== "0") {
      let stateTotal = this.state.total[this.state.total.length - 1];
      let stateValores = this.state.valores[this.state.valores.length - 1];
      if (/[-+*/]/.test(stateValores) && /[0-9]/.test(stateTotal)) {
        this.setState({
          total: this.state.total + this.state.valores,
          valores: e.target.title
        });
        return;
      }

      this.setState({
        total: this.state.total,
        valores: e.target.title
      });
      return;
    }
    if (this.state.valores !== "0") {
      this.setState({
        valores: e.target.title
      });
    }
    if (this.state.valores.match(/[.]/)) {
      e.target.title === "."
        ? this.setState({
            valores: this.state.valores
          })
        : this.setState({
            valores: this.state.valores + e.target.title
          });
      return;
    }
    this.setState({
      valores: this.state.valores + e.target.title
    });
  }
  displayOperacionHandler(e) {
    let lengthTotal = this.state.total.length;

    if (
      /[+*/]/.test(this.state.total[lengthTotal - 2]) &&
      this.state.total[lengthTotal - 1] === "-" &&
      /[+*/]/.test(e.target.title)
    ) {
      this.setState({
        total: this.state.total.slice(0, -2) + e.target.title,
        valores: e.target.title
      });
      return;
    }

    if (this.state.result !== "") {
      this.setState({
        total: this.state.valores,
        valores: e.target.title,
        result: ""
      });
      return;
    }
    if (this.state.valores.match(/[+*/]/) && e.target.title === "-") {
      this.setState({
        total: this.state.total + e.target.title,
        valores: e.target.title
      });
      return;
    }

    if (this.state.valores.match(/[-+*/]/)) {
      return;
    }
    if (this.state.valores.match(/[0-9]/)) {
      this.setState({
        total: this.state.valores,
        valores: e.target.title
      });
    }
    if (this.state.total === "") {
      this.setState({
        total: this.state.valores + e.target.title,
        valores: e.target.title
      });
      return;
    }
    if (this.state.total !== "") {
      this.setState({
        total: this.state.total + this.state.valores,
        valores: e.target.title
      });
      return;
    }

    this.setState({
      total: this.state.total + this.state.valores,
      valores: e.target.title
    });
  }
  displayOperacionResult() {
    let operation;
    let result;
    let stateTotal = this.state.total[this.state.total.length - 1];
    let stateValores = this.state.valores[this.state.valores.length - 1];
    if (/[-+*/]/.test(stateValores)) {
      operation = this.state.total;
      result = eval(operation);
      this.setState({
        total: "",
        result: this.state.total + "=" + result,
        valores: result.toString()
      });
      return;
    }
    if (/[-+*/]/.test(stateTotal)) {
      operation = this.state.total + this.state.valores;
      result = eval(operation);
      this.setState({
        result: this.state.valores + "=" + result,
        valores: result.toString()
      });
    }
  }
  displayReset() {
    this.setState({
      total: "",
      valores: "0",
      result: ""
    });
  }

  render() {
    return (
      <div id="calculadora">
        {/*<Helmet>
          <script
            async
            src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
          />
        </Helmet>*/}
        <div id="contenedorDisplays">
          <div id="displayValores">
            {this.state.total}
            {this.state.result}
          </div>
          <div id="display">{this.state.valores}</div>
        </div>
        <div id="botones">
          <div id="equals" onClick={this.displayOperacionResult}>
            =
          </div>
          <div
            id="zero"
            className="gray borderBlack"
            onClick={this.displayValoresHandler}
            title="0"
          >
            0
          </div>
          <div
            id="one"
            className="gray"
            title="1"
            onClick={this.displayValoresHandler}
          >
            1
          </div>
          <div
            id="two"
            className="gray"
            title="2"
            onClick={this.displayValoresHandler}
          >
            2
          </div>
          <div
            id="three"
            className="gray"
            title="3"
            onClick={this.displayValoresHandler}
          >
            3
          </div>
          <div
            id="four"
            className="gray"
            title="4"
            onClick={this.displayValoresHandler}
          >
            4
          </div>
          <div
            id="five"
            className="gray"
            title="5"
            onClick={this.displayValoresHandler}
          >
            5
          </div>
          <div
            id="six"
            className="gray"
            title="6"
            onClick={this.displayValoresHandler}
          >
            6
          </div>
          <div
            id="seven"
            className="gray"
            title="7"
            onClick={this.displayValoresHandler}
          >
            7
          </div>
          <div
            id="eight"
            className="gray"
            title="8"
            onClick={this.displayValoresHandler}
          >
            8
          </div>
          <div
            id="nine"
            className="gray"
            title="9"
            onClick={this.displayValoresHandler}
          >
            9
          </div>
          <div
            id="add"
            title="+"
            className="grayLight"
            onClick={this.displayOperacionHandler}
          >
            +
          </div>
          <div
            id="subtract"
            title="-"
            className="grayLight"
            onClick={this.displayOperacionHandler}
          >
            -
          </div>
          <div
            id="multiply"
            title="*"
            className="grayLight"
            onClick={this.displayOperacionHandler}
          >
            *
          </div>
          <div
            id="divide"
            title="/"
            className="grayLight"
            onClick={this.displayOperacionHandler}
          >
            /
          </div>
          <div
            id="decimal"
            title="."
            className="gray"
            onClick={this.displayValoresHandler}
          >
            .
          </div>
          <div id="clear" onClick={this.displayReset}>
            AC
          </div>
        </div>
      </div>
    );
  }
}
export default App;
