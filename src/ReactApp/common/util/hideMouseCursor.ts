export function hideMouseCursor() {
    const html = document.querySelector("html");
    if (html) {
        html.style.cursor = "none";
    }
}

export function showMouseCursor() {
    const html = document.querySelector("html");
    if (html) {
        html.style.cursor = "auto";
    }
}
