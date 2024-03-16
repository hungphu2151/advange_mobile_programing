import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import Header from "~/components/Header";
import HeaderHome from "~/components/HeaderHome";

const useAppBar = ({ options = {}, title, isShowGoBackHome = false, isHome = false }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const optionsConfigDefault = {
      header: ({ navigation, route, options, back }) => {
        return isHome ? (
          <HeaderHome />
        ) : (
          <Header name={title} isBack={back} isShowGoBackHome={isShowGoBackHome} />
        );
      },
      headerShown: true,
      statusBarAnimation: "fade",
      statusBarHidden: false,
      statusBarTranslucent: true,
      ...options,
    };

    navigation.setOptions(optionsConfigDefault);
  }, [title]);
};

export default useAppBar;
