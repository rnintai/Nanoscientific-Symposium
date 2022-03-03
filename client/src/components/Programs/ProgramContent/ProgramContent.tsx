import React from "react";
import { ProgramContentContainer } from "components/Programs/ProgramContent/ProgramContentStyles";
import "moment-timezone";
import moment from "moment";

interface ProgramContentProps extends Program.programType {
  index: number;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  selectedTimezone?: string;
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
    moment
      .utc(moment(start_time).format("YYYY-MM-DD HH:mm:ss"))
      .tz(selectedTimezone as string)
      .get("date") !==
    moment
      .utc(moment(end_time).format("YYYY-MM-DD HH:mm:ss"))
      .tz(selectedTimezone as string)
      .get("date");

  const isStartTimeZero =
    moment
      .utc(moment(start_time).format("YYYY-MM-DD HH:mm:ss"))
      .tz(selectedTimezone as string)
      .get("hour") === 0;
  const isEndTimeZero =
    moment
      .utc(moment(end_time).format("YYYY-MM-DD HH:mm:ss"))
      .tz(selectedTimezone as string)
      .get("hour") === 0;

  return (
    <ProgramContentContainer isAdmin={isAdmin} onClick={onClick}>
      <li>
        <time className="cbp_tmtime">
          {index === 0 && (
            <span className="session-date">
              {moment(start_time).format("MMM DD")}
            </span>
          )}
          {moment(start_time).diff(end_time) > 0 && (
            <span className="session-date">
              {moment(start_time).format("MMM DD")}
            </span>
          )}
          {index !== 0 &&
            (isDateChanged || isStartTimeZero || isEndTimeZero) && (
              <span className="session-date">
                {moment(start_time).format("MMM DD")}
              </span>
            )}
          <span className="content-time">
            {moment
              .utc(moment(start_time).format("YYYY-MM-DD HH:mm:ss"))
              .tz(selectedTimezone as string)
              .format("HH:mm")}{" "}
            -{" "}
            {moment
              .utc(moment(end_time).format("YYYY-MM-DD HH:mm:ss"))
              .tz(selectedTimezone as string)
              .format("HH:mm")}
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
