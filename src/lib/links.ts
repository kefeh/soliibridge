/** Entry points into the ArcLocal platform app (arclocal.soliibridge.com). */
const ARCLOCAL_APP = "https://arclocal.soliibridge.com";

export const ARCLOCAL_LINKS = {
  login: `${ARCLOCAL_APP}/login`,
  register: `${ARCLOCAL_APP}/register`,
  pricing: `${ARCLOCAL_APP}/#pricing`,
} as const;
