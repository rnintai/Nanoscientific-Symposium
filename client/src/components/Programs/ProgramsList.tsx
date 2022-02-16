import React, { useEffect, useState } from "react";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import ProgramTitle from "./ProgramTitle/ProgramTitle";
import ProgramContent from "./ProgramContent/ProgramContent";
import { ProgramsListContainer } from "./ProgramsListContainer";

const ProgramsList = () => {
  const pathname = usePageViews();
  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);
  const [programLoading, setProgramLoading] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);

  useEffect(() => {
    // 프로그램 가져오기
    const getPrograms = async () => {
      setProgramLoading(true);
      const programs = await axios.get(`/api/page/${pathname}/programs`);
      setPrograms(programs.data);
      setProgramLoading(false);
    };

    getPrograms();
  }, []);

  useEffect(() => {
    // 세션 가져오기
    const getSessions = async () => {
      setSessionLoading(true);
      const sessions = await axios.get(`/api/page${pathname}/sessions`);
      setSessions(sessions.data);
      setSessionLoading(false);
    };

    getSessions();
  }, []);

  if (programLoading || sessionLoading) {
    return <Loading />;
  }

  return (
    <ProgramsListContainer>
      <article className="program-wrap">
        <section
          className="timeline-wrap timeline-0"
          style={{ margin: "20px 20px 50px 20px" }}
        >
          {/* 세션을 크게 돌면서 세션에 해당하는값과 일치하는 프로그램 뿌려주기 */}
          {sessions.map((session) => {
            return (
              <>
                <ProgramTitle title={session.session_title} />
                <ul className="cbp_tmtimeline">
                  {programs
                    .filter((program) => {
                      return program.session === session.id;
                    })
                    .map((program, index) => (
                      <ProgramContent
                        isAdmin={false}
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

      <button
        className="download-btn"
        type="button"
        onClick={() => {
          window.open(
            "https://d25unujvh7ui3r.cloudfront.net/asia/program/NSSA_program.pdf",
          );
        }}
      >
        DOWNLOAD
      </button>
    </ProgramsListContainer>
  );
};

export default ProgramsList;
