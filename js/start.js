/* Check if the Safari browser is in use and the version of iOS. Use the navigator.userAgent. */

console.clear();

const uaData = navigator.userAgentData;
const browserBrands = uaData.brands.map((brand) => brand.brand);

if (!isOldIOS()) {
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
    console.log(`Outdated browser based on ${browserBrands[0]} is used`);
}

function isOldIOS() {
    /* matches "safari" */
    const isSafari = browserBrands.includes('Safari');

    /* matches iOS versions 1.0 through 9.9 */
    const isOldIOS = /OS [1-9]_[0-9](.*) like Mac/i.test(uaData.ua);

    /* matches iOS versions 10.0 through 10.3 */
    const isIOS10 = /OS 10_[0-3](.*) like Mac/i.test(uaData.ua);

    return isSafari && (isOldIOS || isIOS10);
}
