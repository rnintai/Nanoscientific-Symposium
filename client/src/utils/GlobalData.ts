const S3_URL = "https://nss-integration.s3.us-west-1.amazonaws.com";

export const globalData = new Map<string, Common.globalDataType>([
  [
    "common",
    {
      nations: [
        {
          name: "Asia",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "asia",
        },
        {
          name: "Korea",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "kr",
        },
        {
          name: "US",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "us",
        },
        {
          name: "Japan",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "jp",
        },
        {
          name: "China",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "https://nanoscientific.com.cn",
        },
        {
          name: "Europe",
          date: "TBD",
          landingImage: "https://vemaps.com/uploads/img/large/kr-04.jpg",
          path: "eu",
        },
      ],
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      fullLogoURL: `${S3_URL}/common/NS_logo_color.svg`,
      eventLandingMainBannerURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_thumb.jpg",
      eventLandingDesc:
        "Ut a venenatis neque, in blandit urna. Proin facilisis, nulla sit amet congue tincidunt, orci quam fermentum erat, id ultrices tellus velit in velit. Fusce feugiat, erat eu varius gravida, mauris neque posuere mauris, a cursus mi mauris a justo. Nam suscipit semper auctor. Etiam sed gravida leo. Mauris rutrum massa varius neque rhoncus, id condimentum ante fringilla. Nam eu egestas turpis. Pellentesque neque ipsum, lacinia nec faucibus faucibus, molestie a felis. Proin quam ligula, suscipit imperdiet lorem in, porttitor pharetra mi. Nulla facilisi.",
      eventLandingBodyBackground: "",
    },
  ],
  [
    "asia",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // sign in 관련
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // landing
      landingSection1BackgroundURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_thumb.jpg",
      landingSection1LogoURL:
        "https://d25unujvh7ui3r.cloudfront.net/asia/NS_logo.svg",
      landingSection1Desc:
        "Join the 5th edition of the NanoScientific Symposium US 2022 - the platform for nanoscience and SPM research!",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br /><br />It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      landingSection2Video: "5aqzJQgN9X0",
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
        "Nanomechanical and Electrical Characterization",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
        "Prof. Dr. Lukas Eng,<br />Technical University Dresden",
      ],
      landingSection5Title: "Keynote Speakers",
      landingSection6Title: "Past Events",
      landingSection6Videos: [
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_1_asia.mp4",
        "https://d25unujvh7ui3r.cloudfront.net/asia/home_2_asia.mp4",
      ],

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
    },
  ],
  [
    "kr",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/kr/NS_logo.svg",
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      sponsors: "협찬사",
      home: "홈",
      signInText: "로그인",
      registration: "등록",

      // user 관련
      emailInputLabel: "이메일 주소",
    },
  ],
  [
    "latam",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/latam/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      signInText: "SIGN IN",

      registration: "REGISTRATION",
    },
  ],
  [
    "jp",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/jp/NS_logo.svg",
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",
      signInText: "SIGN IN",
      registration: "登録",
    },
  ],
  [
    "us",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/us/NS_logo.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      signInText: "SIGN IN",
      registration: "REGISTRATION",
    },
  ],
  [
    "eu",
    {
      logoURL: "https://d25unujvh7ui3r.cloudfront.net/eu/NS_logo_color.svg",
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // sign in 관련
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc:
        "Join the 5th edition of the NanoScientific Symposium Europe 2022 - the platform for nanoscience and SPM research!",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `NSFE series is an open European AFM User Forum focusing on sharing and exchanging the cutting-edge research for both materials and life science disciplines using Atomic Force Miscroscopy (AFM).
      <br /><br />The research focus of the 5th NSFE 2022 will be laid on wide range of SPM applications and techniques that empower to transform life standards. We will talk about emerging nanomaterials for advanced technologies, functional surfaces and hybrid materials as well as innovative methods in nanotechnology and correlative microscopy. The edition is open to global audience and will be held online.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `Nanoscientific Symposium presents insights on the rapidly evoling R&D and innovations in nanotechnology.
        Our 2022 symposium provides how the most recent research has been done in the various fields.
        The best pool to learn about nanoscientific studies and build your connection with experts.`,
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Characterization of soft materials in liquid environment",
        "Advanced Imaging",
        "High resolution imaging",
        "Automation in AFM",
        "Correlative Microscopy",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lucas Eng.<br/> Technical University Dresden",
        "Dr. Baan Baizer<br/> University Freiburg",
        "Dr. Tobias Cramer<br/> University of Bologna",
        "Dr. Ilka Hermes<br/> Leibniz Institute of Polymer Research Dresden",
        "Dr.-Ing. Lisa Ditscherlein<br/> TU Bergakademie Freiberg",
        "Prof. Brian Rodriguez<br/>Universty College Dublin",
      ],
      landingSection5Title: "Keynote Speakers",
      landingSection6Title: "Submit All Year long",
      landingSection6Desc:
        "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore all on-demand sessions",
      landingSection6ButtonLink:
        "https://www.youtube.com/watch?v=8K__qXUK6pQ&list=PLH4cAUjlEqR22kq2fJ7v1raLfZHx6HVQn",
      landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Sponsored By",
      landingSection7Sponsors: [
        {
          name: "Park Systems",
          img: "https://d25unujvh7ui3r.cloudfront.net/event/park_logo.png",
          url: "https://parksystems.com",
        },
      ],

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
    },
  ],
]);
