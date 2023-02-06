import React, { useEffect, useState } from "react";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";

import { Table, TableContainer, TableBody, Box } from "@mui/material";
import LandingSection from "components/Section/LandingSection";
import { globalData } from "utils/GlobalData";
import ComingSoon from "components/ComingSoon/ComingSoon";
import useMenuStore from "store/MenuStore";
import { editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import NSSButton from "components/Button/NSSButton";
import useNSSType from "hooks/useNSSType";
import useCurrentYear from "hooks/useCurrentYear";
import {
  ProgramsListContainer,
  StyledTimezoneSelect,
  SessionContainer,
} from "./ProgramsListContainer";
import ProgramContent from "./ProgramContent/ProgramContent";
import ProgramTitle from "./ProgramTitle/ProgramTitle";

const ProgramsList = () => {
  const { currentMenu } = useMenuStore();
  const nssType = useNSSType();
  const authState = useAuthState();
  const pathname = usePageViews();
  const currentYear = useCurrentYear();
  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [programAgenda, setProgramAgenda] = useState<
    Program.programAgendaType[]
  >([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const { programFileLink } = globalData.get(nssType) as Common.globalDataType;
  const config = {
    params: {
      nation: pathname,
      year: currentYear,
    },
  };
  useEffect(() => {
    const getPrograms = async () => {
      setProgramLoading(true);
      const programs = await axios.get(`/api/page/common/programs`, config);
      setPrograms(programs.data);
      setProgramLoading(false);
    };

    const getProgramAgenda = async () => {
      setProgramLoading(true);
      const result = await axios.get(
        `/api/page/common/programs/agenda`,
        config,
      );
      const agendaList = result.data.data;
      const sorted = agendaList
        .sort(
          (aa: Program.programAgendaType, bb: Program.programAgendaType) => {
            if (aa.next_id === bb.id) return -1;
            if (aa.next_id !== bb.id || aa.next_id === 9999) return 1;
            return 0;
          },
        )
        .sort(
          (aa: Program.programAgendaType, bb: Program.programAgendaType) => {
            if (aa.program_id >= bb.program_id) return 1;
            return 0;
          },
        );
      setProgramAgenda(sorted);
      setProgramLoading(false);
    };

    getPrograms();
    getProgramAgenda();
  }, []);

  useEffect(() => {
    // 세션 가져오기
    const getSessions = async () => {
      setSessionLoading(true);
      const sessions = await axios.get(`/api/page/common/sessions`, config);
      setSessions(sessions.data);
      setSessionLoading(false);
    };

    getSessions();
  }, []);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  return (
    <ProgramsListContainer className="body-fit">
      <Box className="layout">
        <StyledTimezoneSelect
          value={selectedTimezone}
          onChange={(e) => {
            setSelectedTimezone(e.value);
          }}
        />
        {((currentMenu &&
          currentMenu.is_published === 0 &&
          !editorRole.includes(authState.role)) ||
          sessions.length === 0) && <ComingSoon />}
        {((currentMenu && currentMenu.is_published === 1) ||
          editorRole.includes(authState.role)) &&
          sessions.map((session) => {
            return (
              <TableContainer
                key={session.id}
                sx={{ overflowX: "hidden", mb: 2 }}
              >
                <ProgramTitle
                  title={session.session_title}
                  timezone={selectedTimezone}
                  date={session.date}
                />
                <div className="program-table-container">
                  <Table
                    sx={{
                      width: "100%",
                      // minWidth: "600px",
                      mb: 1,
                      borderCollapse: "separate",
                      borderSpacing: "10px",
                    }}
                  >
                    <TableBody>
                      {programs
                        .filter((program) => {
                          return program.session === session.id;
                        })
                        .map((program, index) => (
                          <ProgramContent
                            selectedTimezone={selectedTimezone}
                            isAdmin={false}
                            key={program.id}
                            {...program}
                            index={index}
                          />
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TableContainer>
            );
          })}
        {programFileLink && (
          <NSSButton
            variant="gradient"
            style={{ margin: "0 auto" }}
            onClick={() => {
              window.open(programFileLink, "_blank", "noopener noreferrer");
            }}
          >
            전체 프로그램 다운로드
          </NSSButton>
        )}
      </Box>
    </ProgramsListContainer>
  );
};

export default ProgramsList;
