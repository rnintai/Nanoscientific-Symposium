import create from "zustand";

interface AdminState {
  darkMode: boolean;
  setDarkMode: () => void;
  disableDarkMode: () => void;
  toggleDarkMode: () => void;
  isSponsorPreview: boolean;
  setIsSponsorPreview: (newState: boolean) => void;
  isSponsor2Preview: boolean;
  setIsSponsor2Preview: (newState: boolean) => void;
  currentNation: string;
  setCurrentNation: (lang: string) => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
}

const useAdminStore = create<AdminState>((set) => ({
  darkMode: false,
  setDarkMode: () => set(() => ({ darkMode: true })),
  disableDarkMode: () => set(() => ({ darkMode: false })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  isSponsorPreview: false,
  isSponsor2Preview: false,
  setIsSponsor2Preview: (newState) =>
    set((state) => ({ ...state, isSponsorPreview: newState })),
  setIsSponsorPreview: (newState) =>
    set((state) => ({ ...state, isSponsorPreview: newState })),
  currentNation: localStorage.getItem("nss-nation"),
  setCurrentNation: (nation) => {
    localStorage.setItem("nss-nation", nation);
    set((state) => ({ ...state, currentNation: nation }));
  },
  currentLanguage: localStorage.getItem("nss-lang")
    ? localStorage.getItem("nss-lang")
    : "china",
  setCurrentLanguage: (lang) => {
    localStorage.setItem("nss-lang", lang);
    set((state) => ({ ...state, currentLanguage: lang }));
  },
}));

export default useAdminStore;
