import { User } from './data_structures/User.js';
import { Preferences } from './data_structures/Preferences.js';
import { Housing } from './data_structures/Housing.js';

// mock users

const u0 = new User(
    0,
    'bob@gmail.com',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHUpMwkylu5pmA8BUZIcvYlNFYF_uChkis9u9O-izKNA&s',
    { fname: 'Robert', nname: 'Bob' },
    46,
    { identity: 'man', pronouns: 'he/him' },
    { clean: 1, sleep: 2, noise: 2, guests: 1 },
    { major: 'Culinary Arts', school: 'Umass Amherst', level: 'grad' },
    { fb: 'fbobob', ig: 'bobig'},
    'Bob. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.',
    false, // hasHousing
    new Preferences(
        ['Amherst', 'Sunderland', 'Northampton'],
        { min: 600, max: 1000 },
        { min: 1, max: 3 },
        { female: false, male: true, mixed: true },
        { semester: true, year: true },
        { rent: true },
        { private: true },
        { apt: true, house: true },
        { fall: true },
        { laundry: true, parking: true }
    ),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        3,
        1,
        'male',
        { water: true, sewer: true, snow: true },
        'yearly',
        'rent',
        'shared',
        'house',
        'fall',
        { dishwasher: true, laundry: true, parking: true },
        [ 'https://static.wikia.nocookie.net/bobsburgerpedia/images/3/31/Jimmypestospizza.jpg/revision/latest?cb=20110902183814', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIJfoiz3klpLTVdeLL77AT8rMqL1m1gpV8Aor-Pl4Q&s'],
        'Bob housing notes. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.'
    ),
    [], // liked
    [], // rejected
    []  // matches
);

const u1 = new User(
    1,
    'linda@gmail.com',
    'https://external-preview.redd.it/aQ6RAxPRAgAXfejqdYUY9WojpdHS3QYk_pTJeo4Prc4.jpg?auto=webp&s=610291f0a836bac7cf280d67fdf776e023869347',
    { fname: 'Linda', nname: 'Lin' },
    44,
    { identity: 'woman', pronouns: 'she/her' },
    { clean: 2, sleep: 3, noise: 3, guests: 2 },
    { major: 'Music', school: 'Smith', level: 'grad' },
    { fb: 'lindabelcher', ig: 'linlig' },
    'Linda. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.',
    true, // hasHousing
    new Preferences(
        ['Amherst', 'Sunderland', 'Northampton'],
        { min: 600, max: 1000 },
        { min: 1, max: 3 },
        { female: false, male: true, mixed: true },
        { semester: true, year: true },
        { rent: true },
        { private: true },
        { apt: true, house: true },
        { fall: true },
        { laundry: true, parking: true }
    ),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        3,
        1,
        'male',
        { water: true, sewer: true, snow: true },
        'yearly',
        'rent',
        'shared',
        'house',
        'fall',
        { dishwasher: true, laundry: true, parking: true },
        [ 'https://static.wikia.nocookie.net/bobsburgerpedia/images/3/31/Jimmypestospizza.jpg/revision/latest?cb=20110902183814', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIJfoiz3klpLTVdeLL77AT8rMqL1m1gpV8Aor-Pl4Q&s'],
        'Linda housing notes. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.'
    ),
    [], // liked
    [], // rejected
    []  // matches
);

const u2 = new User(
    2,
    'tina@gmail.com',
    'https://pbs.twimg.com/profile_images/2268200472/xg34b9qgfjmf1g6oyynl_400x400.png',
    { fname: 'Tina', nname: 'Teeny' },
    13,
    { identity: 'nonbinary', pronouns: 'they/them' },
    { clean: 3, sleep: 1, noise: 1, guests: 3 },
    { major: 'Biology', school: 'Smith', level: 'undergrad' },
    { fb: 'tinytina', ig: 'tt_ig' },
    'Tina. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.',
    true, // hasHousing
    new Preferences(
        ['Amherst', 'Sunderland', 'Northampton'],
        { min: 600, max: 1000 },
        { min: 1, max: 3 },
        { female: false, male: true, mixed: true },
        { semester: true, year: true },
        { rent: true },
        { private: true },
        { apt: true, house: true },
        { fall: true },
        { laundry: true, parking: true }
    ),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        3,
        1,
        'male',
        { water: true, sewer: true, snow: true },
        'yearly',
        'rent',
        'shared',
        'house',
        'fall',
        { dishwasher: true, laundry: true, parking: true },
        [ 'https://static.wikia.nocookie.net/bobsburgerpedia/images/3/31/Jimmypestospizza.jpg/revision/latest?cb=20110902183814', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIJfoiz3klpLTVdeLL77AT8rMqL1m1gpV8Aor-Pl4Q&s'],
        'Tina housing notes. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.'
    ),
    [], // liked
    [], // rejected
    []  // matches
);

