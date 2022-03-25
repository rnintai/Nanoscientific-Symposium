/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import { dateToLocaleString } from "utils/Date";
import {
  styled,
  TableRow,
  TableCell,
  useTheme,
  Box,
  IconButton,
} from "@mui/material";
import {
  ArrowCircleUp,
  ArrowCircleDown,
  NoEncryption,
} from "@mui/icons-material";

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

interface programAgendaEditType extends Program.programAgendaType {
  edit: boolean;
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

  // 아젠다 edit 여부 포함된 리스트

  const [agendaEditList, setAgendaEditList] = useState<programAgendaEditType[]>(
    [],
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.black,
    border: `3px solid ${theme.palette.background.default}`,
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: isAdmin ? "pointer" : "default",
    td: { lineHeight: "2.2", padding: "0 40px" },

    "&.agenda-row:nth-of-type(odd)": {
      backgroundColor: "rgb(255 255 255 / 80%)",
    },
    "&.agenda-row:nth-of-type(even)": {
      backgroundColor: theme.palette.action.active,
    },
    "&.program-row": {
      backgroundColor: "#939598",
      td: {
        color: theme.palette.common.white,
      },
    },
    "&.program-row.gradient": {
      background: theme.palette.primary.gradation,
      borderLeft: `2px solid ${theme.palette.background.default}`,
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
    ".agenda-move-section": {
      padding: "6px 20px",
      display: "flex",
      position: "absolute",
      transform: "translate(-80%,-50%)",
      color: "white",
      "&.active": {
        display: "flex",
      },
    },
    "&.admin.program-row:hover": {
      transform: "translateY(-5px)",
    },
    "&.admin:hover": {
      ".agenda-move-section": {
        display: "flex",
      },
    },
  }));

  const agendaEditHandler = (agenda: Program.programAgendaType) => {
    if (setSelectedAgenda && setOpenAgendaForm && setAgendaEdit) {
      setSelectedAgenda(agenda);
      setOpenAgendaForm(true);
      setAgendaEdit(true);
    }
  };

  const clickUpHandler = (agenda: Program.programAgendaType) => {
    const index = agendaEditList.findIndex((o) => o.id === agenda.id);
    const listCpy = [...agendaEditList];

    // 0
    const id0 = listCpy[index].id;
    const next0 = listCpy[index].next_id;
    // -1
    const idm1 = listCpy[index - 1].id;
    const nextm1 = listCpy[index - 1].next_id;
    // -2
    if (index - 2 !== 0 || listCpy[index - 2].next_id !== null) {
      const idm2 = listCpy[index - 2].id;
      const nextm2 = listCpy[index - 2].next_id;
    }

    // swap
    const tmp = listCpy[index - 1];
    listCpy[index - 1] = listCpy[index];
    listCpy[index] = tmp;

    // next id 재배정
    if (index - 2 !== 0 || listCpy[index - 2].next_id !== null) {
      listCpy[index - 2].next_id = id0;
    }
    listCpy[index - 1].next_id = idm1;
    listCpy[index].next_id = next0;

    setAgendaEditList(listCpy);
  };

  const clickDownHandler = (agenda: Program.programAgendaType) => {
    const index = agendaEditList.findIndex((o) => o.id === agenda.id);
    const listCpy = [...agendaEditList];

    // 0
    const id0 = listCpy[index].id;
    const next0 = listCpy[index].next_id;
    // +1
    const idp1 = listCpy[index + 1].id;
    const nextp1 = listCpy[index + 1].next_id;
    // m1
    const idm1 = listCpy[index - 1].id;
    const nextm1 = listCpy[index - 1].next_id;

    // swap
    const tmp = listCpy[index + 1];
    listCpy[index + 1] = listCpy[index];
    listCpy[index] = tmp;

    // next id 재배정

    listCpy[index - 1].next_id = idp1;
    listCpy[index].next_id = id0;
    listCpy[index + 1].next_id = nextp1;

    setAgendaEditList(listCpy);
  };

  useEffect(() => {
    setAgendaEditList([
      ...programAgenda.map((agenda) => {
        return { ...agenda, edit: false };
      }),
    ]);
  }, [programAgenda]);

  return (
    <>
      <StyledTableRow
        className={`program-row ${emphasize === 1 ? "gradient" : ""} ${
          isAdmin && "admin"
        }`}
        onClick={onClick}
      >
        <StyledTableCell
          align="center"
          width="0%"
          style={{ padding: 0, border: "none" }}
        />
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
      {agendaEditList
        .filter((agenda) => agenda.program_id === id)
        .map((agenda, index) => (
          <React.Fragment key={agenda.id}>
            <StyledTableRow className={`agenda-row ${isAdmin && "admin"}`}>
              <StyledTableCell
                width="0%"
                style={{ padding: 0, border: "none" }}
              >
                <Box
                  className={`agenda-move-section ${
                    agendaEditList[index].edit ? " active" : "active"
                  }`}
                >
                  <IconButton
                    sx={{ p: "3px" }}
                    disabled={index === 0}
                    onClick={() => {
                      clickUpHandler(agenda);
                    }}
                  >
                    <ArrowCircleUp />
                  </IconButton>
                  <IconButton
                    sx={{ p: "3px" }}
                    disabled={!agenda.next_id}
                    onClick={() => {
                      clickDownHandler(agenda);
                    }}
                  >
                    <ArrowCircleDown />
                  </IconButton>
                </Box>
              </StyledTableCell>

              <StyledTableCell
                align="center"
                width="15%"
                onClick={() => {
                  agendaEditHandler(agenda);
                }}
              />
              <StyledTableCell
                align="left"
                width="50%"
                onClick={() => {
                  agendaEditHandler(agenda);
                }}
              >
                <li style={{ listStyle: "square" }}>{agenda.title}</li>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                width="35%"
                onClick={() => {
                  agendaEditHandler(agenda);
                }}
              >
                {agenda.speakers}
              </StyledTableCell>
            </StyledTableRow>
          </React.Fragment>
        ))}
    </>
  );
};

export default ProgramContent;
