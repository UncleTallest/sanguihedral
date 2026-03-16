import Papa from "papaparse";
import v5data from "./v5data.json";

export const convertToCsvUrl = (url) => {
  if (!url) return "";
  if (url.includes("/export?format=csv")) return url;
  return url.replace(/\/edit.*$/, "/export?format=csv");
};

// Strict labels: word boundaries
const FIELD_MAPPINGS = {
  name: [/\bname\b/i, /^n$/i],
  clan: [/\bclan\b/i, /\bcln\b/i],
  sect: [/\bsect\b/i, /\bsct\b/i],
  concept: [/\bconcept\b/i],
  predator: [/\bpredator\b/i, /\bpred\b/i],
  sire: [/\bsire\b/i],
  generation: [/\bgeneration\b/i, /\bgen\b/i],
  humanity: [/\bhumanity\b/i, /\bhum\b/i, /^h$/i, /\bhumanity track\b/i],
  bloodPotency: [/\bblood potency\b/i, /\bbp\b/i],
  hunger: [/\bhunger\b/i, /\bhng\b/i],
};

const ATTRIBUTE_MAPPINGS = {
  strength: [/\bstrength\b/i, /^str\b/i],
  dexterity: [/\bdexterity\b/i, /^dex\b/i],
  stamina: [/\bstamina\b/i, /^sta\b/i],
  charisma: [/\bcharisma\b/i, /^cha\b/i],
  manipulation: [/\bmanipulation\b/i, /^man\b/i],
  composure: [/\bcomposure\b/i, /^com\b/i],
  intelligence: [/\bintelligence\b/i, /^int\b/i],
  wits: [/\bwits\b/i, /^wit\b/i],
  resolve: [/\bresolve\b/i, /^res\b/i],
};

const SKILL_MAPPINGS = {
  athletics: [/\bathletics\b/i, /^athl\b/i],
  brawl: [/\bbrawl\b/i, /^brwl\b/i],
  craft: [/\bcraft\b/i, /^crft\b/i],
  drive: [/\bdrive\b/i, /^drv\b/i],
  firearms: [/\bfirearms\b/i, /^fir\b/i],
  larceny: [/\blarceny\b/i, /^larc\b/i],
  melee: [/\bmelee\b/i, /^mle\b/i],
  stealth: [/\bstealth\b/i, /^stl\b/i],
  survival: [/\bsurvival\b/i, /^surv\b/i],
  animalKen: [/\banimal ken\b/i, /^anim\b/i],
  etiquette: [/\betiquette\b/i, /^etiq\b/i],
  insight: [/\binsight\b/i, /^ins\b/i],
  intimidation: [/\bintimidation\b/i, /^intm\b/i],
  leadership: [/\bleadership\b/i, /^lead\b/i],
  performance: [/\bperformance\b/i, /^perf\b/i],
  persuasion: [/\bpersuasion\b/i, /^pers\b/i],
  streetwise: [/\bstreetwise\b/i, /^strt\b/i],
  subterfuge: [/\bsubterfuge\b/i, /^subt\b/i],
  academics: [/\bacademics\b/i, /^acad\b/i],
  awareness: [/\bawareness\b/i, /^awar\b/i],
  finance: [/\bfinance\b/i, /^fin\b/i],
  investigation: [/\binvestigation\b/i, /^inv\b/i],
  medicine: [/\bmedicine\b/i, /^med\b/i],
  occult: [/\boccult\b/i, /^occ\b/i],
  politics: [/\bpolitics\b/i, /^pol\b/i],
  science: [/\bscience\b/i, /^sci\b/i],
  technology: [/\btechnology\b/i, /^tech\b/i],
};

const ALL_LABELS = [
  ...Object.values(FIELD_MAPPINGS).flat(),
  ...Object.values(ATTRIBUTE_MAPPINGS).flat(),
  ...Object.values(SKILL_MAPPINGS).flat(),
  /\bspecialities\b/i, /\bhealth\b/i, /\bwillpower\b/i, /\bdisciplines\b/i, /\rituals\b/i, /\bbackgrounds\b/i, /\bmerits\b/i, /\bflaws\b/i, /\blore sheets\b/i
];

