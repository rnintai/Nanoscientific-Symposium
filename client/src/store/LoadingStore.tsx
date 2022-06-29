import create from "zustand";

interface LoadingState {
  landingLoading: boolean;
  setLandingLoading: (newState: boolean) => void;
  bannerLoading: boolean;
  setBannerLoading: (newState: boolean) => void;
  landingListLoading: boolean;
  setLandingListLoading: (newState: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  landingLoading: false,
  setLandingLoading: (newState: boolean) =>
    set((state) => ({
      ...state,
      landingLoading: newState,
    })),
  bannerLoading: false,
  setBannerLoading: (newState: boolean) =>
    set((state) => ({
      ...state,
      bannerLoading: newState,
    })),
  landingListLoading: false,
  setLandingListLoading: (newState: boolean) =>
    set((state) => ({
      ...state,
      landingListLoading: newState,
    })),
}));

export default useLoadingStore;
