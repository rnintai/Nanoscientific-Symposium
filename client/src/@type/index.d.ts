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
    image_path: string;
    show: number;
    description?: string;
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

declare namespace Common {
  type showStatus = "show" | "hide";

  interface globalDataType {
    logoURL: string;
    speakers?: string;
    programs: string;
    lectureHall: string;
    exhibitHall: string;
    sponsors: string;
    greeting?: string;
    attend?: string;
    symposium?: string;
  }
}
