# KeyMate: Find Your Next Home
KeyMate is a web application dedicated to helping students find roommates and housing. Akin to a dating app, each user creates a profile in which they describe their traits, habits, and preferences surrounding roommates and housing. KeyMate uses this information to tailor each user's feed. This way, users can tell whether they like each other at a glance; if two users are compatible and interested in each other, they can exchange contact information. Our team hopes that this candid and holistic approach to finding potential roommates and housing will help mitigate the housing crisis and relieve students' stress.

The Milestone 1 document mentions an in-app messaging system. In the interest of time and producing quality work, we will not be implementing this feature.

**The work for Milestone 2 was distributed equally. Everyone but Ashley (who owns the repo) had trouble running the server, so Ashley made a majority of the commits in place of the other members.**

## Project Structure
The project has three major folders: components, data, and views.

### Components
The application is component-based. All components are found in `src\client\scripts\components`.

### Data
Files pertaining to data structures and mock-backend operations are found in `src\client\data`.
- `data_structures` holds data structures used to store information pertaining to each user's profile and roommate/housing preferences.
- `DatabasePouchDB.js` creates the database and exports functions for CRUD operations.

**Importing PouchDB turned out to cause several issues that we were not able to fix. Importing it as a dependency caused issues, so did the method we learned in class using just an instance of the database, which did not allow us to use any of the provided db functions. Using "require" to import PouchDB resulted in a "doesn't resolve to a url" error. We tried numerous ways of importing, and tried changing the scripts in index.html after speaking to a TA. None of these changes helped. Our data leader, Rachel, posted in piazza (private question @537), and didn't receive an answer as how to import PouchDB without errors, so we were not able to get it working in time.**

### Views
The application is mounted onto a single `root` element.

The application's views are found in `src\client\scripts\views`. They can be divided into three groups based on which headers and navbars they share: (1) views when the user is signed out, (2) views when the user is signed in, and (3) views when the user is signing in or creating their account. We created a container for each group to ensure consistency among views with shared components:

- `SignedOutContainer` can be injected into `root`.
- `SignedInContainer` can be injected into `root`.
- `CreateAccountContainer` can be injected into `root`.

These containers may be injected with their associated views.
- "Landing" and "About us" views can be injected into `SignedOutContainer`.
- "Discover" (`DisplayWithHousingView`, `DisplayWithoutHousingView`), "Matches," and "Settings" views can be injected into `SignedInContainer`.
- "Sign in" and "Create account" (`CredentialsView`, `ProfileView`, `HousingSituationView`, `NeedHousingView`, `HaveHousingView`) views can be injected into `CreateAccountContainer`.

The publisher-subscriber pattern is used for communication between views. The class for this pattern was implemented by Prof. Tim Richards, found in `src\client\scripts\Events.js`.

**Navigation in the navbar and footer works, but the links are blocked on the Discover page due to how Discover was implemented. This could not be fixed due to time constraints. Functionality can be observed by navigating to Settings via the footer first (which isn't blocked).**

## Setup Instructions
Clone the project
```
  git clone https://github.com/ashleybhandari/team-friendship.git
```
Go to the project directory
```
  cd team-friendship
```
Install dependencies
```
  npm install
```
Start the server
```
  npm run milestone-02
```
