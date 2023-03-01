import {
	ComponentPropsWithoutRef,
	/* useEffect */ useRef,
	useState,
} from "react";
import SkeletonLoader from "./skeletonLoader";
import { BaseType } from "./skeletonLoader";

// make src and alt mandatory
type ImagePropsType = { src: string; alt: string } & Omit<
	ComponentPropsWithoutRef<"img">,
	"src" | "alt"
> &
	BaseType;

export default function Image({
	src,
	alt,
	skeletonLoaderShape,
	radius,
	width,
	height,
	...restProps
}: ImagePropsType) {
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);
	const [skeletonLoaderProps] = useState<BaseType>(() => {
		let options: BaseType;
		switch (skeletonLoaderShape) {
			case "circle":
				options = {
					skeletonLoaderShape: "circle",
					radius: radius,
				};
				break;
			case "rectangle":
				options = {
					skeletonLoaderShape: "rectangle",
					width: width,
					height: height,
				};
				break;
			default:
				options = {
					skeletonLoaderShape: "square",
					width: width,
				};
				break;
		}

		return options;
	});

	// //simulate delayed response
	// useEffect(() => {
	//   if (!imgRef.current) return;

	//   const img = imgRef.current;
	//   const timer = setTimeout(() => {
	//     img.src = src;
	//   }, 7000);

	//   return () => {
	//     if (timer) clearTimeout(timer);
	//   };
	// }, [src]);

	// image onload function
	function handleOnImgLoad() {
		setIsLoaded(true);
		console.log("loaded");
	}

	return (
		<div className="imgContainer">
			<img
				style={{ opacity: isLoaded ? 1 : 0 }}
				ref={imgRef}
				src={src}
				alt={alt}
				onLoad={handleOnImgLoad}
				{...restProps}
			/>
			<SkeletonLoader
				style={{
					opacity: isLoaded ? 0 : 1,
					animationName: isLoaded ? "none" : "loader-anim",
				}}
				{...skeletonLoaderProps}
			/>
		</div>
	);
}
