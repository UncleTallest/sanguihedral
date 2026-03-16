import Papa from "papaparse";

export const convertToCsvUrl = (url) => {
  if (!url) return "";
  if (url.includes("/export?format=csv")) return url;
  
  // Convert /edit... to /export?format=csv
  return url.replace(/\/edit.*$/, "/export?format=csv");
};

const FIELD_MAPPINGS = {
  name: [/name/i, /^n$/i],
  clan: [/clan/i, /cln/i],
  sect: [/sect/i, /sct/i],
  concept: [/concept/i, /conc/i],
  predator: [/predator/i, /pred/i],
  sire: [/sire/i],
  generation: [/generation/i, /gen/i],
  humanity: [/humanity/i, /hum/i],
  bloodPotency: [/blood potency/i, /bp/i],
  hunger: [/hunger/i, /hng/i],
};

const ATTRIBUTE_MAPPINGS = {
  strength: [/strength/i, /str/i],
  dexterity: [/dexterity/i, /dex/i],
  stamina: [/stamina/i, /sta/i],
  charisma: [/charisma/i, /cha/i],
  manipulation: [/manipulation/i, /man/i],
  composure: [/composure/i, /com/i],
  intelligence: [/intelligence/i, /int/i],
  wits: [/wits/i, /wit/i],
  resolve: [/resolve/i, /res/i],
};

const SKILL_MAPPINGS = {
  athletics: [/athletics/i, /athl/i],
  brawl: [/brawl/i, /brwl/i],
  craft: [/craft/i, /crft/i],
  drive: [/drive/i, /drv/i],
  firearms: [/firearms/i, /fir/i],
  larceny: [/larceny/i, /larc/i],
  melee: [/melee/i, /mle/i],
  stealth: [/stealth/i, /stl/i],
  survival: [/survival/i, /surv/i],
  animalKen: [/animal ken/i, /anim/i],
  etiquette: [/etiquette/i, /etiq/i],
  insight: [/insight/i, /ins/i],
  intimidation: [/intimidation/i, /intm/i],
  leadership: [/leadership/i, /lead/i],
  performance: [/performance/i, /perf/i],
  persuasion: [/persuasion/i, /pers/i],
  streetwise: [/streetwise/i, /strt/i],
  subterfuge: [/subterfuge/i, /subt/i],
  academics: [/academics/i, /acad/i],
  awareness: [/awareness/i, /awar/i],
  finance: [/finance/i, /fin/i],
  investigation: [/investigation/i, /inv/i],
  medicine: [/medicine/i, /med/i],
  occult: [/occult/i, /occ/i],
  politics: [/politics/i, /pol/i],
  science: [/science/i, /sci/i],
  technology: [/technology/i, /tech/i],
};

export const mapHeadersToCharacter = (headers, rowData) => {
  const character = {
    attributes: {},
    skills: {},
  };

  const findValue = (regexList) => {
    const index = headers.findIndex(h => regexList.some(re => re.test(h.trim())));
    if (index === -1) return undefined;
    const val = rowData[index];
    return isNaN(val) ? val : Number(val);
  };

  // Map Top Level Fields
  Object.entries(FIELD_MAPPINGS).forEach(([field, regexList]) => {
    const val = findValue(regexList);
    if (val !== undefined) character[field] = val;
  });

  // Map Attributes
  Object.entries(ATTRIBUTE_MAPPINGS).forEach(([attr, regexList]) => {
    const val = findValue(regexList);
    if (val !== undefined) character.attributes[attr] = val;
  });

  // Map Skills
  Object.entries(SKILL_MAPPINGS).forEach(([skill, regexList]) => {
    const val = findValue(regexList);
    if (val !== undefined) character.skills[skill] = val;
  });

  return character;
};

export const parseCSVData = (csvString) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length < 2) {
          reject(new Error("Sheet must contain at least a header row and one data row."));
          return;
        }
        const headers = results.data[0];
        const firstDataRow = results.data[1];
        resolve(mapHeadersToCharacter(headers, firstDataRow));
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const fetchAndParseSheet = async (url) => {
  const csvUrl = convertToCsvUrl(url);
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch sheet data. Ensure the sheet is 'Published to Web' as CSV.");
  }
  const csvText = await response.text();
  return parseCSVData(csvText);
};
