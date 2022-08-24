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
        configState: {
          id: config.id,
          alert_receive_email: config.alert_receive_email,
        },
      };
    }),
}));

export default useConfigStore;
