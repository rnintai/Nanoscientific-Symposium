declare namespace Program {
  interface programType {
    id: number;
    session: number;
    start_time: string;
    end_time: string;
    title: string;
    speakers: string;
    description: string;
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
    university: string;
    institute?: string;
    street?: string;
    zipCode?: string;
    city?: string;
    address?: string;
    researchField: string;
    afmTool?: string;
    nanomechanical?: number;
    characterization_of_soft?: number;
    advanced_imaging?: number;
    high_resolution_imaging?: number;
    automation_in_afm?: number;
    createdAt: string;
    ps_opt_in: number;
  }
}

declare namespace Common {
  type showStatus = "show" | "hide";

  interface globalDataType {
    logoURL: string;
    speakers?: string;
    programs: string;
    lectureHall: string;
    exhibitHall?: string;
    sponsors: string;
    greeting?: string;
    attend?: string;
    symposium?: string;
    archive?: string;
    home?: string;
    registration?: string;
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
