import React from "react";
import { ProgramContentContainer } from "components/Programs/ProgramContent/ProgramContentStyles";

interface ProgramContentProps extends Program.programType {
  index: number;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
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
}: ProgramContentProps) => {
  return (
    <ProgramContentContainer isAdmin={isAdmin} onClick={onClick}>
      <li>
        <time className="cbp_tmtime">
          {/* {index === 0 && <span className={"session-date"}>{moment(date).format("MMM DD")}</span>} */}
          <span className="content-time">
            {start_time.substring(0, 5)} - {end_time.substring(0, 5)}
          </span>
          {index === 0 && <h3 className="timezone">Timezone: Asia/Seoul</h3>}
        </time>
        <div className="cbp_tmicon" />
        <div className="cbp_tmlabel">
          <h2>{title}</h2>
          <p>{speakers}</p>
          <p>{description}</p>
        </div>
      </li>
    </ProgramContentContainer>
  );
};

export default ProgramContent;