export const mapGridToCharacter = (grid) => {
  const character = {
    attributes: {},
    skills: {},
    disciplines: [],
    backgrounds: {
      merits: [],
      flaws: [],
      advantages: [], // Used for combined Backgrounds
      loreSheets: []
    },
    rituals: [],
    hunger: 1,
    bloodPotency: 1,
    humanity: 7,
    superficialDamage: 0,
    aggravatedDamage: 0,
    superficialWillpowerDamage: 0,
    aggravatedWillpowerDamage: 0
  };

  const isLabel = (text) => {
    if (!text || text.length > 25) return false;
    return ALL_LABELS.some(re => re.test(text));
  };

  const cleanNumeric = (val, isStrict = false) => {
    if (!val) return 0;
    const s = val.toString();
    if (isStrict && s.length > 2) return 0; 
    const cleaned = s.replace(/[^0-9]/g, '');
    if (cleaned === "") return 0;
    const num = Number(cleaned);
    return isStrict ? Math.min(5, num) : num;
  };

  const getValueForLabel = (regexList, isNumeric = false) => {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const cell = grid[r][c]?.toString().trim();
        if (cell && cell.length < 25 && regexList.some(re => re.test(cell))) {
          for (let offset = 1; offset <= 3; offset++) {
            const nextCell = grid[r][c + offset]?.toString().trim();
            if (nextCell && !isLabel(nextCell)) {
              return isNumeric ? cleanNumeric(nextCell, true) : nextCell;
            }
          }
          if (grid[r+1] && grid[r+1][c]) {
            const downCell = grid[r+1][c].toString().trim();
            if (downCell && !isLabel(downCell)) {
              return isNumeric ? cleanNumeric(downCell, true) : downCell;
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
    if (val !== undefined && val !== 0) character[field] = val;
  });

  if (!character.humanity) character.humanity = 7;
  if (!character.bloodPotency) character.bloodPotency = 1;
  if (!character.hunger) character.hunger = 1;

  // Map Attributes & Skills
  Object.entries(ATTRIBUTE_MAPPINGS).forEach(([attr, regexList]) => {
    character.attributes[attr] = Math.max(1, getValueForLabel(regexList, true));
  });
  Object.entries(SKILL_MAPPINGS).forEach(([skill, regexList]) => {
    character.skills[skill] = getValueForLabel(regexList, true);
  });

  const flatGrid = grid.flat().map(cell => cell?.toString().trim()).filter(Boolean);
  
  // Disciplines
  v5data.disciplines.forEach(vDisc => {
    const hasDisc = flatGrid.some(cell => cell.toLowerCase() === vDisc.name.toLowerCase());
    if (hasDisc) {
      let dots = 0;
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          if (grid[r][c]?.toString().trim().toLowerCase() === vDisc.name.toLowerCase()) {
            for (let offset = 1; offset <= 3; offset++) {
              const val = cleanNumeric(grid[r][c+offset], true);
              if (val > 0) { dots = val; break; }
            }
          }
        }
      }
      if (dots > 0) {
        const ownedPowers = vDisc.powers?.filter(vPower => 
          flatGrid.some(cell => {
            const normalized = cell.toLowerCase();
            const powerName = vPower.name.toLowerCase();
            return normalized === powerName || normalized.startsWith(powerName + " ") || normalized.includes(" " + powerName);
          })
        ).map(p => p.name) || [];
        character.disciplines.push({ name: vDisc.name, dots, powers: ownedPowers });
      }
    }
  });

  // FUZZY Multiline Miner for Backgrounds
  const mineTrait = (traitList, targetArray) => {
    traitList.forEach(vTrait => {
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          const cell = grid[r][c]?.toString().trim();
          if (!cell || cell.length > 60) continue;

          const lowerCell = cell.toLowerCase();
          const target = vTrait.name.toLowerCase();

          if (lowerCell.includes(target)) {
            let dots = 0;
            let specLines = [];

            for (let offset = 1; offset <= 4; offset++) {
              const val = cleanNumeric(grid[r][c+offset], true);
              if (val > 0) { dots = val; break; }
            }
            if (dots === 0) dots = cleanNumeric(cell, true);
            if (dots === 0 && grid[r+1]) dots = cleanNumeric(grid[r+1][c], true);

            if (dots > 0) {
              const cellParts = cell.split(/[-–()\[\]]/);
              if (cellParts.length > 1) specLines.push(cellParts.pop().trim());

              for (let rowOffset = 1; rowOffset <= 5; rowOffset++) {
                const nextRowCell = grid[r + rowOffset] ? grid[r + rowOffset][c]?.toString().trim() : "";
                if (!nextRowCell || isLabel(nextRowCell)) break;
                if (cleanNumeric(nextRowCell, true) === dots) continue;
                specLines.push(nextRowCell);
              }

              targetArray.push({ 
                name: vTrait.name, 
                dots, 
                specification: specLines.filter(Boolean).join(" | ").substring(0, 500) 
              });
              return;
            }
          }
        }
      }
    });
  };

  mineTrait(v5data.merits, character.backgrounds.merits);
  mineTrait(v5data.backgrounds, character.backgrounds.advantages);
  mineTrait(v5data.flaws, character.backgrounds.flaws);

  // Rituals
  v5data.disciplines.forEach(d => {
    d.rituals?.forEach(r => {
      if (flatGrid.some(cell => cell.toLowerCase().includes(r.name.toLowerCase()))) {
        character.rituals.push(r.name);
      }
    });
  });

  // LoreSheets
  v5data.loreSheets.forEach(ls => {
    if (flatGrid.some(cell => cell.toLowerCase().includes(ls.name.toLowerCase()))) {
      character.backgrounds.loreSheets.push({ name: ls.name, dots: 1, specification: "" });
    }
  });

  return character;
};

const findValueBelow = (grid, labelRegex) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c]?.trim();
      if (cell && cell.length < 15 && labelRegex.test(cell)) {
        const val = grid[r+1] ? grid[r+1][c] : undefined;
        if (!val) return cleanNumeric(grid[r][c+1], true);
        return cleanNumeric(val, true);
      }
    }
  }
  return 0;
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
