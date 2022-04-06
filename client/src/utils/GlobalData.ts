const S3_URL = "https://nss-integration.s3.us-west-1.amazonaws.com";

export const globalData = new Map<string, Common.globalDataType>([
  [
    "",
    {
      signInText: "SIGN IN",
    },
  ],
  [
    "common",
    {
      nations: [
        {
          name: "NSS SE Asia",
          date: "Sep 22",
          path: "asia",
        },
        {
          name: "NSS US",
          date: "Sep 29",
          path: "us",
        },
        {
          name: "NSF Europe",
          date: "Oct 06 - 07",
          path: "eu",
        },
        {
          name: "NSS China",
          date: "Oct 27 - 28",
          path: "https://nanoscientific.com.cn",
        },
        {
          name: "NSS Japan",
          date: "Nov 18",
          path: "jp",
        },
        {
          name: "NSS Korea",
          date: "Nov 24",
          path: "kr",
        },
      ],
      logoURL: `${S3_URL}/common/NSS_logo_Type3.svg`,
      teaserVideoEmbed: "a",
      bannerLogoURL: `${S3_URL}/common/NSS_logo_white_main.svg`,
      eventLandingMainBannerURL: `${S3_URL}/common/main-landing-banner.jpg`,
      eventLandingDesc: `NanoScientific plans are underway to continue the excitement that comes from scientific innovation and discovery with a new line up for 2022! Stay tuned for the 2022 NanoScientific Event Calendar for your chance to network with leading experts who are pioneering the evolution of scientific discovery at NanoScientific Conferences Worldwide.
`,
      sponsor1LogoURL: `${S3_URL}/common/sponsored_by_NS.svg`,
      sponsor2LogoURL: `${S3_URL}/common/Park_logo.svg`,
    },
  ],
  [
    "asia",
    {
      logoURL: `${S3_URL}/eu/NS_logo_color.svg`,
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      // registration: "REGISTRATION",
      // buttonText
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      adminBtnText: "ADMIN",
      signOutBtnText: "SIGN OUT",
      changePasswordBtnText: "Change Password",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc:
        "Join the 4th edition of the NanoScientific Symposium Asia 2022 - the platform for nanoscience and SPM research",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `NanoScientific Symposium Asia, or NSSA, is a platform where industry professionals, nanoscience researchers, and scientists gather to learn and get insights on the future direction and latest studies being formed using Scanning Probe Microscopy.
      <br/><br/>
      NanoScientific Asia 2022 will feature state-of-the-art presentations on materials, electrical and electronics, manufacturing, life sciences, and nanotechnology. NSSA 2022 will be a great opportunity to share research on the latest advanced metrology and trends in nanotechnology with peers and attendees from the industry and academia.
      <br/><br/>
      This year's event will be live-streamed across Asia and Oceania countries, such as but not limited to Singapore, Malaysia, Indonesia, Thailand, Vietnam, Philippines, Australia, India, Pakistan, Saudi Arabia, Bangladesh, Sri Lanka, and more.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `NSSA 2022, will be a 1-day event, showcasing scientific talks and open discussion for diverse research and industry applications. This hybrid event will bring together a leading group of experts and will be a great networking opportunity.`,
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
      // resetPassword
      resetPasswordHeading: "Password Reset",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "kr",
    {
      logoURL: `https://d25unujvh7ui3r.cloudfront.net/kr/NS_logo.svg`,
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      sponsors: "협찬사",
      home: "홈",

      // sign in 관련
      signInText: "로그인",
      registration: "등록",
      goNextText: "다음",
      goPrevText: "이전",
      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc:
        "제 4회 NanoScientific Symposium Korea 2022 - 나노과학과 SPM 연구를 위한 플랫폼",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `국내 원자현미경 전문 심포지엄 나노사이언티픽 코리아 2022에 여러분을 초대합니다!
      <br/> <br/>
      나노사이언티픽 코리아는 국내 나노기술 및 원자현미경 관련 전문가들이 모여 다양한 응용기술의 최신 동향을 확인하고 새로운 연구결과들을 공유하는 심포지엄으로, 원자현미경 분야의 육성을 위한 연구자들 간의 소통이 장이 되고 있습니다. 
      최근 인공지능, 자율주행 등 4차 산업혁명이 가속화됨에 따라 핵심 기술인 나노기술의 중요성이 높아지고 있으며, 나노기술을 열어가는 중요한 도구인 원자현미경에 대한 관심도 더욱 증가하고 있습니다. 
      <br/><br/>
      나노사이언티픽 코리아에서는 국내 저명한 연사들을 초청하여 혁신적인 나노과학기술과 이와 연관된 연구결과들을 소개하고 다양한 원자현미경 어플리케이션 정보를 제공합니다.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `나노사이언티픽 코리아 2022는 나노기술을 비롯하여 원자현미경과 관련한 모든 분야를 아우르는 국내 원자현미경 전문 심포지엄입니다. 다양한 분야에서 이루어지고 있는 최신 연구를 살피고 나노과학기술에 대해 깊이 있게 교류할 수 있는 커뮤니티로 여러분을 초대합니다.`,
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
      // resetPassword
      resetPasswordHeading: "Password Reset",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
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
      goNextText: "다음",
      goPrevText: "이전",
      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc:
        "第4回NanoScientificSymposiumJapan2022-ナノ科学とSPM研究のためのプラットフォーム",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `科学技術の革新によりナノ科学では材料、表面を計測・解析する方法も各種発展しています。特に、走査型プローブ顕微鏡（SPM）の登場により、 ナノレベルでの表面計測・解析の基礎技術としての重要性が日々増しています。
      ナノ科学シンポジウムは、走査型プローブ顕微鏡を用いた 材料科学、半導体およびライフサイエンス分野の最先端の研究情報を共有・交換するSPMユーザーシンポジウムです。
      NSSJ 2022では、科学に変革をもたらすSPMの幅広い応用と技術に焦点を当て、先端技術のための新しいナノ材料、機能性表面、さらにナノテクノロジーやSPMを使った応用技術についてもお話します。`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Event Orgaziner Greeting",
      landingSection3Desc: ``,
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
      // resetPassword
      resetPasswordHeading: "Password Reset",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "us",
    {
      logoURL: `${S3_URL}/eu/NS_logo_color.svg`,
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      adminBtnText: "ADMIN",
      signOutBtnText: "SIGN OUT",
      changePasswordBtnText: "Change Password",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc:
        "Join the 4th edition of the NanoScientific Symposium US 2022 - the platform for nanoscience and SPM research.",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `The NanoScientific Symposium US 2022 - Connecting the Nanomaterials Community, will be a 1-day virtual event that features experts in the nanomaterials community.
      NanoScientific Symposium focuses on sharing, exchanging, and exploring new advances in nanomaterials applications. This event also emphasizes the growing importance of nanotechnology in many fields, including surface science, organic chemistry, molecular biology, semiconductor physics, and micro-manufacturing.
      <br /><br />Expand your insight through the NanoScientific Symposium.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `NanoScientific Symposium presents insights on the rapidly evolving R&D and innovations in nanotechnology. This conference provides a wonderful opportunity for you to enhance your knowledge of the newest interdisciplinary approaches in Nanomaterials, Chemical R&D, and 2D materials. 
      <br /><br />A great place to learn about nanoscientific studies and build connection with experts.`,
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
      // resetPassword
      resetPasswordHeading: "Password Reset",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "eu",
    {
      logoURL: `${S3_URL}/eu/NS_logo_color.svg`,
      speakers: "SPEAKERS",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      sponsors: "SPONSORS",
      home: "HOME",
      // registration: "REGISTRATION",
      // buttonText
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      adminBtnText: "ADMIN",
      signOutBtnText: "SIGN OUT",
      changePasswordBtnText: "Change Password",
      // landing
      landingSection1BackgroundURL: `${S3_URL}/eu/europe-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/NS_logo_white.svg`,
      landingSection1Desc: `Registration is running through another NSFE website. For the virtual platform please use only "Sign in" tab/button for people who already registered.`,
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `NSFE series is an open European AFM User Forum focusing on sharing and exchanging the cutting-edge research for both materials and life science disciplines using Atomic Force Miscroscopy (AFM).
      <br/><br/>
      The research focus of the 5th NSFE 2022 will be laid on wide range of SPM applications and techniques that empower to transform life standards. We will talk about emerging nanomaterials for advanced technologies, functional surfaces and hybrid materials as well as innovative methods in nanotechnology and correlative microscopy. The edition is open to global audience and will be held online.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: ``,
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
      // resetPassword
      resetPasswordHeading: "Password Reset",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
]);
