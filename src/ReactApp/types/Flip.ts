export const Flip = {
    none: "none",
    flippedHorizontally: "flippedHorizontally",
    upsideDown: "upsideDown",
} as const;
export type Flip = typeof Flip[keyof typeof Flip];
