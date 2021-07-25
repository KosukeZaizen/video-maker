import { useEffect } from "react";

const unmountedState = { unmounted: false };

export function useUnmounted() {
    useEffect(() => {
        return () => {
            unmountedState.unmounted = true;
        };
    }, []);

    return { getUnmounted: () => unmountedState.unmounted };
}
