import { useState, useCallback } from 'react';

export const useInfiniteScroll = () => {

    const [page, setPage] = useState(1);

    const callback = useCallback((entries) => {
        if (!entries[0].isIntersecting) return;
        setPage(prevState => prevState+1);
    }, []);

    const loadMoreRef = useCallback(
        (node) => {
            if (!node) {
                return;
            }
            const observer = new IntersectionObserver(callback);
            observer.observe(node);
        },
        [callback],
    );

    return {loadMoreRef, page, setPage}
}
