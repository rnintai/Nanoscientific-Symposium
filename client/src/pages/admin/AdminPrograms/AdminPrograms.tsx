import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import axios from "axios";
import Loading from "components/Loading/Loading";
import ProgramTitle from "components/Programs/ProgramTitle/ProgramTitle";
import ProgramContent from "components/Programs/ProgramContent/ProgramContent";
import {
  ProgramsListContainer,
  StyledTimezoneSelect,
} from "components/Programs/ProgramsListContainer";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import SessionForm from "pages/admin/Forms/SessionForm";
import ProgramForm from "pages/admin/Forms/ProgramForm";
import ProgramHideForm from "pages/admin/Forms/ProgramHideForm";
import { useAuthState } from "context/AuthContext";
import usePageViews from "hooks/usePageViews";
import { AdminProgramsContainer } from "./AdminProgramsStyles";

const AdminPrograms = () => {
  const authState = useAuthState();
  const pathname = usePageViews();

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);
  const [sessionEdit, setSessionEdit] = useState<boolean>(false);
  const [programEdit, setProgramEdit] = useState<boolean>(false);

  const [openSessionForm, setOpenSessionForm] = useState<boolean>(false);
  const [sessionSuccess, setSessionSuccess] = useState<boolean>(false);

  const [openProgramForm, setOpenProgramForm] = useState<boolean>(false);
  const [programSuccess, setProgramSuccess] = useState<boolean>(false);

  const [openHideForm, setOpenHideForm] = useState<boolean>(false);

  const [selectedSession, setSelectedSession] = useState<Program.sessionType>();
  const [selectedProgram, setSelectedProgram] = useState<Program.programType>();
  const getPrograms = async () => {
    const config = {
      params: {
        nation: pathname,
      },
    };
    setProgramLoading(true);
    const programs = await axios.get(`/api/page/common/programs`, config);
    setPrograms(programs.data);
    setProgramLoading(false);
  };

  const getSessions = async () => {
    const config = {
      params: {
        nation: pathname,
      },
    };
    setSessionLoading(true);
    const sessions = await axios.get(`/api/page/common/sessions`, config);
    setSessions(sessions.data);
    setSessionLoading(false);
  };

  useEffect(() => {
    // 프로그램 가져오기
    getPrograms();
  }, []);

  useEffect(() => {
    // 세션 가져오기
    getSessions();
  }, []);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  const openSessionFormHandler = () => {
    setSessionEdit(false);
    setOpenSessionForm(true);
  };

  const openProgramFormHandler = () => {
    setProgramEdit(false);
    setOpenProgramForm(true);
  };

  const openHideFormHandler = () => {
    setOpenHideForm(true);
  };

  return (
    <AdminLayout
      title="Programs"
      menu1="Add Session"
      menu1ClickHandler={openSessionFormHandler}
      menu2="Add Programs"
      menu2ClickHandler={openProgramFormHandler}
      menu3="Hidden Items"
      menu3ClickHandler={openHideFormHandler}
    >
      <AdminProgramsContainer>
        <ProgramsListContainer isAdmin>
          <article className="program-wrap">
            <section className="timeline-wrap timeline-0">
              <StyledTimezoneSelect
                value={selectedTimezone}
                onChange={(e) => {
                  setSelectedTimezone(e.value);
                }}
              />
              {/* 세션을 크게 돌면서 세션에 해당하는값과 일치하는 프로그램 뿌려주기 */}
              {sessions.map((session) => {
                return (
                  <React.Fragment key={session.id}>
                    <ProgramTitle
                      onClick={() => {
                        setSelectedSession(session);
                        setSessionEdit(true);
                        setOpenSessionForm(true);
                      }}
                      isAdmin
                      title={session.session_title}
                    />
                    <ul className="cbp_tmtimeline">
                      {programs
                        .filter((program) => {
                          return program.session === session.id;
                        })
                        .map((program, index) => (
                          <ProgramContent
                            selectedTimezone={selectedTimezone}
                            onClick={() => {
                              setSelectedProgram(program);
                              setProgramEdit(true);
                              setOpenProgramForm(true);
                            }}
                            isAdmin
                            key={program.id}
                            {...program}
                            index={index}
                          />
                        ))}
                    </ul>
                  </React.Fragment>
                );
              })}
            </section>
          </article>
        </ProgramsListContainer>
      </AdminProgramsContainer>

      {openSessionForm && (
        <SessionForm
          getSessions={() => {
            getSessions();
          }}
          selectedSession={selectedSession as Program.sessionType}
          openSessionForm={openSessionForm}
          setOpenSessionForm={setOpenSessionForm}
          setSessionSuccess={setSessionSuccess}
          edit={sessionEdit}
        />
      )}

      {openProgramForm && (
        <ProgramForm
          getPrograms={() => {
            getPrograms();
          }}
          sessions={sessions}
          selectedProgram={selectedProgram as Program.programType}
          openProgramForm={openProgramForm}
          setOpenProgramForm={setOpenProgramForm}
          setProgramSuccess={setProgramSuccess}
          edit={programEdit}
        />
      )}

      {openHideForm && (
        <ProgramHideForm
          openHideForm={openHideForm}
          setOpenHideForm={setOpenHideForm}
          refreshFunction={() => {
            getSessions();
            getPrograms();
          }}
        />
      )}
      <TopCenterSnackBar
        value={sessionSuccess}
        setValue={setSessionSuccess}
        severity="success"
        content="Success"
      />
      <TopCenterSnackBar
        value={programSuccess}
        setValue={setProgramSuccess}
        severity="success"
        content="Success"
      />
    </AdminLayout>
  );
};

export default AdminPrograms;
