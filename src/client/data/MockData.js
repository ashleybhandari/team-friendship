// created by Gauri Arvind and Ashley Bhandari

import { User } from './data_structures/User.js';
import { Preferences } from './data_structures/Preferences.js';
import { Housing } from './data_structures/Housing.js';

/**
 * This file contains mock users until we implement backend functionality.
 */

// Discover shows Jimmy
// Matches show Linda, Gene
const u0 = new User(
    'user_0',
    'bob@gmail.com',
    'password_0',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHUpMwkylu5pmA8BUZIcvYlNFYF_uChkis9u9O-izKNA&s',
    { fname: 'Robert', nname: 'Bob' },
    46,
    { identity: 'man', pronouns: 'he/him' },
    { clean: 1, sleep: 2, noise: 2, guests: 1 },
    { major: 'Culinary Arts', school: 'Umass Amherst' },
    {},
    `I am a third-generation restaurateur. I run Bob's Burgers with the help of my wife, Linda Belcher, and my three kids, Tina, Gene, and Louise Belcher. While poor with business management and cursed with an unlucky streak, my experience and skill in homemade cuisine have helped my restaurant stay afloat.`,
    false, // hasHousing
    new Preferences(
        null,
        null,
        null,
        { allFemale: true, allMale: true, mixed: true },
        { perSemester: true, monthly: true, sixMonths: true, yearly: true },
        { rent: true, sublet: true },
        { private: true, shared: true },
        { dorm: true, apartment: true, house: true },
        { fall: true, winter: true, spring: true, summer: true },
        { aircon: true, dishwasher: true, hardwood: true, carpet: true, laundry: true, parking: true, bus: true, pets: true }
    ),
    new Housing(),
    [], // liked
    [], // rejected
    ['user_1', 'user_3']  // matches
);

// Discover shows Tina, Louise
// Matches show Bob
const u1 = new User(
    'user_1',
    'linda@gmail.com',
    'password_1',
    'https://external-preview.redd.it/aQ6RAxPRAgAXfejqdYUY9WojpdHS3QYk_pTJeo4Prc4.jpg?auto=webp&s=610291f0a836bac7cf280d67fdf776e023869347',
    { fname: 'Linda', nname: 'Lin' },
    44,
    { identity: 'woman', pronouns: 'she/her' },
    { clean: 2, sleep: 3, noise: 3, guests: 2 },
    { major: 'Music', school: 'Smith', level: 'grad' },
    { fb: 'lindabelcher', ig: 'linlig' },
    `I have a broad sense of humor, constantly joking with my family and friends. I am wise and kind to my family and love them very much. I co-own Bob's Burgers with my husband and help run the restaurant for him when he's busy or away.`,
    true, // hasHousing
    new Preferences(),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        4,
        2,
        'allFemale',
        { water: true, sewer: true, snow: true },
        'perSemester',
        'rent',
        'private',
        'house',
        'summer',
        { dishwasher: true, hardwood: true, parking: true, bus: true },
        [ 'https://static.wikia.nocookie.net/bobsburgerpedia/images/3/31/Jimmypestospizza.jpg/revision/latest?cb=20110902183814', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIJfoiz3klpLTVdeLL77AT8rMqL1m1gpV8Aor-Pl4Q&s'],
        `Bob's Burgers is the restaurant owned by me and Bob Belcher, which is "conveniently located on Ocean Avenue" (Easy Com-mercial, Easy Go-mercial) in Seymour's Bay, New Jersey. It is located in a rental property that also contains my family's apartment.`
    ),
    [], // liked
    [], // rejected
    ['user_0']  // matches
);

// Discover shows Linda, Gene
// Matches show nothing
const u2 = new User(
    'user_2',
    'tina@gmail.com',
    'password_2',
    'https://pbs.twimg.com/profile_images/2268200472/xg34b9qgfjmf1g6oyynl_400x400.png',
    { fname: 'Tina' },
    13,
    { identity: 'nonbinary', pronouns: 'they/them' },
    { clean: 3, sleep: 1, noise: 1, guests: 3 },
    { major: 'Biology', school: 'Smith', level: 'undergrad' },
    { fb: 'tinytina', ig: 'tt_ig' },
    `I am a hopeless romantic yet easily influenced person with a powerful sex drive and minimal social skills. I like horses, butts, zombies, boys, and writing erotic fiction about movies and my life.`,
    false, // hasHousing
    new Preferences(
        null,
        null,
        null,
        { allFemale: true, allMale: true, mixed: true },
        { perSemester: true, monthly: true, sixMonths: true, yearly: true },
        { rent: true, sublet: true },
        { private: true, shared: true },
        { dorm: true, apartment: true, house: true },
        { fall: true, winter: true, spring: true, summer: true },
        { aircon: true, dishwasher: true, hardwood: true, carpet: true, laundry: true, parking: true, bus: true, pets: true }
    ),
    new Housing(),
    ['user_5'], // liked
    [], // rejected
    []  // matches
);

