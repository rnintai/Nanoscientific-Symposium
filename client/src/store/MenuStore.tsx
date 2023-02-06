import create from "zustand";

interface MenuState {
  menuList: Common.menuType[];
  currentMenu: Common.menuType;
  setMenuList: (menuList: Common.menuType[]) => void;
  setCurrentMenu: (subpath: string) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  menuList: [],
  currentMenu: null,
  setMenuList: (menuList: Common.menuType[]) => set(() => ({ menuList })),
  setCurrentMenu: (subpath: string) =>
    set((state) => {
      return {
        menuList: state.menuList,
        currentMenu: state.menuList
          ? state.menuList.filter((e) => subpath.indexOf(e.path) !== -1)[0]
          : null,
      };
    }),
}));

export default useMenuStore;
