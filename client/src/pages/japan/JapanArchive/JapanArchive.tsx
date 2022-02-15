import React from "react";
import { Box, Button, Grid } from "@mui/material";
import Title from "components/Title/Title";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import { Link } from "react-router-dom";
import { JapanArchiveContainer } from "./JapanArchiveStyles";
import useCheckLocal from "../../../hooks/useCheckLocal";
import YoutubeEmbed from "../../../components/YoutubeEmbed/YoutubeEmbed";
import useSeoTitle from "../../../hooks/useSeoTitle";
import usePageViews from "../../../hooks/usePageViews";
import { globalData } from "../../../components/NavBar/NavBar";

const JapanArchive = () => {
  const speakersState: Speaker.speakerType[] = [
    {
      id: 1,
      name: "江刺 正喜",
      belong:
        "国立大学法人東北大学\n" +
        "\n" +
        "マイクロシステム融合開発センター\n" +
        "\n" +
        "​博士",
      description: "「半導体微細加工を発展させたMEMSとその開発支援」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975561-3347f061-745b-4ebf-a5c6-9c0e26ca73ad.png",
    },
    {
      id: 2,
      name: "福間 剛士",
      belong: "金沢大学ナノ生命科学研究所​所長・教授",
      description: "「革新的液中原子間力顕微鏡技術による未踏ナノ領域の可視化」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975570-422f741d-15fe-42a4-864d-052227571b42.png",
    },
    {
      id: 3,
      name: "嘉数 誠",
      belong: "佐賀大学大学院理工学研究科​教授",
      description: "「ダイヤモンド半導体の最近の進展」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975577-4407ec14-fd93-4ba6-befd-5f8e2c6fb3cf.png",
    },
    {
      id: 4,
      name: "米田 忠弘",
      belong:
        "国立大学法人東北大学\n" +
        "\n" +
        "多元物質科学研究所\n" +
        "\n" +
        "走査プローブ計測技術研究分野\n" +
        "\n" +
        "​教授",
      description:
        "「走査型プローブ顕微鏡を用いた\n" +
        "二次元層状化合物の基礎と\n" +
        "デバイス応用」\n",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975581-5267699c-0e61-429f-9cc5-d5208d8eb14f.png",
    },
    {
      id: 5,
      name: "​井須 紀文",
      belong:
        "株式会社LIXIL\n" +
        "\n" +
        "Technology Innovation 本部\n" +
        "\n" +
        "分析・環境技術開発部\n" +
        "\n" +
        "​リーダー",
      description: "「住宅用防汚・抗菌材料と表面分析」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975586-53c4490c-8df3-48d8-ab5c-f21c6b13341e.png",
    },
    {
      id: 6,
      name: "藤本 亜由美",
      belong:
        "株式会社カネカテクノリサーチ\n" +
        "\n" +
        "分析部 大阪分析センター\n" +
        "\n" +
        "​第一グループ",
      description:
        "「凍結割断レプリカ法を用いた\n" +
        "\n" +
        "​メタンハイドレートの\n" +
        "\n" +
        "微細構造観察」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975591-2e441673-ba86-4183-af70-916347f37c4d.png",
    },
    {
      id: 7,
      name: "近間 克己",
      belong:
        "日産化学株式会社\n" +
        "\n" +
        "物質科学研究所 物質解析研究部\n" +
        "\n" +
        "​解析研究グループ",
      description: "「積層薄膜の構造解析」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975597-b2f9b12c-f87b-4b26-a306-d1140e46bd8c.png",
    },
    {
      id: 8,
      name: "高井 治",
      belong: "関東学院大学材料・表面工学研究所​所長",
      description: "「ナノインデンテーションによる​薄膜の機械的特性評価」",
      image_path:
        "https://user-images.githubusercontent.com/69495129/153975607-08a6ed3b-5857-463e-872c-e4c60df2a11b.png",
    },
  ];
  const isLocal = useCheckLocal();

  const pathname = usePageViews();
  const { archive } = globalData.get(pathname) as Common.globalDataType;

  useSeoTitle(archive as string, pathname);

  return (
    <JapanArchiveContainer>
      <img
        src="https://user-images.githubusercontent.com/69495129/153967864-809f8709-27f7-401a-93c9-ad8fc654fc23.png"
        alt="banner"
        className="banner"
      />

      <section className="content">
        <div className="string-content">
          <h1>各講演アーカイブにて公開中！</h1>
          <h4>※動画視聴には、フォームの記入および提出が必要です。</h4>

          <Button
            size="large"
            variant="contained"
            onClick={() =>
              window.open("https://tayori.com/f/nssj2021-archive/", "_blank")
            }
          >
            NSS Japan 2022 アーカイブ
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() =>
              window.open("https://bit.ly/NSSJ-2021-Abstract", "_blank")
            }
          >
            NSS Japan 2022 要旨集
          </Button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video className="video-content" autoPlay muted>
          <source
            src="https://video.wixstatic.com/video/cb12c8_4b8a81f7685246f4b812936b63c96ccc/720p/mp4/file.mp4"
            type="video/mp4"
          />
        </video>
      </section>

      <section className="speakers">
        <Title title="SPEAKERS" fontSize={36} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid
            container
            spacing={{ xs: 4, md: 7 }}
            columns={{ xs: 1, sm: 8, md: 16 }}
          >
            {speakersState.map((speaker) => (
              <SpeakerCard isLocal={isLocal} speaker={speaker} />
            ))}
          </Grid>
        </Box>
      </section>

      <section className="exhibition">
        <img
          src="https://user-images.githubusercontent.com/69495129/153973162-ff2ba30c-e845-4b1e-bfd7-1f3e958837a9.png"
          alt="afm"
        />
        <div className="string-section">
          <h1>Virtual Exhibition</h1>
          <h5>
            原子間力顕微鏡（AFM)の展示や NanoScientific
            Magazineの展示はこちらから！
          </h5>
          <Link to="/jp/exhibit/parksystems">
            <Button size="large" variant="contained">
              バーチャル展示会はこちらから
            </Button>
          </Link>
        </div>
      </section>
      <section className="last-year">
        <YoutubeEmbed embedId="pEqU5l3n9dI" />
        <Button
          size="large"
          variant="contained"
          onClick={() =>
            window.open("https://tayori.com/f/nssj2020-archive/", "_blank")
          }
        >
          ナノ科学シンポジウム2020 アーカイブ
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() =>
            window.open(
              "https://1drv.ms/b/s!AvTejuaCDJUVhEhrzXp_OlPqmOsl?e=lFIysP",
              "_blank",
            )
          }
        >
          {" "}
          ナノ科学シンポジウム2020 要旨集
        </Button>
      </section>
    </JapanArchiveContainer>
  );
};

export default JapanArchive;
