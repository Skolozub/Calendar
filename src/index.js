import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { BasicCalendar } from "./examples";
import { getDateObject } from "./functions";

const BasicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 15px;
  padding: 5px;
  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

class App extends Component {
  state = {
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ],
    value: "",
    isOpenCalendar: false
  };

  date = new Date();
  timeout = 0;
  calendar = React.createRef();

  componentDidMount = () => {
    this.getNewDate(getDateObject(this.date));
    window.addEventListener("click", this.handleClickOutside, true);
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = this.calendar.current;

    if (!domNode || !domNode.contains(event.target)) {
      if (this.state.isOpenCalendar) {
        this.closeCalendar();
      }
    }
  };

  closeCalendar = () => {
    this.setState({ isOpenCalendar: false });
  };

  openCalendar = () => {
    this.setState({ isOpenCalendar: true });
  };

  getNewDate = ({ date, day, month, year }) => {
    this.date = date;
    this.setState({ value: `${day}/${month + 1}/${year}` });
  };

  onChangeDate = e => {
    const { value } = e.currentTarget;
    const [day, month, year] = value.split("/");

    if (
      day.length >= 1 &&
      day > 0 &&
      month.length >= 1 &&
      month > 0 &&
      year.length >= 4
    )
      this.date = new Date(year, month - 1, day);

    this.setState({ value });
  };

  render = () => (
    <div style={{ display: "flex" }}>
      <BasicWrapper ref={this.calendar}>
        <StyledInput
          value={this.state.value}
          // onBlur={this.onBlurDate}
          onChange={this.onChangeDate}
          onClick={this.openCalendar}
        />
        {this.state.isOpenCalendar && (
          <BasicCalendar
            date={this.date}
            months={this.state.months}
            getDateFromCalendar={this.getNewDate}
          />
        )}
      </BasicWrapper>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
