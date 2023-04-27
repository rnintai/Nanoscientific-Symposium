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
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import useCurrentYear from "hooks/useCurrentYear";
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
  blueGrey: "#0563c1",
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

interface TableCellProps extends React.ComponentPropsWithoutRef<"td"> {
  children: JSX.Element | JSX.Element[] | string | string[];
}

const TableCellBold = (props: TableCellProps) => {
  const { children } = props;
  return <TableCell sx={{ fontWeight: 700 }}>{children}</TableCell>;
};

const RegisterInfo2023 = () => {
  const navigate = useNavigate();
  const currentYear = useCurrentYear();

  const [agreeChecked, setAgreeChecked] = useState<boolean>(false);

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
        ※ <span style={{ color: Colors.red }}>선착순 100명 </span>사전등록 시{" "}
        <span style={{ color: Colors.red }}>등록비 50% 할인</span>적용!
      </Typography>
      <Typography fontSize={mainFontSize}>
        <span>
          ※ NANOscientific Symposium Korea(NSS Korea)는 한국표면분석학회 주최,
          NANOscientific 주관으로 개최합니다.
        </span>
        <p>
          ※ 정회원: 한국표면분석학회에 회원가입(연회비 납부) 시 적용.{" "}
          <a
            className="link-default"
            href="https://surfaceanalysis.kr/bbs/content.php?co_id=sign_info&cat=5&sub=0"
            target="_blank"
            rel="noreferrer"
          >
            학회 가입 안내
          </a>
        </p>
      </Typography>
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        심포지엄(6/29) – 오프라인
      </Typography>
      <br />
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell sx={bgGrey} colSpan={2} width="40%">
              구분
            </TableCell>
            <TableCell sx={bgGrey}>현장등록</TableCell>
            <TableCell sx={bgGrey}>
              사전등록
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
            <TableCell>350,000원</TableCell>
            <TableCell sx={bgYellow}>150,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>학생회원</TableCell>
            <TableCell>200,000원</TableCell>
            <TableCell sx={bgYellow}>75,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey} rowSpan={2}>
              비회원
            </TableCell>
            <TableCell sx={bgGrey}>일반</TableCell>
            <TableCell>450,000원</TableCell>
            <TableCell sx={bgYellow}>200,000원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={bgGrey}>학생</TableCell>
            <TableCell>250,000원</TableCell>
            <TableCell sx={bgYellow}>100,000원</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <Typography fontSize={mainFontSize}>
        <a
          className="link-default"
          href="https://surfaceanalysis.kr/bbs/content.php?co_id=sign_info&cat=5&sub=0"
          target="_blank"
          rel="noreferrer noopener"
        >
          ※ 학회 가입 안내 바로가기
        </a>
      </Typography>
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        심포지엄(6/29) – 온라인
      </Typography>
      <br />
      <Typography fontSize={mainFontSize}>
        50,000원 *일반/학생 및 회원 구분 없음
      </Typography>
      <br />
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        장비체험(6/30) – 오프라인
      </Typography>
      <br />
      <Typography fontSize={mainFontSize}>
        100,000원(부가세 별도) *
        <span style={{ color: Colors.red, fontWeight: 600 }}>
          선착순 15명 한정
        </span>
        , 원자현미경(AFM) 데모, 실습
        <br />
        선착순 15명 접수 가능하며, 신청 방법은 페이지 하단{" "}
        <span style={{ textDecoration: "underline" }}>장비체험 신청안내</span>를
        참고해주세요.
      </Typography>
      <br />
      <hr style={{ borderColor: "#ffffff" }} />
      <br />
      <Typography fontSize={mainFontSize} fontWeight={600} color={Colors.navy}>
        ※ 결제방법 : 신용카드 결제 또는 계좌송금 가능
      </Typography>
      <Typography fontSize={mainFontSize}>
        ✔ 카드결제 : 한국표면분석학회 홈페이지 결제창에서 온라인 결제 가능{" "}
        <br />✔ 계좌송금 : 국민은행 468401-04-235214 사단법인 한국표면분석학회
        (계산서 발행가능)
      </Typography>
      <Typography fontSize={mainFontSize}>
        ✔ 전자계산서 발행: 온라인 등록 후 요청사항 및 사업자등록증을 계산서 발행
        문의처 메일로 송부
      </Typography>
      <Typography fontSize={mainFontSize}>
        ✔ 계산서 발행 문의처: (사)한국표면분석학회 사무국 042-864-2007,{" "}
        <a href="mailto:kossa@surfaceanalysis.kr" className="link-default">
          kossa@surfaceanalysis.kr
        </a>
      </Typography>
      <br />
      <Typography fontSize={mainFontSize} fontWeight={600} color={Colors.navy}>
        ※ 심포지엄(6/29) 결제안내: 한국표면분석학회 홈페이지에서 결제 가능
      </Typography>
      <Typography fontSize={mainFontSize}>
        ✔ NANOscientific Symposium Korea는 한국표면분석학회 주최로 개최하며,
        등록비용 결제는 한국표면분석학회 홈페이지를 통해 진행됩니다.
      </Typography>
      <Typography fontSize={mainFontSize}>
        ✔ 카드 결제 및 계좌 송금 영수증 (또는 전자계산서)은 한국표면분석학회
        이름으로 발행됩니다.
      </Typography>
      <Typography fontSize={mainFontSize}>
        ✔ 한국표면분석학회 홈페이지를 통한 등록비 결제 동의 후, 등록을 진행해
        주세요. 미동의 시 등록이 제한될 수 있습니다.
      </Typography>
      <br />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              required
              checked={agreeChecked}
              onChange={() => {
                setAgreeChecked(!agreeChecked);
              }}
            />
          }
          sx={{
            ".MuiFormControlLabel-label": {
              fontWeight: 600,
              fontSize: mainFontSize,
            },
          }}
          label="*NSS Korea 참가 등록을 위해 한국표면분석학회 홈페이지로 이동하여 결제하는 것에 동의합니다."
          labelPlacement="end"
        />
      </FormGroup>
      <br />
      <NSSButton
        variant="gradient"
        style={{ margin: "0 auto" }}
        onClick={() => {
          navigate(`/kr/${currentYear}/registration`);
        }}
        disabled={!agreeChecked}
      >
        등록하기
      </NSSButton>
      <br />
      <Typography fontSize={mainFontSize} fontWeight={600} color={Colors.navy}>
        ※ 장비체험(6/30) 신청안내: 선착순 15명 ☞ 장소: 파크시스템스 본사
      </Typography>
      <Typography fontSize={mainFontSize}>
        장비 체험 신청은 선착순으로 마감되며 3~5분이 그룹이 되어 함께 교육을
        받게 됩니다. 신청은 아래사항을 기입하여 메일로 보내주시면 됩니다.{" "}
        <span style={{ color: Colors.blueGrey }}>
          ※접수처:{" "}
          <a className="link-default" href="mailto:raina@parksystems.com">
            raina@parksystems.com
          </a>
        </span>
      </Typography>
      <br />
      <Table sx={tableStyle} style={{ width: "60%" }}>
        <TableBody>
          <TableRow>
            <TableCellBold>이름</TableCellBold>
            <TableCell sx={{ width: "25%" }} />
            <TableCellBold>이메일</TableCellBold>
            <TableCell sx={{ width: "25%" }} />
          </TableRow>
          <TableRow>
            <TableCellBold>소속기관/학교</TableCellBold>
            <TableCell sx={{ width: "25%" }} />
            <TableCellBold>소속부서/전공</TableCellBold>
            <TableCell sx={{ width: "25%" }} />
          </TableRow>
          <TableRow>
            <TableCellBold>연락처</TableCellBold>
            <TableCell sx={{ width: "25%" }} />
            <TableCellBold>핸드폰</TableCellBold>
            <TableCell sx={{ width: "25%" }} />
          </TableRow>
          <TableRow>
            <TableCellBold>연락처</TableCellBold>
            <TableCell colSpan={3} />
          </TableRow>
          <TableRow>
            <TableCellBold>결제방법</TableCellBold>
            <TableCell colSpan={3}>□ 계좌송금 □ 카드결제</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={2} colSpan={4} style={{ textAlign: "start" }}>
              ✔ 계좌송금: 국민은행 468401-04-235214 사단법인 한국표면분석학회
              (계산서 발행가능)
              <br />✔ 카드결제: 6월 16일까지 결제정보(카드번호, 유효기간) 필요,
              당일 현장 결제 진행
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <Typography
        color={{ color: Colors.navy }}
        fontSize={subHeadingFontSize}
        fontWeight={600}
      >
        문의처
      </Typography>
      <br />
      <Typography fontSize={mainFontSize}>
        NANOscientific Sympopsium Korea 사무국: 이연수 차장
        <br />
        TEL) 031-546-6819 E-mail){" "}
        <a className="link-default" href="mailto:raina@parksystems.com">
          raina@parksystems.com
        </a>
      </Typography>
    </Box>
  );
};

export default RegisterInfo2023;
