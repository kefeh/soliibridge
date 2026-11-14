/** Entry points into the ArcLocal platform app (arclocal.soliibridge.com). */
const ARCLOCAL_APP = "https://arclocal.soliibridge.com";

export const ARCLOCAL_LINKS = {
  home: ARCLOCAL_APP,
  login: `${ARCLOCAL_APP}/login`,
  register: `${ARCLOCAL_APP}/register`,
  pricing: `${ARCLOCAL_APP}/#pricing`,
} as const;

/** Entry point into the OfficeTrail platform app (officetrail.soliibridge.com). */
export const OFFICETRAIL_LINKS = {
  platform: "https://officetrail.soliibridge.com/",
} as const;
