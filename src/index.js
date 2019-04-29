import React from "react";
import ReactDOM from "react-dom";
import { Calendar } from "./Calendar";
import { Wrapper } from "./Wrapper";
import { Head } from "./Head";
import { HeadMonth } from "./HeadMonth";
import { HeadYear } from "./HeadYear";
import { Top } from "./Top";
import { Button } from "./Button";
import { DaysOfWeek } from "./DaysOfWeek";
import { Day } from "./Day";
import { Days } from "./Days";
import { DayOfWeek } from "./DayOfWeek";
import { ArrowSvgLeft, ArrowSvgRight } from "./ArrowsSvg";

const App = () => (
  <Calendar
    render={props => {
      console.log(props);
      const { days, months, month, year, daysOfWeek, actions } = props;
      const prevMonth = () => actions.setMonth(month - 1);
      const nextMonth = () => actions.setMonth(month + 1);

      const rus = () => {
        const months = [
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
        ];

        const date = new Date(2019, 8, 11);
        actions.setNewState({ months, date });
      };

      return (
        <>
          <button onClick={rus}>rus</button>
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
              {days.map((elt, idx) => (
                <Day
                  key={idx}
                  isToday={elt.today}
                  notThisMonth={elt.type !== "curr"}
                >
                  {elt.day}
                </Day>
              ))}
            </Days>
          </Wrapper>
        </>
      );
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("root"));
