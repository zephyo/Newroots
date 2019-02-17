import React, { Component } from 'react';

const Button = (props) => {
  return (
    <button className="cont-onboarding" onClick={props.Listener}>
      <span className={props.Classes}></span>
    </button>
  );
}

const defCheckins =
  [
    [
      {
        q: 'Have you made time to do something you love?',
        type: 'yes/no'
      },
      {
        q: 'How loving were you towards yourself?',
        type: 'range'
      },
      {
        q: 'What are you grateful for?',
        type: 'text'
      }
    ],
    [
      {
        q: 'Have you taken a deep breath today?',
        type: 'yes/no'
      },
      {
        q: 'Have you listened to relaxing music?',
        type: 'yes/no'
      },
      {
        q: 'Did you spend time in nature?',
        type: 'yes/no'
      }
    ],
    [
      {
        q: 'What was a memorable interaction from today?',
        type: 'text'
      },
      {
        q: 'Have you done something for someone else?',
        type: 'yes/no'
      }
    ],
    [
      {
        q: 'How overwhelmed do you feel?',
        type: 'range'
      },
      {
        q: 'Did you feel anxious about something?',
        type: 'yes/no'
      }
    ],
    [
      {
        q: 'How hydrated are you?',
        type: 'range'
      },
      {
        q: 'Have you stretched and moved your body?',
        type: 'yes/no'
      },
      {
        q: 'How was your sleep?',
        type: 'range'
      },
    ],
  ];

const INITIAL_STATE = {
  categories: [
    'mindful',
    'relaxation',
    'social',
    'stress',
    'physical'
  ],
  showOptions: [
    false,
    false,
    false,
    false,
    false,
  ],
  selectedCheckins: [
    [false, false, false],
    [false, false, false],
    [false, false],
    [false, false],
    [false, false, false],
  ]
};

class OnboardingCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }


  changeSelected = (i, j) => {
    let selected = this.state.selectedCheckins;
    selected[i][j] = !selected[i][j];
    this.setState({ selectedCheckins: selected })
  }

  changeOptions = (i) => {
    // console.log('i = ' + i);
    let arr = this.state.showOptions;
    arr[i] = !arr[i];
    this.setState({ showOptions: arr })
  }

  onSubmit = () => {
    const checkins = [], s = this.state.selectedCheckins;
    for (let i = 0; i < s.length; i++) {
      let arr = s[i];
      // console.log(JSON.stringify(arr));
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === true) {
          checkins.push(defCheckins[i][j])
        }
      }
    }

    // console.log(JSON.stringify(checkins));
    this.props.setCheckins(checkins);
    this.props.firebase
      .user(this.props.uid)
      .update({
        checkins: checkins
      }).then(() => {
        this.props.incrementPage();
      });
  }


  render() {

    let { categories, showOptions, selectedCheckins } = this.state;


    let checkins = [];

    for (let ii = 0; ii < showOptions.length; ii++) {

      let addEl;

      if (showOptions[ii] === true) {
        // console.log(ii + ' is true')
        var arr = defCheckins[ii];
        var defCh = [];
        for (let j = 0; j < arr.length; j++) {
          let className = '';
          let item = arr[j];
          let tru = selectedCheckins[ii][j];

          if (tru) {
            className = 'ob-cat-opt selected'
          } else {
            className = 'ob-cat-opt'
          }

          let el = null;
          if (item.type == 'text') {
            el = (
              <span className="jam checkicon jam-align-justify"></span>
            );
          }
          else if (item.type == 'yes/no') {
            el = (
              <span className="jam checkicon jam-brightness"></span>
            );
          } else {
            el = (
              <span className="jam checkicon jam-star"></span>
            );
          }

          defCh.push(<button className={className} onClick={() => {
            this.changeSelected(ii, j);

          }}>
            {tru ? <span class="jam jam-check"></span> : null}
            {el}
            {item.q}
          </button>);
        }

        addEl = (
          <div className="ob-cat">
            <button onClick={() => this.changeOptions(ii)}>
              {categories[ii]}
            </button>
            {defCh}
          </div>
        );
      }
      else {
        addEl = (
          <button onClick={() => this.changeOptions(ii)}>
            {categories[ii]}
          </button>
        );
      }
      checkins.push(addEl);
    }
    return (
      <div className="page three">
        <h2>What would you like to check in about?</h2>
        <div className="categories">
          {checkins}
        </div>

        <Button
          Listener={this.onSubmit}
          Classes="jam jam-check"
        />
      </div>


    );
  }
};

export default OnboardingCategories;