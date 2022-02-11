import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import ProgramTitle from "components/Programs/ProgramTitle/ProgramTitle";
import ProgramContent from "components/Programs/ProgramContent/ProgramContent";
import { ProgramsListContainer } from "components/Programs/ProgramsListContainer";
import { AdminProgramsContainer } from "./AdminProgramsStyles";

const AdminPrograms = () => {
  const myCountry = "asia";

  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);

  useEffect(() => {
    // 프로그램 가져오기
    const getPrograms = async () => {
      setProgramLoading(true);
      const programs = await axios.get(`/api/page/${myCountry}/programs`);
      setPrograms(programs.data);
      setProgramLoading(false);
    };

    getPrograms();
  }, []);

  useEffect(() => {
    // 세션 가져오기
    const getSessions = async () => {
      setSessionLoading(true);
      const sessions = await axios.get(`/api/page/${myCountry}/sessions`);
      setSessions(sessions.data);
      setSessionLoading(false);
    };

    getSessions();
  }, []);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  return (
    <AdminProgramsContainer>
      <AdminLayout title="Programs">
        <ProgramsListContainer isAdmin>
          <article className="program-wrap">
            <section className="timeline-wrap timeline-0">
              {/* 세션을 크게 돌면서 세션에 해당하는값과 일치하는 프로그램 뿌려주기 */}
              {sessions.map((session) => {
                return (
                  <>
                    <ProgramTitle isAdmin title={session.session_title} />
                    <ul className="cbp_tmtimeline">
                      {programs
                        .filter((program) => {
                          return program.session === session.id;
                        })
                        .map((program, index) => (
                          <ProgramContent
                            isAdmin
                            key={program.id}
                            {...program}
                            index={index}
                          />
                        ))}
                    </ul>
                  </>
                );
              })}
            </section>
          </article>
        </ProgramsListContainer>
      </AdminLayout>
    </AdminProgramsContainer>
  );
};

export default AdminPrograms;
