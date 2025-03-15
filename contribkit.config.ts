import { BadgePreset, defineConfig, tierPresets } from '@lizardbyte/contribkit'

const specialSupporters = [
  {
    name: 'JetBrains',
    url: 'https://www.jetbrains.com/',
    logoUrl: 'https://resources.jetbrains.com/storage/products/company/brand/logos/jetbrains.svg',
    svgContent: `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="a" x1=".850001" x2="62.62" y1="62.72" y2="1.81" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF9419"/>
          <stop offset=".43" stop-color="#FF021D"/>
          <stop offset=".99" stop-color="#E600FF"/>
        </linearGradient>
      </defs>
      <path fill="url(#a)" d="M20.34 3.66 3.66 20.34C1.32 22.68 0 25.86 0 29.18V59c0 2.76 2.24 5 5 5h29.82c3.32 0 6.49-1.32 8.84-3.66l16.68-16.68c2.34-2.34 3.66-5.52 3.66-8.84V5c0-2.76-2.24-5-5-5H29.18c-3.32 0-6.49 1.32-8.84 3.66Z"/>
      <path fill="#000" d="M48 16H8v40h40V16Z"/>
      <path fill="#fff" d="M30 47H13v4h17v-4Z"/>
    </svg>`,
  },
  {
    name: 'GitHub Copilot',
    url: 'https://github.com/features/copilot',
    logoUrl: 'https://raw.githubusercontent.com/gilbarbara/logos/refs/heads/main/logos/github-copilot.svg',
    svgContent: `
    <svg width="256px" height="208px" viewBox="0 0 256 208" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
      <title>GitHub Copilot</title>
      <g>
        <path fill="#fff" d="M205.28,31.36 C219.376,46.24 225.296,66.56 227.792,95.04 C234.417867,95.04 240.5968,96.5093333 244.768,102.192 L252.56,112.752 C254.8,115.792 256,119.424 256,123.2 L256,151.888 C255.992,155.592267 254.1568,159.203467 251.168,161.392 C215.885333,187.222133 172.3496,208 128,208 C78.9344,208 29.8098667,179.726667 4.832,161.392 C1.84330667,159.203467 0.00722666667,155.592267 0,151.888 L0,123.2 C0,119.424 1.2,115.776 3.424,112.736 L11.216,102.192 C15.3891733,96.5349333 21.5953067,95.04 28.208,95.04 C30.704,66.56 36.608,46.24 50.72,31.36 C77.3312,3.1648 112.56728,0.06016 127.552142,0.00088672 L128,0 C142.72,0 178.4,2.88 205.28,31.36 Z M128.016,78.736 C124.976,78.736 121.472,78.912 117.744,79.28 C116.432,84.176 114.496,88.592 111.664,91.408 C100.464,102.608 86.96,104.336 79.728,104.336 C72.9258667,104.336 65.8005333,102.915733 59.984,99.248 C54.4816,101.056 49.1978667,103.6632 48.848,110.16 C48.2621333,122.440533 48.2112,134.709333 48.1602667,146.984 C48.1336,153.144533 48.1093333,159.3064 48.016,165.472 C48.04,169.050667 50.1978667,172.3752 53.456,173.856 C79.936,185.92 104.976,192 128.016,192 C151.024,192 176.064,185.92 202.528,173.856 C205.786133,172.3752 207.9432,169.050667 207.968,165.472 C208.285333,147.0536 208.029867,128.560267 207.152,110.16 L207.168,110.16 C206.826133,103.625867 201.520267,101.061867 196,99.248 C190.179467,102.899733 183.072533,104.336 176.272,104.336 C169.04,104.336 155.552,102.608 144.336,91.408 C141.504,88.592 139.568,84.176 138.256,79.28 C134.853333,78.9338667 131.436,78.7525333 128.016,78.736 Z M101.074933,122.666667 C106.8232,122.666667 111.4832,127.326667 111.4832,133.074933 L111.4832,152.2584 C111.4832,158.006667 106.8232,162.666667 101.074933,162.666667 C95.3266667,162.666667 90.6666667,158.006667 90.6666667,152.2584 L90.6666667,133.074933 C90.6666667,127.326667 95.3266667,122.666667 101.074933,122.666667 Z M154.408267,122.666667 C160.156533,122.666667 164.816533,127.326667 164.816533,133.074933 L164.816533,133.074933 L164.816533,152.2584 C164.816533,158.006667 160.156533,162.666667 154.408267,162.666667 C148.66,162.666667 144,158.006667 144,152.2584 L144,152.2584 L144,133.074933 C144,127.326667 148.66,122.666667 154.408267,122.666667 Z M81.44,28.32 C70.24,29.44 60.8,33.12 56,38.24 C45.6,49.6 47.84,78.4 53.76,84.48 C58.08,88.8 66.24,91.68 75.04,91.68 C81.76,91.68 94.56,90.24 105.12,79.52 C109.76,75.04 112.64,63.84 112.32,52.48 C112,43.36 109.44,35.84 105.6,32.64 C101.44,28.96 92,27.36 81.44,28.32 Z M150.4,32.64 C146.56,35.84 144,43.36 143.68,52.48 C143.36,63.84 146.24,75.04 150.88,79.52 C161.44,90.24 174.24,91.68 180.96,91.68 C189.76,91.68 197.92,88.8 202.24,84.48 C208.16,78.4 210.4,49.6 200,38.24 C195.2,33.12 185.76,29.44 174.56,28.32 C164,27.36 154.56,28.96 150.4,32.64 Z M128,56 C125.44,56 122.4,56.16 119.04,56.48 C119.36,58.24 119.52,60.16 119.68,62.24 C119.68,63.68 119.68,65.12 119.52,66.72 C122.72,66.4 125.44,66.4 128,66.4 C130.559733,66.4 133.28,66.4 136.48,66.72 C136.32,65.12 136.32,63.6802667 136.32,62.2402667 C136.48,60.1602667 136.64,58.24 136.96,56.48 C133.6,56.16 130.56,56 128,56 Z"></path>
      </g>
    </svg>`,
  },
  {
    name: 'Codecov',
    url: 'https://about.codecov.io/',
    logoUrl: 'https://about.codecov.io/wp-content/themes/codecov/assets/brand/icons/codecov/codecov-circle.svg',
    svgContent: `
    <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>codecov</title>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="codecov" fill-rule="nonzero">
            <circle id="Oval" fill="#FF0077" cx="30" cy="30" r="30"></circle>
            <path d="M30.0534521,7.05 C16.7973274,7.05 6,17.7404232 6,30.7827394 L6,30.8896437 L10.0623608,33.2415367 L10.169265,33.2415367 C12.7349666,31.531069 15.8351893,30.8896437 18.935412,31.4241648 C21.0734967,31.8517817 23.1046771,32.8139198 24.7082405,34.310579 L25.4565702,34.9520043 L25.8841871,34.0967707 C26.311804,33.2415367 26.7394209,32.4932071 27.1670379,31.7448775 C27.3808463,31.4241648 27.5946548,31.2103563 27.8084633,30.8896437 L28.2360802,30.3551225 L27.701559,29.9275056 C25.4565702,28.1101336 22.7839644,26.8272829 19.8975501,26.2927617 C17.1180401,25.7582405 14.3385301,25.8651448 11.7728285,26.7203786 C13.6971047,18.2749443 21.1804009,12.2883073 30.0534521,12.2883073 C35.077951,12.2883073 39.7817373,14.2125835 43.309577,17.7404232 C45.8752783,20.1992205 47.585746,23.2994432 48.3340757,26.7203786 C46.7305123,26.1858575 45.0200447,25.972049 43.309577,25.972049 L42.988864,25.972049 C42.3474387,25.972049 41.7060133,26.0789532 40.9576837,26.0789532 L40.8507797,26.0789532 C40.636971,26.0789532 40.3162583,26.1858575 40.10245,26.1858575 C39.674833,26.2927617 39.3541203,26.2927617 38.9265033,26.3996659 L38.6057907,26.5065702 C38.285078,26.6134744 37.9643653,26.7203786 37.6436527,26.8272829 L37.5367483,26.8272829 C36.7884187,27.0410913 36.1469933,27.361804 35.3986637,27.6825167 L35.3986637,27.6825167 C35.077951,27.7894209 34.7572383,28.0032294 34.4365257,28.2170379 L34.3296213,28.2170379 C32.7260579,29.1791759 31.2293987,30.3551225 30.0534521,31.8517817 L29.9465479,32.0655902 C29.6258352,32.4932071 29.4120267,32.8139198 29.1982183,33.0277283 C28.9844098,33.2415367 28.8775056,33.5622493 28.6636971,33.882962 L28.5567929,34.0967707 C28.3429844,34.4174833 28.2360802,34.738196 28.1291759,34.9520043 L28.1291759,35.0589087 C27.8084633,35.700334 27.4877506,36.4486637 27.2739421,37.1969933 L27.2739421,37.3038977 C26.7394209,39.0143653 26.4187082,40.8317373 26.4187082,42.7560133 L26.4187082,42.9698217 C26.4187082,43.1836303 26.4187082,43.504343 26.4187082,43.7181513 C26.4187082,43.8250557 26.4187082,43.93196 26.4187082,44.038864 C26.4187082,44.1457683 26.4187082,44.359577 26.4187082,44.466481 L26.4187082,44.5733853 L26.4187082,44.7871937 C26.4187082,45.0010023 26.5256125,45.321715 26.5256125,45.5355233 C27.0601336,48.101225 28.2360802,50.5600223 30.0534521,52.805011 L30.1603563,52.9119153 L30.2672606,52.805011 C31.0155902,51.9497773 32.7260579,49.2771713 32.9398664,47.673608 L32.9398664,47.673608 L32.9398664,47.673608 C32.0846325,46.0700447 31.6570156,44.2526727 31.6570156,42.542205 C31.6570156,36.555568 36.3608017,31.531069 42.454343,31.2103563 L42.88196,31.2103563 C45.3407573,31.1034521 47.7995547,31.8517817 49.830735,33.2415367 L49.9376393,33.2415367 L54,30.8896437 L54,30.8896437 L54,30.7827394 C54,24.4753898 51.5412027,18.4887528 46.9443207,13.9987751 C42.454343,9.50879733 36.467706,7.05 30.0534521,7.05" id="Path" fill="#FFFFFF"></path>
        </g>
      </g>
    </svg>`,
  },
  {
    name: 'Crowdin',
    url: 'https://crowdin.com/',
    logoUrl: 'https://support.crowdin.com/assets/logos/small-scale-logo/svg/smallscale-logo-cWhite.svg',
    svgContent: `
    <svg width="248" height="248" viewBox="0 0 248 248" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M163.024 177.312C157.024 177.312 151.667 175.514 147.239 171.995C141.954 167.851 137.739 161.674 137.597 154.402C137.525 150.727 141.525 150.727 141.525 150.727C141.525 150.727 148.025 150.649 151.167 150.649C154.31 150.727 155.238 155.106 155.381 156.2C156.595 166.053 162.166 170.353 166.452 172.308C169.023 173.481 168.38 177.156 163.024 177.312Z" fill="white"/>
      <path d="M109.1 127.248C103.816 126.626 95.962 126.082 90.8924 124.839C82.6811 122.819 82.8953 115.438 83.2523 113.03C84.252 105.804 86.8939 99.1224 90.9638 92.9069C96.0334 85.2929 103.317 78.6112 112.67 73.1726C130.235 62.9947 154.798 57.323 181.788 57.323C201.567 57.323 222.202 59.8869 222.416 59.8869C224.273 60.12 225.63 61.907 225.558 63.927C225.487 65.9471 224.059 67.5009 222.202 67.6563C219.203 67.5786 216.276 67.5786 213.491 67.5786C186.001 67.5786 166.437 71.3079 151.87 79.3881C137.518 87.3129 127.522 99.4332 120.739 117.381C120.025 118.934 117.668 128.18 109.1 127.248Z" fill="white"/>
      <path d="M133.089 201.326C119.451 201.326 106.594 195.437 96.863 184.681C88.6235 175.574 83.6513 166.388 82.7279 154.611C82.1597 146.917 85.5692 144.248 90.1862 144.719C93.3825 145.033 103.327 145.504 109.009 146.682C113.271 147.545 116.112 149.901 116.823 154.768C120.587 180.677 136.924 190.884 146.655 193.082C148.36 193.475 149.426 194.574 149.355 196.537C149.284 198.421 148.005 199.991 146.3 200.305C141.967 201.012 137.421 201.326 133.089 201.326Z" fill="white"/>
      <path d="M94.2244 224.321C84.5472 224.321 75.0835 222.782 72.3796 222.296C60.9946 220.27 51.4598 216.786 43.2769 211.6C23.7091 199.203 11.8972 177.326 10.4741 151.397C10.1183 145.239 9.3356 133.49 23.9937 134.381C30.0419 134.705 39.6479 137.622 46.4077 139.567C54.8041 141.917 58.86 148.399 58.86 154.8C58.86 191.343 91.9474 215.489 106.392 215.489C112.583 215.489 110.306 222.134 107.602 222.863C102.834 224.159 96.7148 224.321 94.2244 224.321Z" fill="white"/>
      <path d="M43.75 116.947C38.0259 115.921 32.445 113.554 27.0071 112.213C10.1926 108.031 13.0546 91.0665 14.6287 86.4112C29.9407 41.3568 78.5238 26.2861 117.734 22.262C154.654 18.4746 193.292 21.394 229.282 31.4149C232.216 32.2039 241.303 34.4132 236.079 39.8576C232.788 43.2505 219.98 39.6998 216.546 39.4631C195.438 37.885 174.545 37.6483 153.509 40.8834C131.257 44.2763 108.361 51.2987 89.972 66.1328C81.0997 73.3131 73.3006 82.4659 68.0774 93.2758C66.7179 96.1164 65.6447 98.957 64.7145 101.798C63.7843 104.796 60.2783 119.867 43.75 116.947Z" fill="white"/>
      <path d="M137.892 125.638C141.043 111.538 155.044 89.1945 198.377 90.7355C208.318 91.0437 203.768 97.8239 198.867 97.6698C174.365 96.8223 162.744 112.617 156.654 128.643C154.694 133.805 150.213 134.576 144.613 133.651C140.693 132.958 136.422 132.496 137.892 125.638Z" fill="white"/>
    </svg>`,
  },
];

