import { Component } from "react";
import { getDaysNumber } from "./functions/getDaysNumber";
import { getArrayFromTo } from "./functions/getArrayFromTo";
import { getNumberOfDay } from "./functions/getNumberOfDay";
import { now, months, daysOfWeek } from "./utils/settings";
import { getDateObject } from "./functions/getDateObject";
import { getTimeOfStartDay } from "./functions/getTimeOfStartDay";

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

  componentDidUpdate = (_, prevState) => {
    const isLoadingUpdated =
      prevState.isLoading !== this.props.isLoading &&
      this.props.isLoading !== undefined;
    const dateUpdated =
      prevState.date !== this.props.date && this.props.date !== undefined;
    const monthsUpdated =
      prevState.months !== this.props.months && this.props.months !== undefined;
    const daysOfWeekUpdated =
      prevState.daysOfWeek !== this.props.daysOfWeek &&
      this.props.daysOfWeek !== undefined;

    console.log("isLoadingUpdated", isLoadingUpdated);
    console.log("dateUpdated", dateUpdated);
    console.log("monthsUpdated", monthsUpdated);
    console.log("daysOfWeekUpdated", daysOfWeekUpdated);
  };

  componentDidMount = () => {
    this.setNewState({
      isLoading: this.props.isLoading || false,
      date: this.props.date || this.state.date,
      months: this.props.months || this.state.months,
      daysOfWeek: this.props.months || this.state.daysOfWeek
    });
  };

  getDaysByDate = (date = this.state.date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();

    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth();
    const todayDay = new Date().getDate();
    const todayTime = getTimeOfStartDay(todayYear, todayMonth, todayDay);

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

    const isToday = (year, month, day) =>
      getTimeOfStartDay(year, month, day) === todayTime;

    const prevMonthDaysObjects = prevMonthDays.map(day => ({
      day,
      type: "prev"
    }));
    const currMonthDaysObjects = currMonthDays.map(day => ({
      day,
      type: "curr",
      today: isToday(currentYear, currentMonth, day)
    }));
    const nextMonthDaysObjects = nextMonthDays.map(day => ({
      day,
      type: "next"
    }));

    return [
      ...prevMonthDaysObjects,
      ...currMonthDaysObjects,
      ...nextMonthDaysObjects
    ];
  };

  getNewDate = (date = this.state.date) => changer => {
    // clone Date object
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

  setYear = (value, prevDate) => {
    const { newDate } = this.getNewDate(prevDate)({ type: "year", value });
    this.setNewState({ date: newDate });
  };

  setMonth = (value, prevDate) => {
    const { newDate } = this.getNewDate(prevDate)({ type: "month", value });
    this.setNewState({ date: newDate });
  };

  setDay = (value, prevDate) => {
    const { newDate } = this.getNewDate(prevDate)({ type: "day", value });
    this.setNewState({ date: newDate });
  };

  render = () =>
    this.props.render({
      ...this.state,
      actions: {
        setNewState: this.setNewState,
        getNewDate: this.getNewDate,
        setYear: this.setYear,
        setMonth: this.setMonth,
        setDay: this.setDay
      }
    });
}
