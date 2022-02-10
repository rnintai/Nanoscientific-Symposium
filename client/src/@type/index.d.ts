declare namespace Program {
  interface programType {
    id: number;
    session: number;
    start_time: string;
    end_time: string;
    title: string;
    speakers: string;
    desc: string;
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
    desc?: string;
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