// Function to create wrapped SVG for a special sponsor
function createWrappedSponsorSvg(
    sponsor: { name: string, url: string },
    svgContent: string,
    svgWidth: number,
    svgHeight: number,
    height: number,
    x: number,
    y: number
): string {
  const scale = height ? height / svgHeight : 1;
  const scaledWidth = svgWidth * scale;
  const scaledHeight = svgHeight * scale;

  return `
  <a xlink:href="${sponsor.url}" class="sponsorkit-link" target="_blank" id="${sponsor.name.replace(/\s+/g, '')}">
    <svg x="${x}" y="${y}" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
      ${svgContent}
    </svg>
  </a>`;
}

// Function to extract dimensions from SVG content
function extractSvgDimensions(svgContent: string): { width: number, height: number } {
  // Try to get dimensions from viewBox first
  const viewBoxMatch = svgContent.match(/viewBox=['"]([^'"]*)['"]/);
  if (viewBoxMatch) {
    const [, minX, minY, width, height] = viewBoxMatch[1].split(/\s+/).map(Number);
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }

  // Try to get from width/height attributes
  const widthMatch = svgContent.match(/width=['"]([^'"]*)['"]/);
  const heightMatch = svgContent.match(/height=['"]([^'"]*)['"]/);

  const width = widthMatch ? parseInt(widthMatch[1]) : 200;
  const height = heightMatch ? parseInt(heightMatch[1]) : 100;

  return { width, height };
}

