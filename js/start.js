console.clear();

if (!isIos()) {
    /* Use userAgentData read-only property of the Navigator interface */
    const uaData = navigator.userAgentData;
    const browserBrands = uaData.brands.map((brand) => brand.brand);

    const script = document.createElement('script');
    script.src = './js/app.js';
    script.type = 'module';
    document.head.appendChild(script);
    console.log(`Modern browser based on ${browserBrands[0]} is used`);
} else {
    const script = document.createElement('script');
    script.src = './dist/app.js';
    script.type = 'module';
    document.head.appendChild(script);
}

function isIos() {
    /* Check if the mobile browser is in use and the version of iOS is 12 and below. Use the navigator.userAgent. */
    const whetherOldIos = () => {
        let audio = new Audio();
        audio.volume = 0.5;

        return audio.volume === 1; // volume cannot be changed from "1" on iOS 12 and below
    };

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAppleDevice = navigator.userAgent.includes('Macintosh');

    return isIos || (isAppleDevice && whetherOldIos());
}
