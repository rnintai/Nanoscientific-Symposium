import React from "react";
import Title from "components/Title/Title";
import { Button } from "@mui/material";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import { JapanGreetingContainer } from "./JapanGreetingStyles";

const JapanGreeting = () => {
  return (
    <JapanGreetingContainer>
      <Title title="ごあいさつ" fontSize={40} />

      <div className="content-container">
        <div className="image-container">
          <img
            src="https://user-images.githubusercontent.com/69495129/153128003-c685fc0b-1c4e-4cc1-bab8-88b458dfd03c.png"
            alt="takai"
          />
          <img
            className="string"
            src="https://user-images.githubusercontent.com/69495129/153128060-fb6e3088-e659-4031-a28b-40812e91ccc6.png"
            alt="desc"
          />
          <p>関東学院大学材料・表面工学研究所 高井 治 所長</p>
        </div>
        <div className="desc-container">
          <p>
            材料・表面技術は、いろいろな産業において、なくてはならない技術となっています。今日、求められる表面改質・表面処理の厚さはナノメートルオーダーに達し、さらに微小化が進んでいます。その表面を計測・解析する方法も各種発展しています。特に、1982年に発表された走査型トンネル顕微鏡から発展した走査型プローブ顕微鏡では、原子1個1個を観察、解析し、操作することが可能になり、ナノレベルでの表面計測・解析の基礎技術としての重要性が日々増しています。
            このような背景を踏まえ、昨年に引き続き、『ナノ科学シンポジウム2021』を開催したします。主催は関東学院大学材料・表面工学研究所、協賛はパーク・システムズ・ジャパン株式会社、NanoScientific、ヤマトマテリアル株式会社、英和株式会社、後援は日刊工業新聞社です。
            当材料・表面工学研究所は、材料・表面工学の分野において産学連携を強く進めています。今回、講演者には、MEMS技術、表面分析・解析技術、表面技術などの第一線で活躍している8名の先生をお招きしています。
            COVID-19が収まらない中、この度の開催にあたり、8名のご講演の先生方、ご参加の皆様、ご協賛、ご後援の各社ならびにご関係の皆様に心よりお礼申し上げます。
          </p>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          <p className="name">関東学院大学材料・表面工学研究所 所長 高井　治</p>
          <p style={{ textAlign: "right" }}>
            <img
              src="https://user-images.githubusercontent.com/69495129/153130688-3b454f9d-fb54-4ff7-835f-c81b61f27d48.png"
              alt="logo"
            />
          </p>
        </div>
      </div>
      <br />

      <div className="video-container">
        <Title
          title="ナノ科学シンポジウム2020 Review & Interview"
          fontSize={24}
        />

        <YoutubeEmbed embedId="pEqU5l3n9dI" />

        <div className="button-container">
          <Button variant="contained">
            ナノ科学シンポジウム2022の参加登録はこちらから
          </Button>
        </div>
      </div>
    </JapanGreetingContainer>
  );
};

export default JapanGreeting;
