export class User {
    /**
     * Data structure: A user's profile information. Parameters in brackets are
     * optional.
     * @param {number} id
     * @param {string} email
     * @param {string} avatar - Picture
     * @param {Object} name
     *   @param {string} name.fname - First name
     *   @param {string} [name.nname] - Nickname
     * @param {number} age
     * @param {Object} gender
     *   @param {string} gender.identity - "woman", "man", "nonbinary"
     *   @param {string} [gender.pronouns]
     * @param {Object} character - Characteristics
     *   @param {number} character.clean - Cleanliness slider value (1-3) 
     *   @param {number} character.sleep - Sleeping habits slider value (1-3)
     *   @param {number} character.noise - Noise when studying slider value (1-3)
     *   @param {number} character.guests - Hosting guests slider value (1-3)
     * @param {Object} education
     *   @param {string} [education.major]
     *   @param {string} [education.school]
     *   @param {string} [education.level] - "undergrad", "grad", "other"
     * @param {Object} socials
     *   @param {string} [socials.fb] - Facebook
     *   @param {string} [socials.ig] - Instagram
     * @param {string} [description] - User-inputted description
     * @param {boolean} hasHousing - Whether the use has housing
     * @param {Preferences} [preferences] - If user does not have housing
     * @param {Housing} [housing] - If user has housing
     * @param {number[]} liked - List of id's user has liked
     * @param {number[]} rejected - List of id's user has rejected
     * @param {number[]} matches - List of id's user has matched with
     */
    constructor(id, email, avatar, name, age, gender, character, education,
        socials, description, hasHousing, preferences, housing, liked,
        rejected, matches
    ) {
        this.id = id;
        this.email = email;
        this.avatar = avatar;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.character = character;
        this.education = education;
        this.socials = socials;
        this.description = description;
        this.hasHousing = hasHousing;
        this.preferences = preferences;
        this.housing = housing;
        this.liked = liked;
        this.rejected = rejected;
        this.matches = matches;
    }
}