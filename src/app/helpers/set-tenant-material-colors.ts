import Color from 'color';

/**
 * Updates the default css `:root` variables for `--allogy-tenant-*` theme colors.
 * Default accessability ratio is set to `7`, Level AAA for Web Content Accessibility Guidelines (WCAG) 2.0
 *
 * This code is based on the work used in the "Buckner" algorithm from http://mcg.mbitson.com/
 *
 * There is a rabbit hole of posts in Github and StackOverflow about material palettes, but this post (https://stackoverflow.com/a/33487476)
 * highlights that no palette generator can be exact because all default material palettes are custom -- material palettes are hand-crafted by
 * Material devs and not "generated", so no single master algorithm can reproduce the exact material palettes as provided in the Material
 * library. Contributors did some reverse math on all (currently) 19 color palettes and calculated the changes in HSL values from the base
 * 500 colors for each and then made an improved algorithm for mcg.mbitson.com to use
 *
 * Their palette generator uses `tinycolor2`, which is a larger color library than our current package `Color`, so this is as close
 * as I felt I could get using similar value manipulations and not spending my entire weekend fine-tuning the neon `A100` thru `A700` to
 * match EXACTLY as the Buckner algorithm
 *
 * The `AccessibilityRatioRange` is based on these StackOverflow conversations, as we await Range to be an official Type for TS
 *  // https://stackoverflow.com/a/39495173
 *  // https://stackoverflow.com/a/69090186
 *
 * @export
 * @param hex
 * @param ratio
 */
export function setTenantMaterialColors(
    hex: string,
    ratio: AccessibilityRatioRange = 7, // WCAG AA is 4.5, AAA is 7
): void {
    const lightText: string = '#ffffff';
    const darkText: string = 'rgba(0, 0, 0, 0.87)';
    const doc = document.documentElement;
    const color = Color(hex);
    const baseLight = lightText;
    const baseDark = multiply(color.object(), color.object());

    const baseMap: { [key: string]: Color; } = {
        50: color.lighten(0.05).mix(Color(baseLight), 0.88),
        100: color.lighten(0.04).mix(Color(baseLight), 0.70),
        200: color.lighten(0.03).mix(Color(baseLight), 0.50),
        300: color.lighten(0.02).mix(Color(baseLight), 0.30),
        400: color.lighten(0.01).mix(Color(baseLight), 0.15),
        500: color, // base theme color
        600: color.mix(Color(baseDark), 0.13),
        700: color.mix(Color(baseDark), 0.30),
        800: color.mix(Color(baseDark), 0.46),
        900: color.mix(Color(baseDark), 0.75),
        'A100': color
            .mix(Color(baseDark), 0.5)
            .lightness(48)
            .lighten(0.4)
            .saturate(0.80),
        'A200': color
            .mix(Color(baseDark), 0.5)
            .lightness(36)
            .lighten(0.37)
            .saturate(0.80),
        'A400': color
            .mix(Color(baseDark), 0.5)
            .lightness(31)
            .lighten(0.33)
            .saturate(1),
        'A700': color
            .mix(Color(baseDark), 0.5)
            .lightness(28)
            .lighten(0.3)
            .saturate(1),
    };
    Object.keys(baseMap).forEach((key: string) => {
        const contrastDark = baseMap[key].contrast(Color(darkText));
        const contrastLight = baseMap[key].contrast(Color(lightText));
        const contrast = contrastLight > ratio || contrastDark < contrastLight ? lightText : darkText;
        doc.style.setProperty(`--allogy-tenant-${key}`, baseMap[key].rgb().string());
        doc.style.setProperty(`--allogy-tenant-${key}-contrast`, contrast);
    });

    const alphaMap: { [key: string]: Color; } = {
        'alpha-2': color.alpha(0.2),
        'alpha-3': color.alpha(0.3),
        'alpha-4': color.alpha(0.4),
        'alpha-5': color.alpha(0.5),
        'alpha-6': color.alpha(0.6),
    };
    Object.keys(alphaMap).forEach((key: string) => {
        doc.style.setProperty(`--allogy-tenant-${key}`, alphaMap[key].rgb().string());
    });
}

type AccessibilityRatioRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

const multiply = function (rgb1: { [key: string]: number; }, rgb2: { [key: string]: number; }) {
    rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
    rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
    rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
    return (`rgb(${rgb1.r}, ${rgb1.g}, ${rgb1.b})`);
};
