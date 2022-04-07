declare namespace Program {
  interface programType {
    id: number;
    session: number;
    start_time: string;
    end_time: string;
    title: string;
    speakers: string;
    description: string;
    next_id: string;
    emphasize: number;
  }

  interface programAgendaType {
    id: number;
    session_id: number;
    program_id: number;
    title: string;
    speakers: string;
    next_id: number;
  }

  interface sessionType {
    id: number;
    session_title: string;
    date: string;
  }
}

declare namespace Speaker {
  interface speakerType {
    id: number;
    name: string;
    belong: string;
    description: string;
    image_path: string;
    status: number;
    keynote?: number;
  }

  interface japanSpeakerType {
    id: number;
    name_en: string;
    name_jp: string;
    belong: string;
    image_path: string;
    homework: string;
    show: number;
  }
}

declare namespace User {
  interface userType {
    id: number;
    email: string;
    title?: string;
    role: string;
    last_name: string;
    first_name: string;
    institute: string;
    phone: string;
    department?: string;
    state?: string;
    createdAt: string;
    country: string;
  }
}

declare namespace Common {
  type showStatus = "show" | "hide";

  interface nationType {
    name: string;
    date: string;
    path: string;
  }

  interface sponsorType {
    name: string;
    img: string;
    url: string;
  }

  interface globalDataType {
    logoURL?: string;
    fullLogoURL?: string;
    speakers?: string;
    programs?: string;
    lectureHall?: string;
    exhibitHall?: string;
    sponsors?: string;
    greeting?: string;
    attend?: string;
    symposium?: string;
    archive?: string;
    home?: string;
    registration?: string;
    // button text
    signInText?: string;
    goNextText?: string;
    goPrevText?: string;
    submitBtnText?: string;
    // user 관련
    emailInputLabel?: string;
    passwordInputLabel?: string;
    forgotPasswordText?: string;
    createAccountText?: string;
    adminBtnText?: string;
    signOutBtnText?: string;
    changePasswordBtnText?: string;

    // common
    nations?: nationType[];
    eventLandingMainBannerURL?: string;
    fullLogoURL?: string;
    eventLandingDesc?: string;
    eventLandingBodyBackground?: string;
    teaserVideoEmbed?: string;
    bannerLogoURL?: string;
    sponsor1LogoURL?: string;
    sponsor2LogoURL?: string;

    // landing
    showLandingSection1?: boolean;
    showLandingSection2?: boolean;
    showLandingSection3?: boolean;
    showLandingSection4?: boolean;
    showLandingSection5?: boolean;
    showLandingSection6?: boolean;
    showLandingSection7?: boolean;
    landingSection1BackgroundURL?: string;
    landingSection1LogoURL?: string;
    landingSection1Desc?: string;
    landingSection2Title?: string;
    landingSection2Desc?: string;
    landingSection2Video?: string;
    landingSection3Title?: string;
    landingSection3Desc?: string;
    landingSection4Title?: string;
    landingSection4List1Title?: string;
    landingSection4List1?: string[];
    landingSection4List2Title?: string;
    landingSection4List2?: string[];
    landingSection4List3Title?: string;
    landingSection4List3?: string[];
    landingSection5Title?: string;
    landingSection6Title?: string;
    landingSection6ButtonLink?: string;
    landingSection6Desc?: string;
    landingSection6ButtonText?: string;
    landingSection6Videos?: string[];
    landingSection7Title?: string;
    landingSection7Sponsors?: sponsorType[];

    // resetPassword
    resetPasswordHeading?: string;
    resetPasswordCurrentLabel?: string;
    resetPasswordNewLabel?: string;
    resetPasswordNewConfirmLabel?: string;

    // cookie consent text
    cookieConsentText?: string;
    seePrivacyPolicyText?: string;
  }
}

declare namespace Webinar {
  interface webinarType {
    uuid: string;
    id: number;
    host_id: string;
    created_at: string;
    duration: number;
    join_url: string;
    start_time: string;
    timezone: string;
    topic: string;
    type: number;
  }
}
