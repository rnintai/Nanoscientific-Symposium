declare module Program {

  interface programType {
    id:number;
    session:number;
    start_time:string;
    end_time:string;
    title:string;
    speakers:string;
    desc:string;
  }

  interface sessionType{
    id:number;
    session_title:string
    date:string;
  }

}