/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Stack,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  headingFontSize,
  mainFontSize,
  subHeadingFontSize,
} from "utils/FontSize";

export const Colors = {
  navy: "#002060",
  red: "#C00000",
  grey: "#F2F2F2",
  yellow: "#FFE599",
};

const tableStyle = {
  width: "95%",
  margin: "0 auto",
  border: "1px solid #000",
  "th,td": {
    fontSize: {
      mobile: "12px !important",
      laptop: "14px !important",
    },
    textAlign: "center",
    padding: "3px",
    borderBottom: "1px solid #000",
    borderRight: "1px solid #000",
  },
};

const bgGrey = {
  backgroundColor: Colors.grey,
  fontWeight: 600,
};
const bgYellow = {
  backgroundColor: Colors.yellow,
  fontWeight: 600,
};

const RegisterInfo = () => {
  const navigate = useNavigate();

  return (
    <Box className="layout body-fit">
      <Typography
        fontWeight={600}
        fontSize={headingFontSize}
        textAlign="center"
      >
        등록 안내
      </Typography>
      <br />
      <Typography
        fontWeight={600}
        fontSize={subHeadingFontSize}
        color={Colors.navy}
      >
        ▶NSSK 공식 웹사이트를 통해 등록하시면,{" "}
        <span style={{ color: Colors.red }}>선착순 100명</span>에 한해{" "}
        <span style={{ color: Colors.red }}>사전등록비 50% 할인</span>적용◀
      </Typography>
      <Typography fontSize={mainFontSize}>
        <span>
          ※ 등록하시면, NSSK와 동시 개최하는 한국표면분석학회 학술대회의 모든
          일정(11.22~11.24)에 참가하실 수 있습니다.{" "}
          <a
            className="link-default"
            href="https://surfaceanalysis.kr/bbs/content.php?co_id=Conf_guest_speaker&cat=3&sub=0"
            target="_blank"
            rel="noreferrer"
          >
            학술대회 초청연사 보기
          </a>
        </span>
        <p>
          ※ 회원: 한국표면분석학회에 회원가입(연회비 납부) 시 적용.{" "}
          <a
            className="link-default"
            href="https://surfaceanalysis.kr/bbs/content.php?co_id=sign_info&cat=5&sub=0"
            target="_blank"
            rel="noreferrer"
          >
            학회가입안내
          </a>
        </p>
      </Typography>
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        학술대회
      </Typography>
      <br />
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell sx={bgGrey} colSpan={2} width="40%">
              구분
            </TableCell>
            <TableCell sx={bgGrey}>사전등록</TableCell>
            <TableCell sx={bgGrey}>현장등록</TableCell>
            <TableCell sx={bgYellow}>
              NSSK등록우대
              <br />
              (50% 할인)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={bgGrey} rowSpan={2}>
              회원
            </TableCell>
            <TableCell sx={bgGrey}>정회원</TableCell>
            <TableCell>300,000원</TableCell>
            <TableCell>350,000원</TableCell>
            <TableCell sx={bgYellow}>150,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>학생회원</TableCell>
            <TableCell>150,000원</TableCell>
            <TableCell>200,000원</TableCell>
            <TableCell sx={bgYellow}>75,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey} rowSpan={2}>
              비회원
            </TableCell>
            <TableCell sx={bgGrey}>일반</TableCell>
            <TableCell>400,000원</TableCell>
            <TableCell>450,000원</TableCell>
            <TableCell sx={bgYellow}>200,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>학생</TableCell>
            <TableCell>200,000원</TableCell>
            <TableCell>250,000원</TableCell>
            <TableCell sx={bgYellow}>100,000원</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        튜토리얼
      </Typography>
      <br />
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell sx={bgGrey} width="40%">
              구분
            </TableCell>
            <TableCell sx={bgGrey}>사전등록</TableCell>
            <TableCell sx={bgGrey}>현장등록</TableCell>
            <TableCell sx={bgYellow}>
              NSSK등록우대
              <br />
              (50% 할인)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={bgGrey}>회원 (정회원, 학생회원)</TableCell>
            <TableCell>100,000원</TableCell>
            <TableCell>150,000원</TableCell>
            <TableCell sx={bgYellow}>50,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>비회원 (일반, 학생)</TableCell>
            <TableCell>150,000원</TableCell>
            <TableCell>200,000원</TableCell>
            <TableCell sx={bgYellow}>75,000원</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        학술대회 + 튜토리얼
      </Typography>
      <br />
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell sx={bgGrey} colSpan={2} width="40%">
              구분
            </TableCell>
            <TableCell sx={bgGrey}>사전등록</TableCell>
            <TableCell sx={bgGrey}>현장등록</TableCell>
            <TableCell sx={bgYellow}>
              NSSK등록우대
              <br />
              (50% 할인)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={bgGrey} rowSpan={2}>
              회원
            </TableCell>
            <TableCell sx={bgGrey}>정회원</TableCell>
            <TableCell>400,000원</TableCell>
            <TableCell>450,000원</TableCell>
            <TableCell sx={bgYellow}>200,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>학생회원</TableCell>
            <TableCell>250,000원</TableCell>
            <TableCell>300,000원</TableCell>
            <TableCell sx={bgYellow}>150,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey} rowSpan={2}>
              비회원
            </TableCell>
            <TableCell sx={bgGrey}>일반</TableCell>
            <TableCell>500,000원</TableCell>
            <TableCell>550,000원</TableCell>
            <TableCell sx={bgYellow}>275,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>학생</TableCell>
            <TableCell>300,000원</TableCell>
            <TableCell>350,000원</TableCell>
            <TableCell sx={bgYellow}>175,000원</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <Typography fontSize={mainFontSize} fontWeight={600} color={Colors.navy}>
        ※ 결제방법
      </Typography>
      <Typography fontSize={mainFontSize}>
        ▶카드결제 : 심포지엄 당일 현장에서 카드 결제 하실 수 있습니다. <br />
        ▶계좌송금 : 국민은행 468401-04-235214 사단법인 한국표면분석학회 (계산서
        발행가능)
      </Typography>
      <Typography fontSize={mainFontSize} fontWeight={600}>
        계산서 발행 관련 연락처
      </Typography>
      <Typography fontSize={mainFontSize}>
        e-mail :{" "}
        <a href="mailto:kossa@surfaceanalysis.kr" className="link-default">
          kossa@surfaceanalysis.kr
        </a>
        , Tel. 042-864-2007
      </Typography>
      <br />
      <NSSButton
        variant="gradient"
        style={{ margin: "0 auto" }}
        onClick={() => {
          navigate("/kr/registration");
        }}
      >
        등록 바로가기
      </NSSButton>
    </Box>
  );
};

export default RegisterInfo;
