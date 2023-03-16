const   CURRENT_SYSTEM  = 'CURRENT_SYSTEM'
const   STANDARD  = 'STANDARD'
const   CURRENT_THREAT_TYPE  = 'CURRENT_THREAT_TYPE'
const   CRITICAL_IMPACT_FACTORS  = 'CIF'
const   ACTORS  = 'ACTORS'
const   THREAT_TYPES  = 'THREAT_TYPES'
const   ENTRY_POINTS  = 'ENTRY_POINTS'
const   FOUNDATIONAL_REQUIREMENTS  = 'FR'
const   WITH_SIDE_NAV  = 'WITH_SIDE_NAV'
const   OPEN_NEXT_ASSESSMENT  = 'OPEN_NEXT_ASSESSMENT'

const setStandardLS = (threatType)=>{localStorage.setItem(STANDARD, JSON.stringify(threatType))}
const getStandardLs = ()=>JSON.parse(localStorage.getItem(STANDARD))


const setThreatType = (threatType)=>{localStorage.setItem(CURRENT_THREAT_TYPE, JSON.stringify(threatType))}
const getThreatTypeLS = ()=>JSON.parse(localStorage.getItem(CURRENT_THREAT_TYPE))

const setThreatTypesLS = (threatTypes)=>{localStorage.setItem(THREAT_TYPES, JSON.stringify(threatTypes))}
const getThreatTypesLS = (threatTypes)=>JSON.parse(localStorage.getItem(THREAT_TYPES))

const setEntryPoints = (entryPoints)=>{localStorage.setItem(ENTRY_POINTS, JSON.stringify(entryPoints))}
const getEntryPoints = ()=> JSON.parse(localStorage.getItem(ENTRY_POINTS))


const setFRs = (FRs)=>{localStorage.setItem(FOUNDATIONAL_REQUIREMENTS, JSON.stringify(FRs))}
const getFRS = ()=>  JSON.parse(localStorage.getItem(FOUNDATIONAL_REQUIREMENTS))

const setCIFs = (CIFS)=>{localStorage.setItem(CRITICAL_IMPACT_FACTORS, JSON.stringify(CIFS))}
const getCIFs = ()=>  JSON.parse(localStorage.getItem(CRITICAL_IMPACT_FACTORS))


const setActors = (CIFS)=>{localStorage.setItem(ACTORS, JSON.stringify(CIFS))}
const getActors = ()=>  JSON.parse(localStorage.getItem(ACTORS))

const setWithSideNav = (bool)=>{localStorage.setItem(WITH_SIDE_NAV, JSON.stringify(bool))}
const getWithSideNav = ()=>  JSON.parse(localStorage.getItem(WITH_SIDE_NAV))

export {
  STANDARD,
  CURRENT_SYSTEM,
  CURRENT_THREAT_TYPE,
  THREAT_TYPES,
  ENTRY_POINTS,
  FOUNDATIONAL_REQUIREMENTS,
  CRITICAL_IMPACT_FACTORS,
  OPEN_NEXT_ASSESSMENT,

  setStandardLS,
  getStandardLs,
  setThreatType,
  getThreatTypeLS,
  setThreatTypesLS,
  getThreatTypesLS,
  setEntryPoints,
  getEntryPoints,

  setFRs,
  getFRS,

  setCIFs,
  getCIFs,

  setActors,
  getActors,

  setWithSideNav,
  getWithSideNav
};
