import React from "react";
import { ProgramTitleContainer } from "components/Programs/ProgramTitle/ProgramTitleStyles";

interface ProgramTitleProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  isAdmin?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  onClick?: () => void;
}

const ProgramTitle = ({ title, isAdmin, onClick }: ProgramTitleProps) => {
  return (
    <ProgramTitleContainer onClick={onClick} isAdmin={isAdmin as boolean}>
      <table className="styled-table">
        <tbody className="styled-tr">
          <td>{title}</td>
        </tbody>
      </table>
    </ProgramTitleContainer>
  );
};

export default ProgramTitle;
