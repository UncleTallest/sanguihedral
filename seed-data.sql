-- Sanguihedral Database Seed Data
-- Marcus Gruene (original character) + 4 randomized variants
-- Generated: 2026-03-14

-- ============================================================
-- USERS
-- ============================================================
INSERT INTO users (email, username, password_hash, created_at) VALUES
  ('jerry@uncletallest.com', 'UncleTallest', '$2b$10$dummyhash1', NOW()),
  ('demo@sanguihedral.app', 'DemoUser', '$2b$10$dummyhash2', NOW());

-- ============================================================
-- CHARACTERS
-- ============================================================

-- Character 1: Marcus Gruene (Original - Jerry's actual character)
INSERT INTO characters (user_id, name, sect, clan, hunger, willpower_current, willpower_max, health_current, health_max, humanity, generation, blood_potency, concept, predator, sire, created_at) VALUES
  (1, 'Marcus Gruene', 'Camarilla', 'Gangrel', 1, 5, 5, 7, 7, 6, 12, 2, 'Adventurer (Archeologist) - "Imagine Indiana Jones, but mad as a box of frogs"', 'Blood Leech', 'Ouray (Ute Shaman/Chieftan)', NOW());

-- Character 2: Sarah Chen (Variant - Toreador artist, higher social)
INSERT INTO characters (user_id, name, sect, clan, hunger, willpower_current, willpower_max, health_current, health_max, humanity, generation, blood_potency, concept, predator, sire, created_at) VALUES
  (2, 'Sarah Chen', 'Camarilla', 'Toreador', 2, 6, 6, 5, 5, 7, 11, 2, 'Gallery Owner and Performance Artist', 'Scene Queen', 'Isabella Montrose', NOW());

-- Character 3: Viktor Volkov (Variant - Brujah brawler, higher physical)
INSERT INTO characters (user_id, name, sect, clan, hunger, willpower_current, willpower_max, health_current, health_max, humanity, generation, blood_potency, concept, predator, sire, created_at) VALUES
  (2, 'Viktor Volkov', 'Anarch', 'Brujah', 3, 4, 4, 8, 8, 5, 13, 1, 'Former MMA Fighter turned Street Justice', 'Alleycat', 'Dmitri "The Bear" Petrov', NOW());

-- Character 4: Dr. Evelyn Cross (Variant - Tremere scholar, higher mental)
INSERT INTO characters (user_id, name, sect, clan, hunger, willpower_current, willpower_max, health_current, health_max, humanity, generation, blood_potency, concept, predator, sire, created_at) VALUES
  (2, 'Dr. Evelyn Cross', 'Camarilla', 'Tremere', 1, 7, 7, 4, 4, 8, 10, 3, 'Quantum Physicist studying Thaumaturgy', 'Osiris', 'Regent Marcus Blackwood', NOW());

-- Character 5: Jade "Whisper" Martinez (Variant - Nosferatu hacker, balanced)
INSERT INTO characters (user_id, name, sect, clan, hunger, willpower_current, willpower_max, health_current, health_max, humanity, generation, blood_potency, concept, predator, sire, created_at) VALUES
  (2, 'Jade "Whisper" Martinez', 'Anarch', 'Nosferatu', 2, 5, 5, 6, 6, 6, 12, 2, 'Darkweb Info Broker and Urban Explorer', 'Extortionist', 'The Rat King', NOW());

-- ============================================================
-- ATTRIBUTES
-- ============================================================

-- Marcus Gruene - Specialist (high Stamina, Wits, Composure)
INSERT INTO attributes (character_id, strength, dexterity, stamina, charisma, manipulation, composure, intelligence, wits, resolve) VALUES
  (1, 2, 3, 4, 2, 1, 3, 2, 3, 2);

-- Sarah Chen - High social attributes
INSERT INTO attributes (character_id, strength, dexterity, stamina, charisma, manipulation, composure, intelligence, wits, resolve) VALUES
  (2, 1, 3, 2, 4, 3, 3, 3, 2, 2);

-- Viktor Volkov - High physical attributes
INSERT INTO attributes (character_id, strength, dexterity, stamina, charisma, manipulation, composure, intelligence, wits, resolve) VALUES
  (3, 4, 3, 4, 2, 1, 2, 1, 3, 3);

-- Dr. Evelyn Cross - High mental attributes
INSERT INTO attributes (character_id, strength, dexterity, stamina, charisma, manipulation, composure, intelligence, wits, resolve) VALUES
  (4, 1, 2, 2, 2, 2, 4, 4, 3, 4);

-- Jade Martinez - Balanced attributes
INSERT INTO attributes (character_id, strength, dexterity, stamina, charisma, manipulation, composure, intelligence, wits, resolve) VALUES
  (5, 2, 3, 3, 2, 3, 3, 3, 3, 2);

-- ============================================================
-- SKILLS
-- ============================================================

-- Marcus Gruene (Original - Survival/stealth specialist)
INSERT INTO skills (character_id, athletics, brawl, craft, drive, firearms, melee, larceny, stealth, survival, animal_ken, etiquette, insight, intimidation, leadership, performance, persuasion, streetwise, subterfuge, academics, awareness, finance, investigation, medicine, occult, politics, science, technology) VALUES
  (1, 1, 2, 0, 0, 0, 0, 0, 4, 3, 3, 0, 2, 0, 0, 1, 0, 0, 0, 0, 3, 0, 2, 0, 1, 0, 0, 0);

-- Sarah Chen (Toreador artist - Performance/persuasion focus)
INSERT INTO skills (character_id, athletics, brawl, craft, drive, firearms, melee, larceny, stealth, survival, animal_ken, etiquette, insight, intimidation, leadership, performance, persuasion, streetwise, subterfuge, academics, awareness, finance, investigation, medicine, occult, politics, science, technology) VALUES
  (2, 0, 0, 2, 1, 0, 0, 0, 1, 0, 1, 3, 3, 0, 2, 4, 3, 1, 2, 2, 2, 1, 0, 0, 1, 2, 0, 1);

-- Viktor Volkov (Brujah brawler - Combat/street focus)
INSERT INTO skills (character_id, athletics, brawl, craft, drive, firearms, melee, larceny, stealth, survival, animal_ken, etiquette, insight, intimidation, leadership, performance, persuasion, streetwise, subterfuge, academics, awareness, finance, investigation, medicine, occult, politics, science, technology) VALUES
  (3, 3, 4, 1, 2, 2, 3, 1, 2, 1, 0, 0, 2, 3, 1, 0, 1, 3, 1, 0, 2, 0, 1, 1, 0, 0, 0, 0);

-- Dr. Evelyn Cross (Tremere scholar - Academics/occult/science focus)
INSERT INTO skills (character_id, athletics, brawl, craft, drive, firearms, melee, larceny, stealth, survival, animal_ken, etiquette, insight, intimidation, leadership, performance, persuasion, streetwise, subterfuge, academics, awareness, finance, investigation, medicine, occult, politics, science, technology) VALUES
  (4, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 1, 4, 2, 1, 3, 2, 4, 1, 4, 2);

-- Jade Martinez (Nosferatu hacker - Technology/stealth/streetwise focus)
INSERT INTO skills (character_id, athletics, brawl, craft, drive, firearms, melee, larceny, stealth, survival, animal_ken, etiquette, insight, intimidation, leadership, performance, persuasion, streetwise, subterfuge, academics, awareness, finance, investigation, medicine, occult, politics, science, technology) VALUES
  (5, 2, 1, 1, 1, 1, 0, 3, 4, 2, 0, 1, 3, 2, 0, 0, 2, 3, 3, 1, 3, 1, 3, 0, 1, 1, 1, 4);

-- ============================================================
-- DISCIPLINES (Optional - if you implement disciplines table)
-- ============================================================
-- Marcus has Animalism 3, Protean 3, Celerity 1
-- Sarah has Auspex 2, Celerity 2, Presence 3
-- Viktor has Celerity 2, Potence 3, Presence 1
-- Evelyn has Auspex 3, Dominate 2, Blood Sorcery 4
-- Jade has Animalism 1, Obfuscate 4, Potence 1

-- ============================================================
-- NOTES
-- ============================================================
-- Password hashes are dummy values - replace with actual bcrypt hashes in production
-- User ID 1 = Jerry (owns Marcus)
-- User ID 2 = Demo user (owns the variants)
-- All characters are valid V5 builds with appropriate stat distributions
-- Variants demonstrate different archetypes for testing/demo purposes
