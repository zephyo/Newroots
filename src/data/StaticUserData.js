
import React from 'react';


class StaticUserData extends React.Component {
  constructor() { }

  static NULL_KEY = 'Select..';
  static FEMALE_PRONOUN = 'She / her';
  static MALE_PRONOUN = 'He / him';
  static NON_PRONOUN = 'They / them';

  static allPronouns = {};

  static QTYPE_TEXT = 'Text';
  static QTYPE_YESNO = 'Yes/No';
  static QTYPE_SCALE = 'Scale';

  static VIS_PUBLIC = 'Anyone';
  static VIS_NETWORK = 'My Network';
  static VIS_PRIVATE = 'Only Me';

  static getQuestionTypes() {
    return [
      {
        icon: 'write',
        text: StaticUserData.QTYPE_TEXT
      },
      {
        icon: 'brightness',
        text: StaticUserData.QTYPE_YESNO
      },
      {
        icon: 'ruler',
        text: StaticUserData.QTYPE_SCALE
      },
    ]
  }

  static getVisibility() {
    return [
      {
        icon: 'world',
        text: StaticUserData.VIS_PUBLIC
      },
      {
        icon: 'users',
        text: StaticUserData.VIS_NETWORK
      },
      {
        icon: 'padlock',
        text: StaticUserData.VIS_PRIVATE
      },
    ]
  }

  static getDaysOfWeek() {
    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  }

  static getDefaultData = (name, lastName, email) => {
    const data =
    {
      name: name + ' ' + lastName,
      easy_name: name.toLowerCase(),
      email: email,
      network: [],
      requests: [],
      checkinCategories: StaticUserData.getDefCheckinCategories(),
      checkinFreq: [true, true, true, true, true, true, true],
      checkins: [],
      PpfURL: null
    };
    return data;
  }

  static getMiscCategory() {
    return 'Misc';
  }

  static getDefCheckinCategories() {
    return [
      'Mindful',
      'Relaxation',
      'Social',
      'Stress',
      'Physical'
    ];
  }

  static commentPlaceholder = () => "Comment..";

  static getDefCheckins() {
    return [
      [
        {
          q: 'Have you made time to do something you love?',
          type: StaticUserData.QTYPE_YESNO
        },
        {
          q: 'How loving were you towards yourself?',
          type: StaticUserData.QTYPE_SCALE
        },
        {
          q: 'What are you grateful for?',
          type: StaticUserData.QTYPE_TEXT
        }
      ],
      [
        {
          q: 'Have you taken a deep breath today?',
          type: StaticUserData.QTYPE_YESNO
        },
        {
          q: 'Have you listened to relaxing music?',
          type: StaticUserData.QTYPE_YESNO
        },
        {
          q: 'Did you spend time in nature?',
          type: StaticUserData.QTYPE_YESNO
        }
      ],
      [
        {
          q: 'What was a memorable interaction from today?',
          type: StaticUserData.QTYPE_TEXT
        },
        {
          q: 'Have you done something for someone else?',
          type: StaticUserData.QTYPE_YESNO
        }
      ],
      [
        {
          q: 'How overwhelmed do you feel?',
          type: StaticUserData.QTYPE_SCALE
        },
        {
          q: 'Did you feel anxious about something?',
          type: StaticUserData.QTYPE_YESNO
        }
      ],
      [
        {
          q: 'How hydrated are you?',
          type: StaticUserData.QTYPE_SCALE
        },
        {
          q: 'Have you stretched and moved your body?',
          type: StaticUserData.QTYPE_YESNO
        },
        {
          q: 'How was your sleep?',
          type: StaticUserData.QTYPE_SCALE
        },
      ],
    ];
  }
}





StaticUserData.allPronouns[StaticUserData.NULL_KEY] =
  {
    text: StaticUserData.NULL_KEY,
    icon: 'help',
    index: 0
  };

StaticUserData.allPronouns[StaticUserData.FEMALE_PRONOUN] =
  {
    text: StaticUserData.FEMALE_PRONOUN,
    icon: 'female',
    index: 1
  };

StaticUserData.allPronouns[StaticUserData.MALE_PRONOUN] =
  {
    text: StaticUserData.MALE_PRONOUN,
    icon: 'male',
    index: 2
  };

StaticUserData.allPronouns[StaticUserData.NON_PRONOUN] =
  {
    text: StaticUserData.NON_PRONOUN,
    icon: 'triangle',
    index: 3
  };


export default StaticUserData;