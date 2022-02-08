import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgramTitle from "components/Programs/ProgramTitle/ProgramTitle";
import ProgramContent from "components/Programs/ProgramContent/ProgramContent";
import { AsiaProgramsContainer } from "./AsiaProgramsStyles";

const AsiaPrograms = () => {
  const [programs, setPrograms] = useState<Program.programType[]>([]);
  const [sessions, setSessions] = useState<Program.sessionType[]>([]);

  // 프로그램 가져오기
  useEffect(() => {
    const getPrograms = async () => {
      const programs = await axios.get("/api/page/asia/programs");
      setPrograms(programs.data);
    };
    getPrograms();
  }, []);

  // 세션 가져오기
  useEffect(() => {
    const getSessions = async () => {
      const sessions = await axios.get("/api/page/asia/sessions");
      setSessions(sessions.data);
    };
    getSessions();
  }, []);

  return (
    <AsiaProgramsContainer>
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
    </AsiaProgramsContainer>
  );
};

export default AsiaPrograms;
