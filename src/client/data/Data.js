import { User } from './User.js';
import { Preferences } from './Preferences.js';
import { Housing } from './Housing.js';

// mock users

const u0 = new User(
    0,
    'bob@gmail.com',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHUpMwkylu5pmA8BUZIcvYlNFYF_uChkis9u9O-izKNA&s',
    { fname: 'Robert', nname: 'Bob' },
    46,
    { identity: 'male', pronouns: 'he/him' },
    { clean: 1, sleep: 2, noise: 2, guests: 1 },
    { major: 'Culinary Arts', level: 'Grad' },
    null,
    null,
    false,
    new Preferences(),
    new Housing(),
    [],
    [],
    []
);

const u1 = new User(
    1,
    'linda@gmail.com',
    'https://external-preview.redd.it/aQ6RAxPRAgAXfejqdYUY9WojpdHS3QYk_pTJeo4Prc4.jpg?auto=webp&s=610291f0a836bac7cf280d67fdf776e023869347',
    { fname: 'Linda', nname: 'Lin' },
    44,
    { identity: 'she/her' },
    { clean: 2, sleep: 3, noise: 3, guests: 2 },
    { major: 'Math' },
    { fb: 'lindabelcher' },
    'Linda. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse felis enim, tristique ac varius vel, aliquet ut diam. Duis sit amet neque mi. Nulla erat arcu, malesuada aliquam placerat nec, tristique eget ante. Vestibulum non mi nulla. Morbi consectetur vestibulum sem, sed molestie est gravida vitae. Mauris blandit faucibus tellus et scelerisque. Vestibulum felis purus, iaculis a accumsan nec, bibendum at magna. Sed ut turpis est. Aliquam ut metus placerat erat consectetur ullamcorper feugiat commodo lacus. Donec nulla turpis, viverra sit amet consequat ut, tincidunt sit amet odio. Fusce at nisl maximus, faucibus est quis, convallis quam. Integer porttitor metus nec nibh fringilla tincidunt. Suspendisse lacus elit, mollis at neque a, luctus condimentum tortor. Cras eget feugiat leo.',
    false,
    new Preferences(),
    new Housing(),
    [],
    [],
    []
);

