import React from "react";
import { ProgramContentContainer } from "components/Programs/ProgramContent/ProgramContentStyles";
import "moment-timezone";
import moment from "moment";
import { dateToLocaleString, getUserTimezoneDate } from "utils/Date";

interface ProgramContentProps extends Program.programType {
  index: number;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  selectedTimezone: string;
}

const ProgramContent = ({
  start_time,
  end_time,
  title,
  speakers,
  description,
  index,
  isAdmin,
  onClick,
  selectedTimezone,
}: ProgramContentProps) => {
  const isDateChanged =
    getUserTimezoneDate(start_time, selectedTimezone).getDate() !==
    getUserTimezoneDate(end_time, selectedTimezone).getDate();

  const isStartTimeZero =
    getUserTimezoneDate(start_time, selectedTimezone).getHours() === 0;
  const isEndTimeZero =
    getUserTimezoneDate(end_time, selectedTimezone).getHours() === 0;

  return (
    <ProgramContentContainer isAdmin={isAdmin} onClick={onClick}>
      <li>
        <time className="cbp_tmtime">
          {index === 0 && (
            <span className="session-date">
              {dateToLocaleString(start_time, selectedTimezone, "MMM DD")}
              {/* {moment(start_time).format("MMM DD")} */}
            </span>
          )}
          {moment(start_time).diff(end_time) > 0 && (
            <span className="session-date">
              {dateToLocaleString(start_time, selectedTimezone, "MMM DD")}
            </span>
          )}
          {index !== 0 &&
            (isDateChanged || isStartTimeZero || isEndTimeZero) && (
              <span className="session-date">
                {dateToLocaleString(start_time, selectedTimezone, "MMM DD")}
              </span>
            )}
          <span className="content-time">
            {dateToLocaleString(start_time, selectedTimezone, "HH:mm")} -{" "}
            {dateToLocaleString(end_time, selectedTimezone, "HH:mm")}
          </span>
          {index === 0 && (
            <h3 className="timezone">Timezone: {selectedTimezone}</h3>
          )}
          {(isDateChanged || isStartTimeZero || isEndTimeZero) && (
            <h3 className="timezone">&nbsp;</h3>
          )}
        </time>
        <div className="cbp_tmicon" />
        <div className="cbp_tmlabel">
          <h2>{title}</h2>
          <p>{speakers}</p>
          <p className="description">{description}</p>
        </div>
      </li>
    </ProgramContentContainer>
  );
};

export default ProgramContent;
