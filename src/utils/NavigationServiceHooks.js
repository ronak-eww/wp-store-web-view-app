import {
  StackActions,
  useNavigation,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// Custom hook navigator
export const useNav = () => {
  const navigation = useNavigation();

  const navigate = (...args) => {
    navigation?.navigate(...args);
  };

  const replace = (...args) => {
    navigation?.dispatch(StackActions.replace(...args));
  };

  const goBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  const reset = (...args) => {
    navigation?.reset(...args);
  };

  const resetNavWithDynamicRoute = (main, sub) => {
    navigation.reset({
      index: 1,
      routes: [{ name: main }, { name: sub }],
    });
  };
  const resetToRoute = routeName => {
    navigation.reset({
      index: 1,
      routes: [{ name: routeName }],
    });
  };

  const push = (...args) => {
    navigation.dispatch(StackActions.push(...args));
  };
  const pop = count => {
    navigation.dispatch(StackActions.pop(count));
  };
  const popToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const NavRef = navigationRef;

  return {
    navigate,
    replace,
    goBack,
    reset,
    resetNavWithDynamicRoute,
    push,
    pop,
    NavRef,
    resetToRoute,
    popToTop,
  };
};

export const resetNavWithDynamicRouteRef = (main, sub) => {
  navigationRef.reset({
    index: 1,
    routes: [{ name: main }, { name: sub }],
  });
};