const past: BadgePreset = {
  avatar: {
    size: 20,
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35,
  },
}

export default defineConfig({
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: 'Backers',
      preset: tierPresets.small,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: {
        avatar: {
          size: 42,
        },
        boxWidth: 52,
        boxHeight: 52,
        container: {
          sidePadding: 30,
        },
      }
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: tierPresets.medium,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: tierPresets.large,
    },
    {
      title: 'Platinum Sponsors',
      monthlyDollars: 500,
      preset: tierPresets.xl,
    },
    {
      title: 'Special Supporters',
      monthlyDollars: Infinity,
      composeAfter(compose, _, config) {
        const iconHeight = 60;

        if (config.filter?.({ monthlyDollars: Infinity } as any, []) !== false) {
          compose.addSpan(20);
          compose.addText('Special Supporters', 'sponsorkit-tier-title');
          compose.addSpan(30);

          const padding = 20; // Padding between supporters
          let currentX = padding;
          const supporters = [...specialSupporters];

          while (supporters.length) {
            const row: typeof specialSupporters = [];
            let rowWidth = 0;

            // Fill row with supporters that fit within width
            while (supporters.length) {
              const supporter = supporters[0];
              const { width, height } = extractSvgDimensions(supporter.svgContent);
              const scale = iconHeight / height;
              const scaledWidth = width * scale;

              if (rowWidth + scaledWidth + padding > config.width!) {
                break;
              }

              row.push(supporters.shift()!);
              rowWidth += scaledWidth + padding;
            }

            // Center row horizontally
            const startX = (config.width! - rowWidth + padding) / 2;
            currentX = startX;

            // Add supporters in row
            for (const supporter of row) {
              const { width, height } = extractSvgDimensions(supporter.svgContent);
              const scale = iconHeight / height;
              const scaledWidth = width * scale;

              const wrappedSvg = createWrappedSponsorSvg(
                  supporter,
                  supporter.svgContent,
                  width,
                  height,
                  iconHeight,
                  currentX,
                  compose.height
              );

              compose.addRaw(wrappedSvg);
              currentX += scaledWidth + padding;
            }

            compose.addSpan(iconHeight + padding);
          }

          compose.addSpan(10);
        }
      }
    },
  ],
})
