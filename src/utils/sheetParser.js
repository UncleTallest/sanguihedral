import Papa from "papaparse";
import v5data from "./v5data.json";

export const convertToCsvUrl = (url) => {
  if (!url) return "";
  if (url.includes("/export?format=csv")) return url;
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

const ALL_LABELS = [
  ...Object.values(FIELD_MAPPINGS).flat(),
  ...Object.values(ATTRIBUTE_MAPPINGS).flat(),
  ...Object.values(SKILL_MAPPINGS).flat(),
  /specialities/i, /health/i, /willpower/i, /date of birth/i, /protean/i, /disciplines/i, /resonance/i, /lores/i, /advantages/i, /rituals/i, /merits and flaws/i
];

export const mapGridToCharacter = (grid) => {
  const character = {
    attributes: {},
    skills: {},
    disciplines: [],
    advantages: [],
    flaws: [],
    rituals: []
  };

  const isLabel = (text) => ALL_LABELS.some(re => re.test(text));

  const cleanNumeric = (val) => {
    if (typeof val !== 'string') return val;
    const cleaned = val.replace(/[^0-9]/g, '');
    return cleaned === "" ? 0 : Number(cleaned);
  };

  const getValueForLabel = (regexList, isNumeric = false) => {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const cell = grid[r][c]?.toString().trim();
        if (regexList.some(re => re.test(cell))) {
          for (let offset = 1; offset <= 2; offset++) {
            const nextCell = grid[r][c + offset]?.toString().trim();
            if (nextCell && !isLabel(nextCell)) {
              return isNumeric ? cleanNumeric(nextCell) : nextCell;
            }
          }
        }
      }
    }
    return isNumeric ? 0 : undefined;
  };

  // Map Top Level Fields
  Object.entries(FIELD_MAPPINGS).forEach(([field, regexList]) => {
    const isNum = ["generation", "humanity", "bloodPotency", "hunger"].includes(field);
    let val = getValueForLabel(regexList, isNum);
    if (field === "generation" && val < 4) val = 13;
    if (field === "clan" && val) {
      const slug = (text) => text.toLowerCase().replace("the ", "").replace(/\s+/g, "");
      const targetSlug = slug(val);
      const match = v5data.clans.find(c => slug(c) === targetSlug);
      if (match) val = match;
    }
    if (val !== undefined) character[field] = val;
  });

  // Map Attributes
  Object.entries(ATTRIBUTE_MAPPINGS).forEach(([attr, regexList]) => {
    character.attributes[attr] = Math.max(1, getValueForLabel(regexList, true));
  });

  // Map Skills
  Object.entries(SKILL_MAPPINGS).forEach(([skill, regexList]) => {
    character.skills[skill] = getValueForLabel(regexList, true);
  });

  // Health/Willpower
  const findValueBelow = (labelRegex) => {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (labelRegex.test(grid[r][c]?.trim())) {
          const val = grid[r+1] ? grid[r+1][c] : undefined;
          return cleanNumeric(val);
        }
      }
    }
    return 0;
  };

  character.maxHealth = findValueBelow(/health/i);
  character.maxWillpower = findValueBelow(/willpower/i);

  // GREEDY DATA MINE for Disciplines and Powers
  const flatGrid = grid.flat().map(cell => cell?.toString().trim()).filter(Boolean);
  
  v5data.disciplines.forEach(vDisc => {
    const hasDisc = flatGrid.some(cell => cell.toLowerCase() === vDisc.name.toLowerCase());
    
    if (hasDisc) {
      console.log(`Found Discipline: ${vDisc.name}`);
      let dots = 1;
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          if (grid[r][c]?.toString().trim().toLowerCase() === vDisc.name.toLowerCase()) {
            const possibleDots = cleanNumeric(grid[r][c+1]);
            if (possibleDots > 0) dots = possibleDots;
          }
        }
      }

      // Check for each defined power
      const ownedPowers = vDisc.powers?.filter(vPower => {
        const found = flatGrid.some(cell => {
          const normalized = cell.toLowerCase();
          const powerName = vPower.name.toLowerCase();
          // Match exactly or as part of a list
          return normalized === powerName || normalized.startsWith(powerName + " ") || normalized.includes(" " + powerName);
        });
        if (found) console.log(`  Found Power: ${vPower.name}`);
        return found;
      }).map(p => p.name) || [];

      character.disciplines.push({
        name: vDisc.name,
        dots: dots,
        powers: ownedPowers
      });
    }
  });

  return character;
};

export const parseCSVData = (csvString) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length < 1) {
          reject(new Error("Sheet appears to be empty."));
          return;
        }
        resolve(mapGridToCharacter(results.data));
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
    throw new Error("Failed to fetch. Ensure the sheet is 'Published to Web' as CSV.");
  }
  const csvText = await response.text();
  return parseCSVData(csvText);
};