// Discover shows Tina
// Matches show Bob
const u3 = new User(
    'user_3',
    'gene@gmail.com',
    'password_3',
    'https://openpsychometrics.org/tests/characters/test-resources/pics/BOBB/4.jpg',
    { fname: 'Eugene', nname: 'Gene' },
    11,
    { identity: 'nonbinary', pronouns: 'they/them' },
    { clean: 3, sleep: 3, noise: 3, guests: 3 },
    { major: 'Music', school: 'Umass Amherst', level: 'undergrad' },
    { fb: 'geniefb', ig: 'genebelcher' },
    `I am an aspiring musician and a prankster. I maintain very close relationships with both of my parents and two sisters, Tina and Louise Belcher. Along with Tina, I am usually a pawn in schemes set up by Louise.`,
    true, // hasHousing
    new Preferences(),
    new Housing(
        'Sunderland',
        { price: 700, period: 'month' },
        2,
        1,
        'mixed',
        { electric: true, water: true, trash: true },
        'yearly',
        'sublet',
        'private',
        'apartment',
        'fall',
        { dishwasher: true, carpet: true, parking: true, bus: true },
        ['https://ew.com/thmb/sOFfYRph6EmGoA_O5qJ-QuvJifM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bobs-burgers1-db2ce51b2c0b4ad2b6b81dc2913227d9.jpg'],
        `Ocean Avenue Hi-Fi Emporium is a pawn shop that I frequent to play with a drum machine, much to the annoyance of the shop's owner, Dino. In "Drumforgiven" the above mentioned habit gets me banned from the store, causing Louise to seek revenge on Dino.`
    ),
    ['user_demo'], // liked
    ['user_4'], // rejected
    ['user_0']  // matches
);

// Discover shows nothing
// Matches show Jimmy
const u4 = new User(
    'user_4',
    'louise@gmail.com',
    'password_4',
    'https://pbs.twimg.com/profile_images/3637982405/d4433bb7717739e9a6d589e69f0fb7d8_400x400.jpeg',
    { fname: 'Louise' },
    9,
    { identity: 'woman', pronouns: 'she/her' },
    { clean: 3, sleep: 3, noise: 3, guests: 2 },
    { major: 'History', school: 'Amherst College', level: 'undergrad' },
    { fb: 'lulufb', ig: 'louisebelcher' },
    `I am a bright (in the brain), mischievous yet manipulative, and aggressive child. My off-balance sense of humor and hunger for conflict makes me somewhat of a liability in the kitchen and often gets my family both into and/or out of tricky situations.`,
    false, // hasHousing
    new Preferences(
        null,
        null,
        null,
        { allFemale: true, allMale: true, mixed: true },
        { perSemester: true, monthly: true, sixMonths: true, yearly: true },
        { rent: true, sublet: true },
        { private: true, shared: true },
        { dorm: true, apartment: true, house: true },
        { fall: true, winter: true, spring: true, summer: true },
        { aircon: true, dishwasher: true, hardwood: true, carpet: true, laundry: true, parking: true, bus: true, pets: true }
    ),
    new Housing(),
    [], // liked
    ['user_1', 'user_3'], // rejected
    ['user_5']  // matches
);

// Discover shows Bob, Tina
// Matches show Louise
const u5 = new User(
    'user_5',
    'jimmy@gmail.com',
    'password_5',
    'https://preview.redd.it/kz19pbh77fk61.jpg?auto=webp&s=8a533474d98b9d82c7ffda0902d98ee2c50c2677',
    { fname: 'Jimmy Jr.', nname: 'J-Ju' },
    13,
    { identity: 'man', pronouns: 'he/him' },
    { clean: 1, sleep: 3, noise: 1, guests: 3 },
    { major: 'Dance', school: 'UMass Amherst', level: 'undergrad' },
    { fb: 'jimmyjrpesto.fb', ig: 'jj_ig' },
    `I’m an eighth-grader at Wagstaff School in the same classes as Tina Belcher, who's had the longest crush on me since I made my first appearance in "Sheesh! Cab, Bob?," but unfortunately for her, I care more about dancing and my best friend, Zeke.`,
    true, // hasHousing
    new Preferences(),
    new Housing(
        'Amherst',
        { price: 950, period: 'month' },
        2,
        1,
        'allMale',
        { water: true, trash: true, sewer: true, snow: true },
        'yearly',
        'rent',
        'shared',
        'apartment',
        'fall',
        { aircon: true, hardwood: true, parking: true },
        [ 'https://static.wikia.nocookie.net/bobsburgerpedia/images/3/31/Jimmypestospizza.jpg/revision/latest?cb=20110902183814', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIJfoiz3klpLTVdeLL77AT8rMqL1m1gpV8Aor-Pl4Q&s'],
        `Jimmy Pesto's Pizzeria is an Italian themed restaurant across the street from Bob's Burgers on Ocean Avenue. It is owned by Jimmy Pesto, who rents the property from Mr. Fischoeder. I work as a busboy. The décor consists primarily of Italian motifs, such as exposed brick, pictures and flags of Italy, grapes, etc., with one wall dedicated to Jimmy Pesto's "trophies." The menu features many Italian staples as well as "Pesto's Besto Burgers" and "Pesto Coladas."`
    ),
    ['user_demo'], // liked
    [], // rejected
    ['user_4']  // matches
);

// Discover shows Linda, Gene (liked), Jimmy (liked)
// Matches show nothing
const u6 = new User(
    'user_demo',
    'ashley@gmail.com',
    'password_demo',
    null,
    { fname: 'Ashley' },
    22,
    { identity: 'woman', pronouns: 'she/her' },
    { clean: 3, sleep: 3, noise: 1, guests: 1 },
    { major: 'CS', school: 'UMass Amherst' },
    {},
    'Demo user - no housing',
    false, // hasHousing
    new Preferences(
        null,
        null,
        null,
        { allFemale: true, allMale: true, mixed: true },
        { perSemester: true, monthly: true, sixMonths: true, yearly: true },
        { rent: true, sublet: true },
        { private: true, shared: true },
        { dorm: true, apartment: true, house: true },
        { fall: true, winter: true, spring: true, summer: true },
        { aircon: true, dishwasher: true, hardwood: true, carpet: true, laundry: true, parking: true, bus: true, pets: true }
    ),
    new Housing(),
    [], // liked
    [], // rejected
    []  // matches
);

export const users = [ u0, u1, u2, u3, u4, u5, u6 ];