import Image from "./Image";
import "./styles.css";

export default function App() {
	return (
		<>
			<Image
				src="https://source.unsplash.com/random/800x800/?banana"
				alt="banana"
				skeletonLoaderShape="square"
				width={320}
			/>
			<Image
				src="https://source.unsplash.com/random/800x800/?apple"
				alt="apple"
				skeletonLoaderShape="square"
				width={320}
			/>
		</>
	);
}
