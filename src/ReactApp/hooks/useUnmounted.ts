import { useEffect, useMemo } from "react";

let mountedIds: number[] = [];

export function useUnmounted() {
    const id = useMemo(
        () => (mountedIds.length ? Math.max(...mountedIds) + 1 : 1),
        []
    );

    useEffect(() => {
        mountedIds.push(id);

        return () => {
            mountedIds = mountedIds.filter(mid => mid !== id);
        };
    }, [id]);

    // Empty array will also return true.
    return { getUnmounted: () => mountedIds.every(mid => mid !== id) };
}
