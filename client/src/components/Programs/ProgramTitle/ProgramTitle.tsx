import React from "react";
import { ProgramTitleContainer } from "components/Programs/ProgramTitle/ProgramTitleStyles";

interface ProgramTitleProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
}

const ProgramTitle = ({ title, isAdmin }: ProgramTitleProps) => {
  return (
    <ProgramTitleContainer isAdmin={isAdmin as boolean}>
      <table className="styled-table">
        <tbody className="styled-tr">
          <td>{title}</td>
        </tbody>
      </table>
    </ProgramTitleContainer>
  );
};

export default ProgramTitle;
