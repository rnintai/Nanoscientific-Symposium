import create from "zustand";

interface ConfigState {
  configState: Common.configType;
  setConfigState: (config: Common.configType) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
  configState: null,
  setConfigState: (config: Common.configType) =>
    set(() => {
      return {
        configState: config,
      };
    }),
}));

export default useConfigStore;