const u3 = new User(
    3,
    'gene@gmail.com',
    'https://openpsychometrics.org/tests/characters/test-resources/pics/BOBB/4.jpg',
    { fname: 'Eugene', nname: 'Gene' },
    11,
    { identity: 'nonbinary', pronouns: 'they/them' },
    { clean: 3, sleep: 3, noise: 3, guests: 3 },
    { major: 'Music', school: 'Umass Amherst', level: 'undergrad' },
    { fb: 'geniefb', ig: 'genebelcher' },
    'Gene. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.',
    true, // hasHousing
    new Preferences(
        ['Amherst', 'Sunderland', 'Northampton'],
        { min: 600, max: 1000 },
        { min: 1, max: 3 },
        { female: false, male: true, mixed: true },
        { semester: true, year: true },
        { rent: true },
        { private: true },
        { apt: true, house: true },
        { fall: true },
        { laundry: true, parking: true }
    ),
    new Housing(
        'Sunderland',
        { price: 700, period: 'month' },
        4,
        2,
        'mixed',
        { electric: true, gas: false, water: true, trash: true, sewer: true, internet: false, snow: true },
        'yearly',
        'rent',
        'shared',
        'house',
        'fall',
        {},
        ['https://ew.com/thmb/sOFfYRph6EmGoA_O5qJ-QuvJifM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bobs-burgers1-db2ce51b2c0b4ad2b6b81dc2913227d9.jpg'],
        'Gene housing notes. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.'
    ),
    [], // liked
    [], // rejected
    []  // matches
);

const u4 = new User(
    4,
    'louise@gmail.com',
    'https://pbs.twimg.com/profile_images/3637982405/d4433bb7717739e9a6d589e69f0fb7d8_400x400.jpeg',
    { fname: 'Louise', nname: 'Miss Missy' },
    9,
    { identity: 'woman', pronouns: 'she/her' },
    { clean: 3, sleep: 3, noise: 3, guests: 2 },
    { major: 'History', school: 'Amherst College', level: 'undergrad' },
    { fb: 'lulufb', ig: 'louisebelcher' },
    'Louise. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.',
    true, // hasHousing
    new Preferences(
        ['Amherst', 'Sunderland', 'Northampton'],
        { min: 600, max: 1000 },
        { min: 1, max: 3 },
        { female: false, male: true, mixed: true },
        { semester: true, year: true },
        { rent: true },
        { private: true },
        { apt: true, house: true },
        { fall: true },
        { laundry: true, parking: true }
    ),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        3,
        1,
        'female',
        { electric: true, gas: false, water: true, trash: true, sewer: true, internet: false, snow: true },
        'yearly',
        'rent',
        'private',
        'apt',
        'fall',
        {},
        ['https://www.slashfilm.com/img/gallery/bobs-burgers-12-best-tina-belcher-episodes/l-intro-1683233064.jpg', 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/Bobs-Burgers-Tina-Boys.jpg'],
        'Louise housing notes. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.'
    ),
    [], // liked
    [], // rejected
    []  // matches
);

const u5 = new User(
    5,
    'jimmy@gmail.com',
    'https://preview.redd.it/kz19pbh77fk61.jpg?auto=webp&s=8a533474d98b9d82c7ffda0902d98ee2c50c2677',
    { fname: 'Jimmy Jr.', nname: 'J-Ju' },
    13,
    { identity: 'man', pronouns: 'he/him' },
    { clean: 1, sleep: 3, noise: 1, guests: 3 },
    { major: 'Dance', school: 'UMass Amherst', level: 'undergrad' },
    { fb: 'jimmyjrpesto.fb', ig: 'jj_ig' },
    'Jimmy Jr. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.',
    true, // hasHousing
    new Preferences(
        ['Amherst', 'Sunderland', 'Northampton'],
        { min: 600, max: 1000 },
        { min: 1, max: 3 },
        { female: false, male: true, mixed: true },
        { semester: true, year: true },
        { rent: true },
        { private: true },
        { apt: true, house: true },
        { fall: true },
        { laundry: true, parking: true }
    ),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        3,
        1,
        'male',
        { water: true, sewer: true, snow: true },
        'yearly',
        'rent',
        'shared',
        'house',
        'fall',
        { dishwasher: true, laundry: true, parking: true },
        [ 'https://static.wikia.nocookie.net/bobsburgerpedia/images/3/31/Jimmypestospizza.jpg/revision/latest?cb=20110902183814', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RIJfoiz3klpLTVdeLL77AT8rMqL1m1gpV8Aor-Pl4Q&s'],
        'Jimmy Jr. housing notes. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus.'
    ),
    [], // liked
    [], // rejected
    []  // matches
);

export const users = [ u0, u1, u2, u3, u4, u5 ];