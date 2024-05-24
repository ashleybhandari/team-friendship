# KeyMate: Find Your Next Home
KeyMate is a web application dedicated to helping students find roommates and housing. Akin to the Tinder dating app, each user creates a profile in which they describe their traits, habits, and preferences regarding roommates and housing. KeyMate uses this information to tailor their respective feeds. This way, users can tell whether they like each other at a glance; if two users are compatible and interested in each other, the application matches them and provides information to initiate contact. Our team hopes that this candid and holistic approach to finding potential roommates and housing will help mitigate the UMass Amherst housing crisis and relieve students' stress.

This application was built as a semester-long group project for the course *COMPSCI 326 Web Programming* at UMass Amherst.

## Navigating the application
Users are initially greeted with the landing page. In the navbar or footer, clicking "About us" navigates to a page with information about the project and team, and clicking "Sign in" navigates to the sign-in page.

From the sign-in page, the user can either sign in or sign up. If the user clicks "Sign up," they are guided through the account creation process. If the user clicks "Sign in," they are directed to a view restricted to signed-in users. This view contains the Discover page (where users can "like" or "reject" potential roommates or housing), Matches page (where the user's matches live), and Settings page (where the user can edit their profile, accessible via the dropdown on the far-right of the navbar).

## Project structure
The project has three major folders: components, data, and views.

### Components
The application is component-based. All components are found in the [components folder](src/client/scripts/components).

### Data
Files pertaining to data structures and local storage management are found in the [data folder](src/client/data).
- The [data_structures folder](src/client/data/data_structures) holds data structures used to store information pertaining to each user's profile and roommate/housing preferences.
- [`DatabasePouchDB.js`](src/client/data/DatabasePouchDB.js) creates the database and exports functions for CRUD operations.
- [`MockData.js`](src/client/data/MockData.js) contains mock users for the application.

### Views
The application is mounted onto a single `root` element.

[The application's views](src/client/scripts/views) can be divided into three groups based on which headers and navbars they share: (1) views when the user is signed out; (2) views when the user is signing in or creating their account; and (3) views when the user is signed in. We created a container for each group to ensure consistency among views with shared components:

- [SignedOutContainer](src/client/scripts/views/SignedOut/SignedOutContainer.js) can be injected into `root`.
- [CreateAccountContainer](src/client/scripts/views/CreateAccount/CreateAccountContainer.js) can be injected into `root`.
- [SignedInContainer](src/client/scripts/views/SignedIn/SignedInContainer.js) can be injected into `root`.

These containers may be injected with their associated views.
- The [Landing](src/client/scripts/views/SignedOut/LandingView.js) and [About us](src/client/scripts/views/SignedOut/AboutView.js) views can be injected into SignedOutContainer.
- The [Sign in](src/client/scripts/views/CreateAccount/SignInView.js) and Create account views ([CredentialsView](src/client/scripts/views/CreateAccount/CredentialsView.js), [ProfileView](src/client/scripts/views/CreateAccount/ProfileView.js), [HousingSituationView](src/client/scripts/views/CreateAccount/HousingSituationView.js), [UserDetailsView](src/client/scripts/views/CreateAccount/UserDetailsView.js)) can be injected into CreateAccountContainer.
- The [Discover](src/client/scripts/views/SignedIn/DiscoverView.js), [Matches](src/client/scripts/views/SignedIn/MatchesView.js), and [Settings](src/client/scripts/views/SignedIn/SettingsView.js) views can be injected into SignedInContainer.

The publisher-subscriber pattern is used for communication between views. The class for this pattern was implemented by Prof. Tim Richards, found in [`src/client/scripts/Events.js`](src/client/scripts/Events.js).

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
Open http://127.0.0.1:3000/ in your browser if it does not open automatically.

## Authors
- [Gauri Arvind](https://github.com/G-Arv)
- [Isha Bang](https://github.com/ishabang007)
- [Ashley Bhandari](https://github.com/ashleybhandari)
- [Kshama Kolur](https://github.com/kkolur5)
- [Rachel Lahav](https://github.com/rachlahav)
