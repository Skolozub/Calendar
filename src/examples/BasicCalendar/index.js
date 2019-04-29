import React from "react";
import { Calendar } from "./../../containers";
import {
  Wrapper,
  Top,
  Button,
  Head,
  HeadMonth,
  HeadYear,
  DaysOfWeek,
  DayOfWeek,
  Days,
  Day
} from "./../../components";
import { ArrowSvgLeft, ArrowSvgRight } from "./ArrowsSvg";

export const BasicCalendar = prs => (
  <Calendar
    {...prs}
    render={props => {
      console.log(props);
      const {
        date,
        days,
        months,
        month,
        year,
        daysOfWeek,
        setNewState
      } = props;

      const prevMonth = () => {
        date.setMonth(month - 1);
        setNewState({ date });
      };
      const nextMonth = () => {
        date.setMonth(month + 1);
        setNewState({ date });
      };

      return (
        <Wrapper>
          <Top>
            <Button onClick={prevMonth}>
              <ArrowSvgLeft />
            </Button>
            <Head>
              <HeadMonth>{months[month]}</HeadMonth>
              <HeadYear>{year}</HeadYear>
            </Head>
            <Button onClick={nextMonth}>
              <ArrowSvgRight />
            </Button>
          </Top>
          <DaysOfWeek>
            {daysOfWeek.map((dayOfWeek, idx) => (
              <DayOfWeek key={idx}>{dayOfWeek}</DayOfWeek>
            ))}
          </DaysOfWeek>
          <Days>
            {days.map(
              ({ isToday, isActualMonth, isChecked, isWeekend, date }, idx) => (
                <Day
                  key={idx}
                  isToday={isToday}
                  isActualMonth={isActualMonth}
                  isChecked={isChecked}
                  isWeekend={isWeekend}
                  onClick={() => setNewState({ date })}
                >
                  {date.getDate()}
                </Day>
              )
            )}
          </Days>
        </Wrapper>
      );
    }}
  />
);
