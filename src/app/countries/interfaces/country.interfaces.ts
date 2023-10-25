export enum Region {
  Africa= 'Africa',
  Americas = 'Americas',
  Asia= 'Asia',
  Europe= 'Europe',
  Oceania= 'Oceania',
}


export interface SmallCountry {
  name: string;
  cca3: string;
  borders: string[];
}



export interface Country {
  name:         Name;
  cca3:         string;
  status:       Status;
  unMember:     boolean;
  currencies:   Currencies;
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  subregion:    Subregion;
  languages:    Languages;
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders?:     string[];
  area:         number;
  demonyms:     Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  gini?:        { [key: string]: number };
  fifa?:        string;
  car:          Car;
  timezones:    string[];
  continents:   string[];
  flags:        Flags;
  coatOfArms:   CoatOfArms;
  startOfWeek:  StartOfWeek;
  capitalInfo:  CapitalInfo;
  postalCode?:  PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side:  Side;
}

export enum Side {
  Left = "left",
  Right = "right",
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}


export interface Currencies {
  EUR?: All;
  ALL?: All;
  GBP?: All;
  IMP?: All;
  MDL?: All;
  RSD?: All;
  CHF?: All;
  CZK?: All;
  MKD?: All;
  DKK?: All;
  FOK?: All;
  HUF?: All;
  UAH?: All;
  SEK?: All;
  PLN?: All;
  BAM?: BAM;
  GGP?: All;
  RUB?: All;
  GIP?: All;
  BYN?: All;
  BGN?: All;
  RON?: All;
  ISK?: All;
  JEP?: All;
  NOK?: All;
}

export interface All {
  name:   string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png:  string;
  svg:  string;
  alt?: string;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}

export interface Languages {
  de?:  string;
  sqi?: string;
  eng?: string;
  glv?: string;
  ron?: string;
  por?: string;
  srp?: string;
  deu?: string;
  fra?: string;
  nld?: string;
  gsw?: string;
  ita?: string;
  roh?: string;
  ces?: string;
  slk?: string;
  ell?: string;
  tur?: string;
  fin?: string;
  swe?: string;
  mkd?: string;
  est?: string;
  dan?: string;
  fao?: string;
  lav?: string;
  spa?: string;
  hun?: string;
  ukr?: string;
  gle?: string;
  mlt?: string;
  lit?: string;
  slv?: string;
  pol?: string;
  bos?: string;
  hrv?: string;
  nfr?: string;
  ltz?: string;
  lat?: string;
  rus?: string;
  bel?: string;
  cat?: string;
  bul?: string;
  cnr?: string;
  isl?: string;
  nrf?: string;
  nor?: string;
  nno?: string;
  nob?: string;
  smi?: string;
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex:  string;
}

export enum StartOfWeek {
  Monday = "monday",
}

export enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}

export enum Subregion {
  CentralEurope = "Central Europe",
  EasternEurope = "Eastern Europe",
  NorthernEurope = "Northern Europe",
  SoutheastEurope = "Southeast Europe",
  SouthernEurope = "Southern Europe",
  WesternEurope = "Western Europe",
}
