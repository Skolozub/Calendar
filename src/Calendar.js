import { Component } from "react";
import { getDaysNumber } from "./functions/getDaysNumber";
import { getArrayFromTo } from "./functions/getArrayFromTo";
import { getNumberOfDay } from "./functions/getNumberOfDay";
import { now, months, daysOfWeek } from "./utils/settings";
import { getDateObject } from "./functions/getDateObject";

export class Calendar extends Component {
  state = {
    isLoading: true,
    date: now,
    days: [],
    months,
    daysOfWeek,
    day: 1,
    month: 0,
    year: 1900
  };

  conponentDidUpdate = () => {};

  componentDidMount = () => {
    this.setNewState({
      isLoading: this.props.isLoading || false,
      date: this.props.date || this.state.date,
      months: this.props.months || this.state.months,
      daysOfWeek: this.props.months || this.state.daysOfWeek
    });
  };

  getDaysByDate = (date = this.state.date) => {
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const prevMonthDaysNum = getDaysNumber(currentYear, currentMonth - 1);
    const currMonthDaysNum = getDaysNumber(currentYear, currentMonth);

    const currMonthFirstDay = getNumberOfDay(currentYear, currentMonth, 1);

    const prevMonthDays = getArrayFromTo(
      prevMonthDaysNum - currMonthFirstDay + 1,
      prevMonthDaysNum
    );
    const currMonthDays = getArrayFromTo(1, currMonthDaysNum);
    const nextMonthDays = getArrayFromTo(
      1,
      42 - currMonthDaysNum - prevMonthDays.length
    );

    const prevMonthDaysObjects = prevMonthDays.map(el => ({
      day: el,
      type: "prev"
    }));
    const currMonthDaysObjects = currMonthDays.map(el => ({
      day: el,
      type: "curr",
      today: currentDay === el
    }));
    const nextMonthDaysObjects = nextMonthDays.map(el => ({
      day: el,
      type: "next"
    }));

    return [
      ...prevMonthDaysObjects,
      ...currMonthDaysObjects,
      ...nextMonthDaysObjects
    ];
  };

  getNewDate = (date = this.state.date) => changer => {
    const newDate = new Date(date.getTime());
    switch (changer.type) {
      case "year": {
        newDate.setFullYear(changer.value);
        return { newDate };
      }

      case "month": {
        newDate.setMonth(changer.value);
        return { newDate };
      }

      case "day": {
        newDate.setDate(changer.value);
        return { newDate };
      }

      default:
        return date;
    }
  };

  setNewState = newState => {
    const { date: newDate = this.state.date } = newState;
    const days = this.getDaysByDate(newDate);
    const dateObject = getDateObject(newDate);
    const state = { ...this.state, ...newState, days, ...dateObject };

    this.setState(state);
  };

  setYear = value => {
    const { newDate } = this.getNewDate()({ type: "year", value });
    this.setNewState({ date: newDate });
  };

  setMonth = value => {
    const { newDate } = this.getNewDate()({ type: "month", value });
    this.setNewState({ date: newDate });
  };

  setDay = value => {
    const { newDate } = this.getNewDate()({ type: "day", value });
    this.setNewState({ date: newDate });
  };

  render = () =>
    this.props.render({
      ...this.state,
      actions: {
        changeDate: this.changeDate,
        setYear: this.setYear,
        setMonth: this.setMonth,
        setDay: this.setDay
      }
    });
}
