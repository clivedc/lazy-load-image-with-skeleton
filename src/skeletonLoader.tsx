import { ComponentPropsWithoutRef } from "react";

export type BaseType =
  | {
      skeletonLoaderShape: "circle";
      radius: number;
      width?: never;
      height?: never;
    }
  | {
      skeletonLoaderShape: "square";
      radius?: never;
      width: number;
      height?: never;
    }
  | {
      skeletonLoaderShape: "rectangle";
      radius?: never;
      width: number;
      height: number;
    };

type SkeletonLoaderPropsType = BaseType & ComponentPropsWithoutRef<"svg">;

export default function SkeletonLoader({
  skeletonLoaderShape,
  radius,
  width,
  height,
  ...restProps
}: SkeletonLoaderPropsType) {
  return (
    <svg
      className="skele-loader"
      xmlns="https://www.w3.org/2000/svg"
      width={skeletonLoaderShape === "circle" ? radius * 2 : width}
      height={
        skeletonLoaderShape === "circle"
          ? radius * 2
          : skeletonLoaderShape === "rectangle"
          ? height
          : width
      }
      {...restProps}
    >
      {/* <defs>
        <linearGradient gradientTransform="rotate(135)" id="loader-gradient">
          <stop offset="5%" stopColor="rgb(209, 181, 0)" />
          <stop offset="95%" stopColor="rgb(29, 194, 0)" />
        </linearGradient>
      </defs> */}
      {skeletonLoaderShape === "circle" ? (
        <circle
          // fill="url('#loader-gradient')"
          r={radius}
          cx={radius}
          cy={radius}
        />
      ) : skeletonLoaderShape === "rectangle" ? (
        <rect
          // fill="url('#loader-gradient')"
          x="0"
          y="0"
          width={width}
          height={height}
        />
      ) : (
        <rect
          // fill="url('#loader-gradient')"
          x="0"
          y="0"
          width={width}
          height={width}
        />
      )}
    </svg>
  );
}
