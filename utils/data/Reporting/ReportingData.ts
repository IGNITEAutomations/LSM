export type ReportingDataType = {
  gender: "male" | "female" | null,
  introduction: string,
  how_works?: string,
  special_skills?: string,
  point_to_improve?: string,
  closure: string
}

export default class ReportingData {

    private static gender = [
        "Male",
        "Female",
        "Other"
    ]

    private static introduction_sentences = [
        "[name] shows enthusiasm and desire to learn from the first classes.",
        "[name] participates with joy in the classes, [subject] enjoys learning more and more with [possessive] friends.",
        "[possessive] interest in classes is quite evident. ",
        "[name] has been very curious about our activities since the beginning of the year.",
        "[name] has shown motivation for technology since we've known [object].",
        "It's really nice to see [name] grow up and shows interest in technology.",
        "[name] is always focused in class, listening to the teacher and following their instructions.",
        "[name] has recently joined the class and has since proven to enjoy this time of the week.",
        "[name] recently joined the class, from day one [subject] adjusted quickly and caught up with [possessive] team.",
        "[name] arrives happy and gets ready to work with [possessive] team.",
        "[name] arrives happy and eager to learn every session.",
        "[name] comes to class happily and quickly concentrates to start.",
        "[name] participates actively in class and works very well following the instructions given.",
        "[Subject] is very integrated into the class and has a good relationship with everyone. ",
        "[name] always pays attention and obeys the instructions of the class. Even if someone is distracted, [subject] asks to pay attention to the teacher."
    ]

    private static how_works_sentences = [
        "[Subject] works hard to understand how to develop [possessive] project and why the processes work that way.",
        "[Subject] has made an effort to learn the concepts we have worked on and the quality of [possessive] project is very good.",
        "When something is not clear to [object], [subject] asks insistently until [subject] understands and is able to do it for [object]self.",
        "[Subject] strives to understand things and connect them with [possessive] previous ideas.",
        "[Subject] works hard to achieve [possessive] team's goals, trying to understand why things are working or not.",
        "[Subject] works hard to achieve what [subject] proposes with [possessive] team.",
        "Sometimes [subject] prefers to explore than to fulfill what [subject] have proposed.",
        "[Subject] has fully achieved the objectives set for this term.",
        "[Subject] loves to be recognized and congratulated by [object] teachers and friends.",
        "[Subject] likes to express and tell what [subject] has done or discovered.",
        "Whenever we work on a new challenge or concept in class, [subject] pays a lot of attention and makes an effort to repeat it until [subject] can use it spontaneously.",
        "[Subject] works hard and loves being the first to finish with [possessive] team.",
        "Class by class, [subject] has more confidence to participate in the decisions of [possessive] team to achieve what [subject] propose.",
        "[Subject] has learned the concepts we have worked on in class and is able to use the vocabulary and to develop new solutions correctly.",
        "Understands everything that is asked of them and uses the right vocabulary and concepts during the activities"
    ]

    private static special_skills = [
        "[adition] [subject] has shown excellent teamwork skills: is patient with [possessive] friends, shows respect for the opinion of others and participates willingly in the project...",
        "[adition] [subject] has shown excellent communication skills.",
        "When something is not clear to [object], [subject] asks insistently until [subject] understands and is able to do it for [object]self.",
        "[adition] [subject] especially enjoys creating  [possessive] own prototypes.",
        "[adition] [subject] is really interested in learning how to code to get [possessive] robot moving.",
        "[adition] [subject] works hard to understand English and communicate in the language.",
        "[adition] [subject] likes to help [possessive] friends when they need it.",
        "[adition] [subject] is very respectful and kind.",
        "[adition] [subject] is very curious and questioning.",
        "[adition] [possessive] ability to concentrate and see details helps [object] do a spectacular job.",
        "[adition] [possessive] enthusiasm helps [object] do a great job.",
        "[adition] from [object] first classes, [name] has shown [object] leadership to help [possessive] team achieve what [subject] proposed.",
        "[adition] [subject] loves to be challenged with special missions.",
        "[adition] [subject] is able to concentrate and work well alone or in groups.",
        "[adition] [subject] can focus on activities and know when it's time to work and when to play."
    ]

    private static points_to_improve = [
        "[adversial] sometimes we have to remind [object] of the class rules so that [subject] can participate in a good way.",
        "[adversial] [name] is a funny student and likes to play and have fun with [possessive] friends. This often works against [name] as it tends to be distracting, leading to difficulties in completing activities on time.",
        "[adversial] [name] likes to work in a group but this often leads to a loss of focus, hindering [object] from showing all [possessive] knowledge. ",
        "[adversial] [name] is a little lost sometimes, we are trying to help [object] catch up with the tool.",
        "[Subject] has been a bit distracted this term and this fact has affected [possessive] performance",
        "[name] can easily use many of the concepts we've seen in class, but [subject] still needs help to be able to solve some complex challenges.",
        "[name] need to repeat some concepts and structures in order to be able to apply them more fluently in the proposed exercises.",
        "[Subject] is more interested in working on [possessive] own than in seeking the collaboration of the team to solve the proposed challenges."
    ]

    private static closure_sentences = [
        "Keep it up, [name]!",
        "We are happy to have you with us again this year, [name]!",
        "Well done, [name]!",
        "Great job, [name]!",
        "This term [subject] has been striving to solve the challenges correctly, good job!",
        "Excellent work, [name]!",
        "Try to focus more, [name], you do great!",
        "We know you have a lot to give, [name]!",
        "[subject] has done an excellent job this term and [possessive] progress is very good. Congratulations!", "Enjoy the summer break!"
    ]

    public static introduction() {
        return this.introduction_sentences
    }

    public static howWork() {
        return this.how_works_sentences
    }

    public static specialSkills() {
        return this.special_skills
    }

    public static pointToImprove() {
        return this.points_to_improve
    }

    public static closure() {
        return this.closure_sentences
    }

    public static get(key: keyof ReportingDataType) {
        switch (key) {
            case "introduction":
                return this.introduction()
            case "how_works":
                return this.howWork()
            case "special_skills":
                return this.specialSkills()
            case "point_to_improve":
                return this.pointToImprove()
            case "closure":
                return this.closure()
            default:
                return []
        }
    }
}