import { useCallback, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useIntersectionObserver = <T extends HTMLElement = any>(
    options?: ConstructorParameters<typeof IntersectionObserver>[1],
) => {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const ref = useCallback(
        (element: T | null) => {
            if (observer.current) {
                observer.current.disconnect();
                observer.current = null;
            }

            if (element === null) {
                setEntry(null);
                return;
            }

            observer.current = new IntersectionObserver(([_entry]) => {
                setEntry(_entry);
            }, options);

            observer.current.observe(element);
        },
        [options?.rootMargin, options?.threshold, options?.root],
    );

    return {
        ref,
        entry,
    };
};
