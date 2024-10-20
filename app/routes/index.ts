import { Href } from "expo-router";

type Route = {
  name: string;
  title: string;
  path: Href<string>;
};

export const routes: Record<string, Route> = {
  index: {
    name: "index",
    title: "Classes",
    path: "/",
  },
  introduction: {
    name: "introduction",
    title: "Introduction",
    path: "/introduction",
  },
  panGestureHandlerBasics: {
    name: "panGestureHandlerBasics",
    title: "PanGestureHandler Basics",
    path: "/panGestureHandlerBasics",
  },
  interpolateWithScrollView: {
    name: "interpolateWithScrollView",
    title: "Interpolate With ScrollView",
    path: "/interpolateWithScrollView",
  },
  interpolateColors: {
    name: "interpolateColors",
    title: "Interpolate Colors",
    path: "/interpolateColors",
  },
  pinchGestureHandlerBasics: {
    name: "pinchGestureHandlerBasics",
    title: "PinchGestureHandler Basics",
    path: "/pinchGestureHandlerBasics",
  },
  animateDoubleTap: {
    name: "animateDoubleTap",
    title: "Animate Double Tap",
    path: "/animateDoubleTap",
  },
  colorPickerAnimation: {
    name: "colorPickerAnimation",
    title: "Color Picker Animation",
    path: "/colorPickerAnimation",
  },
  circularProgressBar: {
    name: "circularProgressBar",
    title: "Circular Progress Bar",
    path: "/circularProgressBar",
  },
  swipeToDelete: {
    name: "swipeToDelete",
    title: "Swipe To Delete",
    path: "/swipeToDelete",
  },
  rippleEffect: {
    name: "rippleEffect",
    title: "Ripple Effect",
    path: "/rippleEffect",
  },
  perspectiveMenu: {
    name: "perspectiveMenu",
    title: "Perspective Menu",
    path: "/perspectiveMenu",
  }
};
