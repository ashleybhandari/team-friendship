# KeyMate: Find Your Next Home
KeyMate is a web application dedicated to helping students find roommates and housing. Akin to a dating app, each user creates a profile in which they describe their traits, habits, and preferences surrounding roommates and housing. KeyMate uses this information to tailor each user's feed. This way, users can tell whether they like each other at a glance; if two users are compatible and interested in each other, they can exchange contact information. Our team hopes that this candid and holistic approach to finding potential roommates and housing will help mitigate the housing crisis and relieve students' stress.

The Milestone 1 document mentions an in-app messaging system. In the interest of time and producing quality work, we will not be implementing this feature.

## Navigating the application
Users are initially greeted with the landing page. In the navbar or footer, clicking "About us" navigates to a page with information about the project and team, and clicking "Sign in" navigates to the sign-in page. From the sign-in page, the user can either sign in or sign up. If the user clicks "Sign up," they are guided through the account creation process. If the user clicks "Sign in," they are directed to a view restricted to signed-in users. This view contains the Discover page (where users can "like" or "reject" potential roommates or housing), Matches page (where the user's matches live), and Settings page (where the user can edit their profile, accessible via the dropdown on the far-right of the navbar).

## Project structure
The project has three major folders: components, data, and views.

### Components
The application is component-based. All components are found in `src\client\scripts\components`.

### Data
Files pertaining to data structures and backend operations are found in `src\client\data`.
- `data_structures` holds data structures used to store information pertaining to each user's profile and roommate/housing preferences.
- `DatabasePouchDB.js` creates the database and exports functions for CRUD operations.
- `MockData.js` contains mock users for the application.

### Views
The application is mounted onto a single `root` element.

The application's views are found in `src\client\scripts\views`. They can be divided into three groups based on which headers and navbars they share: (1) views when the user is signed out; (2) views when the user is signing in or creating their account; and (3) views when the user is signed in. We created a container for each group to ensure consistency among views with shared components:

- `SignedOutContainer` can be injected into `root`.
- `CreateAccountContainer` can be injected into `root`.
- `SignedInContainer` can be injected into `root`.

These containers may be injected with their associated views.
- "Landing" and "About us" views can be injected into `SignedOutContainer`.
- "Sign in" and "Create account" (`CredentialsView`, `ProfileView`, `HousingSituationView`, `UserDetailsView`) views can be injected into `CreateAccountContainer`.
- "Discover," "Matches," and "Settings" views can be injected into `SignedInContainer`.

The publisher-subscriber pattern is used for communication between views. The class for this pattern was implemented by Prof. Tim Richards, found in `src\client\scripts\Events.js`.

## API routes
API routes can be found in `src\server\routes\landing.js`.
- `GET /` renders the landing page (`LandingView`).
- `GET /about` renders the "about us" page (`AboutView`).
- `GET /sign-in` renders the sign in page (`SignInView`).
- `GET /create-account/1` renders the credentials page during the "create account" process (`CredentialsView`).
- `GET /create-account/2` renders the profile details page during the "create account" process (`ProfileView`).
- `GET /create-account/3` renders the housing situation page during the "create account" process (`HousingSituationView`).
- `GET /create-account/4` renders the preferences/housing details page during the "create account" process (`UserDetailsView`).
- `GET /:userId/discover` renders the discover page (`DiscoverView`).
- `GET /:userId/matches` renders the user's list of matches in the matches page (`MatchesView`).
- `GET /:userId/matches/:matchId` renders a specified match's profile in the matches page (`MatchesView`).
- `GET /:userId/settings` renders the settings page (`SettingsView`).

## Setup instructions
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
