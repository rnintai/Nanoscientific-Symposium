import React from 'react';
import {ProgramTitleContainer} from "components/Programs/ProgramTitle/ProgramTitleStyles";

interface ProgramTitleProps {
  title:string
}

function ProgramTitle({title}:ProgramTitleProps) {
  return (
    <ProgramTitleContainer>
      <table className="styled-table">
        <tbody className="styled-tr">
          <td>{title}</td>
        </tbody>
      </table>
    </ProgramTitleContainer>
  );
}

export default ProgramTitle;