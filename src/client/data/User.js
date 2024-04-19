export class User {
    /**
     * Data structure: A user's profile information. Parameters in brackets are
     * optional.
     * @param {number} id
     * @param {string} email
     * @param {string} pic - Profile picture
     * @param {Object} name
     *   @param {string} name.fname - First name
     *   @param {string} [name.nname] - Nickname
     * @param {number} age
     * @param {Object} gender
     *   @param {string} gender.identity - "male", "female", "nb"
     *   @param {string} [gender.pronouns]
     * @param {Object} characteristics
     *   @param {number} characteristics.clean - Cleanliness slider value (1-3) 
     *   @param {number} characteristics.sleep - Sleeping habits slider value (1-3)
     *   @param {number} characteristics.noise - Noise when studying slider value (1-3)
     *   @param {number} characteristics.guests - Hosting guests slider value (1-3)
     * @param {Object} school
     *   @param {string} [school.major]
     *   @param {string} [school.level] - Undergrad/Grad/Other
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
    constructor(id, email, pic, name, age, gender, characteristics, school,
        socials, description, hasHousing, preferences, housing, liked,
        rejected, matches
    ) {
        this.id = id;
        this.email = email;
        this.pic = pic;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.characteristics = characteristics;
        this.school = school;
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