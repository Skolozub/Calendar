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
  cursor = 0;

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
    !this.state.isOpenCalendar && this.setState({ isOpenCalendar: true });
  };

  getNewDate = ({ date, day, month, year }) => {
    this.date = date;
    this.setState({
      value: `${`0${day}`.slice(-2)}/${`0${month + 1}`.slice(
        -2
      )}/${`${year}`.slice(-4)}`
    });
  };

  onChangeDate = e => {
    const { value } = e.currentTarget;
    const [day = "", month = "", year = ""] = value.split("/");

    const clearDay = (day, cursor) => {
      const regExp = /[^\d]/g;
      const badSymbols = (day.match(regExp) || "").length;
      const clearedDay = day.replace(regExp, "");
      const croppedDay = clearedDay.slice(0, 2);
      const processedDay = croppedDay > 31 ? 31 : croppedDay;
      const cleanedCursor = cursor - badSymbols;

      if (cleanedCursor <= 2) {
        const newCursor = cleanedCursor > 1 ? 3 : cleanedCursor;
        return [processedDay, newCursor];
      }
      return [processedDay, null];
    };

    const clearMonth = (month, cursor) => {
      const regExp = /[^\d]/g;
      const badSymbols = (month.match(regExp) || "").length;
      const clearedMonth = month.replace(regExp, "");
      const croppedMonth = clearedMonth.slice(0, 2);
      const processedMonth = croppedMonth > 12 ? 12 : croppedMonth;
      const cleanedCursor = cursor - badSymbols;
      if (cleanedCursor > 2 && cleanedCursor <= 5) {
        const newCursor = cleanedCursor > 4 ? 6 : cleanedCursor;
        return [processedMonth, newCursor];
      }
      return [processedMonth, null];
    };

    const clearYear = (year, cursor) => {
      const regExp = /[^\d]/g;
      const badSymbols = (year.match(regExp) || "").length;
      const clearedYear = year.replace(regExp, "");
      const croppedYear = clearedYear.slice(0, 4);

      const cleanedCursor = cursor - badSymbols;
      if (cleanedCursor > 5) {
        return [croppedYear, cleanedCursor];
      }
      return [croppedYear, null];
    };

    const cursor = e.target.selectionStart;

    const [clearedDay, dayCursor] = clearDay(day, cursor);
    const [clearedMonth, monthCursor] = clearMonth(month, cursor);
    const [clearedYear, yearCursor] = clearYear(year, cursor);

    const newCursor = dayCursor || monthCursor || yearCursor;

    if (
      clearedDay.length > 1 &&
      clearedDay.length < 3 &&
      clearedDay > 0 &&
      clearedMonth.length > 1 &&
      clearedMonth.length < 3 &&
      clearedMonth > 0 &&
      clearedYear.length > 3 &&
      clearedYear.length < 5
    )
      this.date = new Date(clearedYear, clearedMonth - 1, clearedDay);
    const tar = e.currentTarget;
    this.setState(
      () => ({
        value: `${clearedDay}/${clearedMonth}/${clearedYear}`,
        date: new Date(clearedYear, clearedMonth - 1, clearedDay)
      }),
      () => tar.setSelectionRange(newCursor, newCursor)
    );
  };

  render = () => (
    <div style={{ display: "flex" }}>
      <BasicWrapper ref={this.calendar}>
        <StyledInput
          value={this.state.value}
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