const u2 = new User(
    2,
    'tina@gmail.com',
    'https://pbs.twimg.com/profile_images/2268200472/xg34b9qgfjmf1g6oyynl_400x400.png',
    { fname: 'Tina' },
    13,
    { identity: 'nb' },
    { clean: 3, sleep: 1, noise: 1, guests: 3 },
    { major: 'Biology', level: 'Undergrad' },
    null,
    'Tina. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum non diam eu lorem bibendum pellentesque vel id neque. Vivamus dui metus, sollicitudin vitae dui vel, semper condimentum velit. Etiam porta at ligula nec porttitor. Duis auctor ultricies leo, non sodales magna euismod vitae. Sed nunc ipsum, porta et lacinia ac, eleifend facilisis orci. Aenean mattis, nisl at dignissim scelerisque, lacus tellus placerat nibh, cursus luctus ex velit non nisl. Sed at diam sit amet tortor iaculis placerat hendrerit eu neque. Cras id orci at ligula sodales auctor. Sed eget interdum urna. Pellentesque aliquam sem nibh, id varius mi sodales non. Ut malesuada mi sed nulla tempus placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vel efficitur mauris.',
    true,
    new Preferences(),
    new Housing(
        'Amherst',
        { price: 800, period: 'month' },
        3,
        1,
        'female',
        { electric: true, gas: false, water: true, trash: true, sewer: true, internet: false, snow: true },
        'year',
        'rent',
        'private',
        'apt',
        'fall',
        {},
        ['https://www.slashfilm.com/img/gallery/bobs-burgers-12-best-tina-belcher-episodes/l-intro-1683233064.jpg', 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/Bobs-Burgers-Tina-Boys.jpg'],
        'Morbi cursus pharetra sapien, quis viverra felis tempus sed. Sed auctor mauris vel nisl posuere auctor. Nulla sagittis dignissim suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras congue interdum dui a imperdiet. In dignissim maximus augue vel luctus. Morbi mi ligula, consectetur vel rhoncus eu, posuere viverra turpis. Cras tempus gravida egestas. Quisque nec laoreet tortor. Duis viverra, metus sit amet accumsan ultricies, ipsum dolor facilisis tellus, vitae aliquam metus orci non dolor. Aliquam libero libero, sodales ac dignissim non, tristique non urna. Quisque lacinia tincidunt risus at mollis. Sed et justo vitae velit aliquet venenatis. Praesent sagittis, felis sit amet fringilla commodo, erat ante tincidunt odio, sit amet iaculis lectus est vitae nulla.'
    ),
    [],
    [],
    []
);

const u3 = new User(
    3,
    'gene@gmail.com',
    'https://openpsychometrics.org/tests/characters/test-resources/pics/BOBB/4.jpg',
    { fname: 'Gene' },
    11,
    { identity: 'nb' },
    { clean: 3, sleep: 3, noise: 3, guests: 3 },
    { major: 'Art' },
    { ig: 'genebelcher' },
    'Gene. Mauris nec tortor vel lacus viverra convallis non a sem. Fusce fringilla leo vel semper iaculis. Integer ultricies pretium maximus. Sed pretium fermentum enim, ac lacinia turpis tempus vel. Integer commodo arcu egestas mi lacinia, iaculis rhoncus mauris lobortis. Aenean a mi semper, eleifend tellus vel, varius odio. Duis sagittis felis quis justo imperdiet interdum. Etiam dignissim accumsan enim, sit amet consectetur leo vehicula sed. Praesent vulputate nisi et semper lobortis.',
    true,
    new Preferences(),
    new Housing(
        'Sunderland',
        { price: 700, period: 'month' },
        4,
        2,
        'mixed',
        { electric: true, gas: false, water: true, trash: true, sewer: true, internet: false, snow: true },
        'year',
        'rent',
        'shared',
        'house',
        'fall',
        {},
        ['https://ew.com/thmb/sOFfYRph6EmGoA_O5qJ-QuvJifM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bobs-burgers1-db2ce51b2c0b4ad2b6b81dc2913227d9.jpg'],
        'Suspendisse volutpat porttitor auctor. Nam semper id libero ut blandit. Praesent nec sem bibendum urna porta convallis. Cras lobortis purus quis est euismod cursus. Cras vel maximus nibh. Morbi sed pellentesque dui. Curabitur sit amet varius turpis.'
    ),
    [],
    [],
    []
);

const u4 = new User(
    4,
    'louise@gmail.com',
    'https://pbs.twimg.com/profile_images/3637982405/d4433bb7717739e9a6d589e69f0fb7d8_400x400.jpeg',
    { fname: 'Louise' },
    9,
    { identity: 'female', pronouns: 'she/her' },
    { clean: 3, sleep: 3, noise: 3, guests: 2 },
    { major: 'History', level: 'Undergrad' },
    { ig: 'louisebelcher' },
    'Louise. Vestibulum eu facilisis risus. Integer id arcu sodales, finibus nibh nec, consequat ante. Curabitur ut arcu sollicitudin, suscipit mauris id, molestie dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet nisi fermentum, fringilla enim a, aliquam lacus. Nulla eu sem feugiat, consectetur ligula euismod, porttitor sem. In hac habitasse platea dictumst. Praesent volutpat lorem dui, ut scelerisque sem interdum id. Duis finibus eget enim sed suscipit. Mauris pulvinar hendrerit quam, vitae auctor elit feugiat a. Curabitur sodales, magna nec semper placerat, dui risus ultricies purus, eget venenatis lacus leo vitae eros. Maecenas molestie risus a lacus viverra varius.',
    false,
    new Preferences(),
    new Housing(),
    [],
    [],
    []
);

export const users = [ u0, u1, u2, u3, u4 ];