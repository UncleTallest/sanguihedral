Hello,

I've decided on a custom project for my final sprint. **Sanguihedral** is a cross-platform dice roller and character sheet app for Vampire the Masquerade v5. It was requested by my local Austin LARP group as a replacement for iOS dice apps that are no longer available, and serves as my capstone project.

The MVP will focus on core character management and dice rolling functionality integrated with a 3rd-party API for accurate V5 mechanics. Users create characters with sect/clan selection, then the app calculates dice pools from their sheet attributes and handles hunger mechanics automatically.

I'm thinking of 3-4 main pages: authentication (signup/login), character list, character sheet editor, and the dice roller interface. Users must be authenticated to save characters to the database.

I'll be using the **VampyreByte V5 Dice API** to handle roll calculations, which satisfies the 3rd-party API requirement. The API takes total dice pool, hunger dice, and difficulty, then returns successes/failures including messy criticals and bestial failures.

This is a great opportunity to build a full-stack app that solves a real problem for my local gaming community while demonstrating authentication, database design, and API integration.

Current live demo (frontend only): https://uncletallest.github.io/sanguihedral/

## Frontend

- User authentication and character management
- Character creation with Sect and Clan selection
- Character sheet interface (attributes, skills, hunger tracking)
- Dice roller with custom imagery (sect symbols for successes, skulls for failures)
- Integration with VampyreByte V5 API for roll calculations
- Display roll results with V5 mechanics (messy criticals, bestial failures)

## Backend

- User authentication and account creation (JWT)
- Character CRUD operations
- Store character data (attributes, skills, hunger, etc.)
- Proxy dice roll requests to VampyreByte API
- Optional: Roll history tracking
- Provide REST API endpoints for frontend

## Database

- User accounts (email, password, username)
- Characters (name, sect, clan, hunger, health, willpower, humanity)
- Attributes (physical, social, mental)
- Skills (physical, social, mental - ~27 total)
- Optional: Roll history for analytics

## Tech Stack

- React (with Vite)
- Express
- PostgreSQL
- VampyreByte V5 Dice API
- JWT for authentication
- React Router for navigation

## Nice-to-Haves (Post-MVP)

- PDF character sheet export via Foxit API
- Desktop client in Vala (Linux/Windows/macOS)
- Storyteller Mode (silent rolls, NFC pairing)
- Roll history and analytics
