import { theme, type ThemeConfig } from "antd";
import { getLocalStorage, setLocalStorage } from "../utils/storage.util";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DARK_MODE_KEY,
  MENU_MODE,
  MENU_MODE_KEY,
} from "../contants/theme.constant";

const colorConfig = {
  greyBg: "#1f1f1f",
  greyActive: "#262626",
  blueBg: "#001529",
  blueActive: "#1677ff",
  white: "#ffffff",
};
const { defaultAlgorithm, darkAlgorithm } = theme;

const useThemeConfig = () => {
  const [isDarkMode, setIsDarkMode] = useState("false");
  const [menuMode, setMenuMode] = useState<string | MENU_MODE>(
    MENU_MODE.VERTICAL
  );

  useEffect(() => {
    const darkMode = getLocalStorage(DARK_MODE_KEY);
    const menuModeStorage = getLocalStorage(MENU_MODE_KEY);

    if (darkMode) {
      setIsDarkMode(darkMode);
    } else {
      setIsDarkMode("false");
    }

    if (menuModeStorage) {
      setMenuMode(menuModeStorage);
    } else {
      setMenuMode(MENU_MODE.VERTICAL);
    }

    const handleStorageChange = () => {
      setIsDarkMode(getLocalStorage(DARK_MODE_KEY));
      setMenuMode(getLocalStorage(MENU_MODE_KEY));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChangeTheme = useCallback((isDarkMode) => {
    setLocalStorage(DARK_MODE_KEY, isDarkMode);
    window.dispatchEvent(new Event("storage"));
  }, []);

  const handleChangeMenuMode = useCallback((menuMode: MENU_MODE) => {
    setLocalStorage(MENU_MODE_KEY, menuMode);
    window.dispatchEvent(new Event("storage"));
  }, []);

  const themConfig = useMemo(
    (): ThemeConfig => ({
      algorithm: JSON.parse(isDarkMode) ? darkAlgorithm : defaultAlgorithm,
      components: {
        Layout: {
          siderBg: JSON.parse(isDarkMode)
            ? colorConfig.greyBg
            : colorConfig.blueBg,
          headerBg: JSON.parse(isDarkMode)
            ? colorConfig.greyBg
            : colorConfig.blueBg,
        },
        Menu: {
          darkItemBg: JSON.parse(isDarkMode)
            ? colorConfig.greyBg
            : colorConfig.blueBg,
          darkPopupBg: colorConfig.greyBg,
          darkSubMenuItemBg: "",
          darkItemSelectedBg: JSON.parse(isDarkMode)
            ? colorConfig.greyActive
            : colorConfig.blueActive,
        },
      },
    }),
    [isDarkMode, menuMode]
  );
  return {
    isDarkMode,
    themConfig,
    handleChangeTheme,
    menuMode,
    handleChangeMenuMode,
  };
};

export default useThemeConfig;
