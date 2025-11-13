import {
  Color,
  CoreTypes,
  TouchAnimationOptions,
  View,
} from "@nativescript/core";

/**
 * reusable touch animation options
 */
export const TouchAnimations = {
  touchScale: {
    down: (view: View) => {
      view.animate({
        scale: { x: 0.95, y: 0.95 },
        duration: 100,
        delay: 0,
        curve: CoreTypes.AnimationCurve.easeInOut,
      });
    },
    up: (view: View) => {
      view.animate({
        scale: { x: 1, y: 1 },
        duration: 100,
        delay: 0,
        curve: CoreTypes.AnimationCurve.easeInOut,
      });
    },
  },
  touchRotate: {
    down: (view: View) => {
      view.animate({
        rotate: -5,
        scale: { x: 0.95, y: 0.95 },
        duration: 200,
      });
    },
    up: (view: View) => {
      view.animate({
        rotate: 0,
        scale: { x: 1, y: 1 },
        duration: 150,
      });
    },
  },
  touchColor: {
    down: (view: View) => {
      view.animate({
        backgroundColor: new Color("#e067e6"),
        scale: { x: 0.95, y: 0.95 },
        duration: 300,
      });
    },
    up: (view: View) => {
      view.animate({
        backgroundColor: new Color("#b115b9"),
        scale: { x: 1, y: 1 },
        duration: 150,
      });
    },
  },
  touchColorScale: {
    down: (view: View) => {
      view.animate({
        backgroundColor: new Color("#85fcfe"),
        scale: { x: 1.05, y: 1.05 },
        duration: 300,
      });
    },
    up: (view: View) => {
      view.animate({
        backgroundColor: new Color("#07d0d3"),
        scale: { x: 1, y: 1 },
        duration: 150,
      });
    },
  },
} as const satisfies { [key: string]: TouchAnimationOptions };

const createTouchAnimation = (
  downAnimation: {
    scale?: { x: number; y: number };
    duration: number;
    curve?: any;
  },
  upAnimation: {
    scale?: { x: number; y: number };
    duration: number;
    curve?: any;
  }
) => {
  return (args: any) => {
    const _args = args as { action: string; object: View };
    const view = _args.object;
    if (_args.action === "down") {
      view.animate({
        scale: downAnimation.scale || { x: 1, y: 1 },
        duration: downAnimation.duration,
        curve: downAnimation.curve || CoreTypes.AnimationCurve.easeInOut,
      });
    } else if (_args.action === "up" || _args.action === "cancel") {
      view.animate({
        scale: upAnimation.scale || { x: 1, y: 1 },
        duration: upAnimation.duration,
        curve: upAnimation.curve || CoreTypes.AnimationCurve.easeInOut,
      });
    }
  };
};

export const handleTouchScaleAnimation = createTouchAnimation(
  { scale: { x: 0.98, y: 0.98 }, duration: 100 },
  { scale: { x: 1, y: 1 }, duration: 150 }
);
