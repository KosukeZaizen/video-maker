export function getAudio({ src }: { src: string }) {
    const audio = new window.Audio();
    audio.preload = "none";
    audio.autoplay = false;
    audio.src = src;
    return { audio, playable: false };
}
