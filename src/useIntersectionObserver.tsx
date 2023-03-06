import { useEffect, useRef, useState } from "react";

function useIntersectionObserver<refType extends HTMLElement>(
	observerOptions?: IntersectionObserverInit
) {
	const [isVisible, setIsVisible] = useState(false);
	const eleRef = useRef<refType>(null);
	const options = useRef<IntersectionObserverInit>(
		(() => {
			if (!observerOptions)
				return {
					root: null,
					threshold: 0,
				};

			return observerOptions;
		})()
	);

	useEffect(() => {
		if (!eleRef.current) return;

		const ele = eleRef.current;
		function observerCallback(
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			});
		}

		const observer = new IntersectionObserver(
			observerCallback,
			options.current
		);
		observer.observe(ele);
	}, []);

	return [isVisible, eleRef] as const;
}

export default useIntersectionObserver;
