import { Component } from "react";
import {
  getArrayFromTo,
  getDateObject,
  getDaysNumber,
  getNumberOfDay,
  getStartTimeOfDay
} from "./../../functions";
import { now, months, daysOfWeek } from "./../../utils/settings";

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

  componentDidUpdate = (prevProps, prevState) => {
    const isLoadingUpdated =
      this.props.isLoading !== prevProps.isLoading &&
      prevProps.isLoading !== undefined;
    const dateUpdated =
      this.props.date !== prevProps.date && prevProps.date !== undefined;
    const monthsUpdated =
      this.props.months !== prevProps.months && prevProps.months !== undefined;
    const daysOfWeekUpdated =
      this.props.daysOfWeek !== prevProps.daysOfWeek &&
      prevProps.daysOfWeek !== undefined;

    if (isLoadingUpdated || dateUpdated || monthsUpdated || daysOfWeekUpdated) {
      this.setNewState({ ...this.props });
    }
  };

  componentDidMount = () => {
    this.setNewState({
      isLoading: this.props.isLoading || false,
      date: this.props.date || this.state.date,
      months: this.props.months || this.state.months,
      daysOfWeek: this.props.daysOfWeek || this.state.daysOfWeek
    });
  };

  getDaysByDate = (date = this.state.date) => {
    const actual = getDateObject(date);
    const today = getDateObject(new Date());

    const prevMonthDaysNum = getDaysNumber(actual.year, actual.month - 1);
    const currMonthDaysNum = getDaysNumber(actual.year, actual.month);

    const currMonthFirstDay = getNumberOfDay(actual.year, actual.month, 1);

    const prevMonthDays = getArrayFromTo(
      prevMonthDaysNum - currMonthFirstDay + 1,
      prevMonthDaysNum
    );
    const currMonthDays = getArrayFromTo(1, currMonthDaysNum);
    const nextMonthDays = getArrayFromTo(
      1,
      42 - currMonthDaysNum - prevMonthDays.length
    );

    const prevMonthDaysObjects = prevMonthDays.map(day => ({
      date: new Date(actual.year, actual.month - 1, day),
      type: "prev",
      isActualMonth: false,
      isToday: false,
      isChecked: false,
      isWeekend: [5, 6].includes(
        getNumberOfDay(actual.year, actual.month - 1, day)
      )
    }));
    const currMonthDaysObjects = currMonthDays.map(day => ({
      date: new Date(actual.year, actual.month, day),
      type: "curr",
      isActualMonth: true,
      isToday:
        getStartTimeOfDay(actual.year, actual.month, day) ===
        getStartTimeOfDay(today.year, today.month, today.day),
      isChecked: day === actual.day,
      isWeekend: [5, 6].includes(getNumberOfDay(actual.year, actual.month, day))
    }));
    const nextMonthDaysObjects = nextMonthDays.map(day => ({
      date: new Date(actual.year, actual.month + 1, day),
      type: "next",
      isActualMonth: false,
      isToday: false,
      isChecked: false,
      isWeekend: [5, 6].includes(
        getNumberOfDay(actual.year, actual.month + 1, day)
      )
    }));

    return [
      ...prevMonthDaysObjects,
      ...currMonthDaysObjects,
      ...nextMonthDaysObjects
    ];
  };

  setNewState = newState => {
    const { date: newDate = this.state.date } = newState;

    const days = this.getDaysByDate(newDate);
    const dateObject = getDateObject(newDate);

    const isCallbackPassed =
      typeof this.props.getDateFromCalendar === "function";

    this.setState(
      state => ({ ...state, ...newState, ...dateObject, days }),
      () => {
        if (isCallbackPassed)
          this.props.getDateFromCalendar({
            date: newDate,
            months: this.state.months,
            ...dateObject
          });
      }
    );
  };

  render = () =>
    this.props.render({
      ...this.state,
      setNewState: this.setNewState
    });
}
