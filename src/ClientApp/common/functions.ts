export function getParams(): { [key: string]: string } {
    let arg: { [key: string]: string } = {};
    const pair = window.location.search.substring(1).split("&");
    for (let i = 0; pair[i]; i++) {
        const kv = pair[i].split("=");
        arg[kv[0]] = kv[1];
    }
    return arg;
}

export async function sendPost(objToSend: object, url: string) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers, body });
    return response.json();
}

export function sendPostWithoutAwait(objToSend: object, url: string) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    fetch(url, { method, headers, body });
}

export async function sendPostNoJsonResult(objToSend: object, url: string) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        "Content-Type": "application/json",
    };
    const response = await fetch(url, { method, headers, body });
    return response;
}

export async function sendPostNoJsonResultWithoutAwait(
    objToSend: object,
    url: string
) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        "Content-Type": "application/json",
    };
    fetch(url, { method, headers, body });
}

//配列シャッフル
export function shuffle(array: any[]) {
    let n = array.length,
        t,
        i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        t = array[n];
        array[n] = array[i];
        array[i] = t;
    }

    return array;
}

export async function sleepAsync(milliSecond: number) {
    return new Promise(resolve =>
        setTimeout(() => resolve(undefined), milliSecond)
    );
}

export function debounce<T>(fn: (arg: T) => void, milliSecond: number) {
    let timer: number;
    return function (arg: T) {
        clearTimeout(timer);
        timer = window.setTimeout(() => fn(arg), milliSecond);
    };
}
