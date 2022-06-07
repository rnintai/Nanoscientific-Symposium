import create from "zustand";

interface LoadingState {
  bannerLoading: boolean;
  setBannerLoading: (newState: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  bannerLoading: false,
  setBannerLoading: (newState: boolean) =>
    set(() => ({
      bannerLoading: newState,
    })),
}));

export default useLoadingStore;
