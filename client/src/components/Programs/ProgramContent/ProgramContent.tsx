/* eslint-disable react/require-default-props */
import React from "react";
import { dateToLocaleString } from "utils/Date";
import { styled, TableRow, TableCell, useTheme } from "@mui/material";

interface ProgramContentProps extends Program.programType {
  id: number;
  index: number;
  isAdmin: boolean;
  onClick?: () => void;
  selectedTimezone: string;
  programAgenda: Program.programAgendaType[];
  selectedAgenda?: Program.programAgendaType;
  setSelectedAgenda?: React.Dispatch<Program.programAgendaType>;
  setOpenAgendaForm?: React.Dispatch<boolean>;
  setAgendaEdit?: React.Dispatch<boolean>;
}

const ProgramContent = ({
  id,
  start_time,
  end_time,
  title,
  speakers,
  emphasize,
  description,
  index,
  isAdmin,
  onClick,
  selectedTimezone,
  programAgenda,
  selectedAgenda,
  setSelectedAgenda,
  setOpenAgendaForm,
  setAgendaEdit,
}: ProgramContentProps) => {
  const theme = useTheme();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.black,
    border: `3px solid ${theme.palette.grey[800]}`,
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: isAdmin ? "pointer" : "default",
    td: { lineHeight: "2.2", padding: "0 40px" },

    "&.agenda-row:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[300],
    },
    "&.agenda-row:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[100],
    },
    "&.program-row": {
      backgroundColor: "#939598",
      td: {
        color: theme.palette.common.white,
      },
    },
    "&.program-row.gradient": {
      background: theme.palette.primary.gradation,
      border: `2px solid ${theme.palette.grey[800]}`,
      td: {
        color: theme.palette.common.white,
        border: 0,
      },
    },
    "li::marker": {
      color: "#1CAFE4",
    },

    // admin
    "&.admin": {
      transition: "all 0.2s ease-in-out",
    },
    "&.admin:hover": {
      transform: "translateY(-5px)",
    },
  }));

  return (
    <>
      <StyledTableRow
        className={`program-row ${emphasize === 1 ? "gradient" : ""} ${
          isAdmin && "admin"
        }`}
        onClick={onClick}
      >
        <StyledTableCell align="center" width="15%">
          {dateToLocaleString(start_time, selectedTimezone, "HH:mm")}
        </StyledTableCell>
        <StyledTableCell align="left" width="50%">
          {title}
        </StyledTableCell>
        <StyledTableCell align="left" width="35%">
          {speakers}
        </StyledTableCell>
      </StyledTableRow>
      {programAgenda
        .filter((agenda) => agenda.program_id === id)
        .map((agenda) => (
          <StyledTableRow
            key={agenda.id}
            className={`agenda-row ${isAdmin && "admin"}`}
            onClick={() => {
              if (setSelectedAgenda && setOpenAgendaForm && setAgendaEdit) {
                setSelectedAgenda(agenda);
                setOpenAgendaForm(true);
                setAgendaEdit(true);
              }
            }}
          >
            <StyledTableCell align="center" width="15%" />
            <StyledTableCell align="left" width="50%">
              <li style={{ listStyle: "square" }}>{agenda.title}</li>
            </StyledTableCell>
            <StyledTableCell align="left" width="35%">
              {agenda.speakers}
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </>
  );
};

export default ProgramContent;
