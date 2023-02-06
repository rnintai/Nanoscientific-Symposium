export const S3_URL = "https://d3gxipca0cw0l2.cloudfront.net";
const CHINA_S3_URL =
  "https://s3.cn-north-1.amazonaws.com.cn/nanoscientific.com.cn";

export const globalData = new Map<string, Common.globalDataType>([
  [
    "home",
    {
      logoURL: `${S3_URL}/common/NSS_logo_Type3.svg`,
    },
  ],
  [
    "common",
    {
      nations: [
        {
          name: "NSS Americas",
          date: "Sep 29, 2022",
          path: "https://event.nanoscientific.org/americas",
          img: `${S3_URL}/us/main-page-banner.jpg`,
        },
        {
          name: "NSF Europe",
          date: "Oct 06 - 07, 2022",
          path: "https://event.nanoscientific.org/eu",
          img: `${S3_URL}/eu/main-page-banner.jpg`,
        },
        {
          name: "NSS China",
          date: "Oct 27 - 28, 2022",
          path: "https://nanoscientific.com.cn/china",
          img: `${S3_URL}/cn/main-page-banner.jpg`,
        },
        {
          name: "NSS Japan",
          date: "Nov 18, 2022",
          path: "https://event.nanoscientific.org/jp",
          img: `${S3_URL}/jp/main-page-banner.jpg`,
        },
        {
          name: "NSS Korea",
          date: "Nov 23, 2022",
          path: "https://event.nanoscientific.org/kr",
          img: `${S3_URL}/kr/main-page-banner.jpg`,
        },
        {
          name: "NSS Asia",
          date: "Nov 25, 2022",
          path: "https://event.nanoscientific.org/asia",
          img: `${S3_URL}/asia/main-page-banner.jpg`,
        },
      ],
      logoURL: `${S3_URL}/common/NSS_logo_Type3.svg`,
      teaserVideoURL: `${S3_URL}/common/2022NSS_Teaser_v1.0_LQ.mp4`,
      teaserVideoEmbed: "R9vwS37g9SU",
      bannerLogoURL: `${S3_URL}/common/NSS_logo_white_main.svg`,
      eventLandingMainBannerURL: `${S3_URL}/common/main-landing-banner.jpg`,
      eventLandingDesc: `
      The growing importance of nanotechnology in many fields, including surface science, organic chemistry, molecular biology, semiconductor physics, and micro-manufacturing. And those who strive to acquire the technology.
      NanoScientific Symposium brings together industry experts, researchers, business leaders, scholars, and futurist to share the latest nanotechnology trends and various nanotechnology-based research results.
      An opportunity to discuss and experience firsthand what innovative research results have been derived using the latest SPM (Scanning Probe Microscopy) technology.
      We invite you to the NanoScientific Symposium 2022.
      Expand your insight through the Nanoscientific Symposium.
      `,
      sponsor1LogoURL: `${S3_URL}/common/sponsored_by_NS.svg`,
      sponsor2LogoURL: `${S3_URL}/common/Park_logo.svg`,
      sponsor3LogoURL: `${S3_URL}/upload/china/sponsor/NWAlogo2022_1664861519562.PNG`,

      registrationBannerDesktopURL: `${S3_URL}/common/registration-banner-desktop.jpg`,
      registrationBannerMobileURL: `${S3_URL}/common/registration-banner-mobile.jpg`,
      speakerBannerURL: `${S3_URL}/common/speakers-banner.jpg`,
      programBannerURL: `${S3_URL}/common/program-banner.jpg`,
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
    },
  ],
  [
    "asia2022",
    {
      fullName: "2022 NanoScientific Symposium Asia | NSS Asia",
      fullDate: "November 25, 2022",
      eventLocation: "Marina Bay Sands, Singapore (Hybrid Event)",
      logoURL: `${S3_URL}/asia/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      // registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      registerBtnText: "REGISTER",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      // createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/asia/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/asia/logo-type-1b.svg`,
      landingSection1Desc:
        "Join us for the 4th edition of the NanoScientific Symposium Asia 2022 to be held on November 25, 2022.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // registration

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "asia2023",
    {
      fullName: "2023 NanoScientific Symposium Asia | NSS Asia",
      fullDate: "November 25, 2022",
      eventLocation: "Marina Bay Sands, Singapore (Hybrid Event)",
      logoURL: `${S3_URL}/asia/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      // registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      registerBtnText: "REGISTER",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      // createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/asia/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/asia/logo-type-1b.svg`,
      landingSection1Desc:
        "Join us for the 4th edition of the NanoScientific Symposium Asia 2022 to be held on November 25, 2022.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // registration

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "kr2022",
    {
      fullName: "2022 NanoScientific Symposium Korea | NSS Korea",
      fullDate: "2022년 11월 23일",
      eventLocation: "대전컨벤션센터 컨퍼런스홀",
      logoURL: `${S3_URL}/kr/menu-bar-logo.svg?v=0.03`,
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      // sponsors: "협찬사",
      home: "홈",

      // sign in 관련
      signInText: "로그인",
      registration: "등록",
      goNextText: "다음",
      goPrevText: "이전",
      uploadBtnText: "Upload",
      submitBtnText: "제출",

      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/kr/main-page-banner.png`,
      landingSection1LogoURL: `${S3_URL}/kr/logo-type-1b.svg`,
      landingSection1Desc: `
        NanoScientific Symposium Korea 등록하기
        <br/><br/>
        국내 원자현미경 전문 심포지엄 NanoScientific Symposium Korea (NSS Korea) 등록을 위해 '등록(registration)' 을 클릭해주세요.
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // 프로그램
      programFileLink:
        "https://surfaceanalysis.kr/img/file/pdf/2022%EB%85%84%EB%8F%84-%ED%91%9C%EB%A9%B4%EB%B6%84%EC%84%9D%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%8C%EC%9E%A5%ED%8F%AC%ED%95%A8-%EC%B5%9C%EC%A2%85.pdf",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "kr2023",
    {
      fullName: "2022 NanoScientific Symposium Korea | NSS Korea",
      fullDate: "2022년 11월 23일",
      eventLocation: "대전컨벤션센터 컨퍼런스홀",
      logoURL: `${S3_URL}/kr/menu-bar-logo.svg?v=0.03`,
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      // sponsors: "협찬사",
      home: "홈",

      // sign in 관련
      signInText: "로그인",
      registration: "등록",
      goNextText: "다음",
      goPrevText: "이전",
      uploadBtnText: "Upload",
      submitBtnText: "제출",

      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/kr/main-page-banner.png`,
      landingSection1LogoURL: `${S3_URL}/kr/logo-type-1b.svg`,
      landingSection1Desc: `
        NanoScientific Symposium Korea 등록하기
        <br/><br/>
        국내 원자현미경 전문 심포지엄 NanoScientific Symposium Korea (NSS Korea) 등록을 위해 '등록(registration)' 을 클릭해주세요.
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // 프로그램
      programFileLink:
        "https://surfaceanalysis.kr/img/file/pdf/2022%EB%85%84%EB%8F%84-%ED%91%9C%EB%A9%B4%EB%B6%84%EC%84%9D%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%A2%8C%EC%9E%A5%ED%8F%AC%ED%95%A8-%EC%B5%9C%EC%A2%85.pdf",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "jp2022",
    {
      fullName: "2022 NanoScientific Symposium Japan | NSS Japan",
      fullDate: "2022年11月18日金曜日",
      eventLocation: "東京大学 本郷キャンパス 工学部２号館",
      logoURL: `${S3_URL}/jp/menu-bar-logo.svg?v=0.03`,
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      // sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",

      signInText: "ログイン",
      // registration: "参加登録はこちらから",
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "ポスターのアップロード",
      submitBtnText: "提出",

      // user관련
      emailInputLabel: "Email address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot Password?",
      // createAccountText: "参加登録はこちらから",
      passwordSetDescription:
        "本サイトをご利用になるにはIDとパスワードが必要です。IDはご入力いただきましたメールアドレスとなりますので、以下にてパスワードの設定をお願いいたします。",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/jp/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/jp/logo-type-1b.svg`,
      landingSection1Desc: `
        ナノテクノロジーとSPMに特化したナノ科学シンポジウム 2022 参加登録受付中！
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "アップロード可能なファイル形式 (.pdf, .docx, .pptx) (ファイルサイズ最大 15MBまで)",
    },
  ],
  [
    "jp2023",
    {
      fullName: "2022 NanoScientific Symposium Japan | NSS Japan",
      fullDate: "2022年11月18日金曜日",
      eventLocation: "東京大学 本郷キャンパス 工学部２号館",
      logoURL: `${S3_URL}/jp/menu-bar-logo.svg?v=0.03`,
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      // sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",

      signInText: "ログイン",
      // registration: "参加登録はこちらから",
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "ポスターのアップロード",
      submitBtnText: "提出",

      // user관련
      emailInputLabel: "Email address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot Password?",
      // createAccountText: "参加登録はこちらから",
      passwordSetDescription:
        "本サイトをご利用になるにはIDとパスワードが必要です。IDはご入力いただきましたメールアドレスとなりますので、以下にてパスワードの設定をお願いいたします。",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/jp/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/jp/logo-type-1b.svg`,
      landingSection1Desc: `
        ナノテクノロジーとSPMに特化したナノ科学シンポジウム 2022 参加登録受付中！
        `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "アップロード可能なファイル形式 (.pdf, .docx, .pptx) (ファイルサイズ最大 15MBまで)",
    },
  ],
  [
    "americas2022",
    {
      fullName: "2022 NanoScientific Symposium Americas | NSS Americas",
      fullDate: "September 29, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/us/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/us/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/us/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NanoScientific Symposium Americas (NSS Americas)- Connecting the Nanomaterials Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "americas2023",
    {
      fullName: "2022 NanoScientific Symposium Americas | NSS Americas",
      fullDate: "September 29, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/us/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/us/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/us/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NanoScientific Symposium Americas (NSS Americas)- Connecting the Nanomaterials Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",
    },
  ],
  [
    "eu2022",
    {
      fullName: "2022 NanoScientific Forum Europe | NSF Europe",
      fullDate: "October 6-7, 2022",
      logoURL: `${S3_URL}/eu/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      // registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      // createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/eu/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/logo-type-1b.svg`,
      landingSection1Desc: `Welcome to the virtual platform of
      NanoScientific Forum Europe (NSFE)
      `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",

      // speaker
      speakerBannerURL: `${S3_URL}/eu/speaker-banner.jpg`,
    },
  ],
  [
    "eu2023",
    {
      fullName: "2023 NanoScientific Forum Europe | NSFE",
      fullDate: "September 13-15, 2023",
      eventLocation: "ICFO - The Institute of Photonic Sciences, Barcelona",
      logoURL: `${S3_URL}/eu/menu-bar-logo.svg?v=0.03`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      goNextText: "NEXT",
      goPrevText: "PREV",
      uploadBtnText: "Upload",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${S3_URL}/eu/2023-europe-banner.png`,
      landingSection1LogoURL: `${S3_URL}/eu/2023NSFE_logo.svg`,
      // landingSection1Desc: `Welcome to the virtual platform of
      // NanoScientific Forum Europe (NSFE)
      // `,
      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // pdf upload
      pdfUploadDescription:
        "Upload file (.pdf,.docx,.pptx) (Maximum size: 15MB)",

      // speaker
      speakerBannerURL: `${S3_URL}/eu/speaker-banner.jpg`,

      //
      registrationTitle: "Registration",
      registrationDesc: "",
    },
  ],
  [
    "china2022_china",
    {
      fullName: "2022 NanoScientific Symposium China | NSS China",
      fullDate: "10月27-28日",
      eventLocation: "郑州大学",
      logoURL: `${CHINA_S3_URL}/menu-bar-logo.svg?v=0.1`,
      speakers: "报告人",
      programs: "会议日程",
      lectureHall: "会议室",
      exhibitHall: "展位",
      home: "主页",
      registration: "报名参会",
      // buttonText
      signInText: "登录",
      goNextText: "下一步",
      goPrevText: "上一步",
      submitBtnText: "提交",
      // user관련
      emailInputLabel: "邮箱地址",
      passwordInputLabel: "密码",
      forgotPasswordText: "忘记密码",
      createAccountText: "创建新账户",

      // lecture hall 관련
      liveText: "直播",
      browserJoinBtnText: "通过浏览器页面参加",
      appJoinBtnText: "通过Zoom App参加",
      registerBtnText: "登录",

      adminBtnText: "ADMIN",
      signOutBtnText: "退出",
      changePasswordBtnText: "更改密码",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${CHINA_S3_URL}/main-page-banner.jpg`,
      landingSection1LogoURL: `${CHINA_S3_URL}/logo-type-1b.svg`,
      landingSection1Desc:
        "点击参加2022年第四届纳米科学大会- 纳米科学与扫描探针显微术交流平台",

      // resetPassword
      resetPasswordHeading: "更改密码",
      setPasswordHeading: "设置密码",
      resetPasswordCurrentLabel: "当前密码",
      resetPasswordNewLabel: "新密码",
      resetPasswordNewConfirmLabel: "新密码确认",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // comingSoon
      comingSoonText: "没有要显示的内容。",
    },
  ],
  [
    "china2022_english",
    {
      fullName: "2022 NanoScientific Symposium China | NSS China",
      fullDate: "October 27-28, 2022",
      eventLocation: "Zhengzhou University",
      logoURL: `${CHINA_S3_URL}/menu-bar-logo.svg?v=0.1`,
      speakers: "Speakers",
      programs: "Progrmas",
      lectureHall: "Lecture Hall",
      exhibitHall: "Exhibit Hall",
      home: "Home",
      registration: "REGISTRATION",
      // buttonText
      signInText: "Sign in",
      goNextText: "Next",
      goPrevText: "Prev",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      // lecture hall 관련
      liveText: "LIVE",
      browserJoinBtnText: "Join via Browser",
      appJoinBtnText: "Join via Zoom App",
      registerBtnText: "Register",

      adminBtnText: "Admin",
      signOutBtnText: "Sign Out",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      landingSection1BackgroundURL: `${CHINA_S3_URL}/main-page-banner.jpg`,
      landingSection1LogoURL: `${CHINA_S3_URL}/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NanoScientific Symposium China (NSS China) – Connecting the SPM Community.",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      setPasswordHeading: "Set a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",

      // comingSoon
      comingSoonText: "Coming Soon",
    },
  ],
]);
