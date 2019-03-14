import React, { Component } from 'react';
import StaticUserData from '../data/StaticUserData'


const Button = (props) => {
  return (
    <button className="cont-onboarding" onClick={props.Listener}>
      <span className={props.Classes}></span>
    </button>
  );
}

const defCheckins = StaticUserData.getDefCheckins();

const INITIAL_STATE = {
  categories: StaticUserData.getDefCheckinCategories(),
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
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === true) {
          let checkin = defCheckins[i][j];
          checkin['visibility'] = StaticUserData.VIS_PRIVATE
          checkin['category'] = this.state.categories[i]
          checkins.push(checkin)
        }
      }
    }

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

      let categoryName = categories[ii];

      let button =
        <button onClick={() => this.changeOptions(ii)} className={categoryName}>
          {categoryName}
          <span className="jam jam-chevron-down"></span>
        </button>;

      if (showOptions[ii] === true) {
        // console.log(ii + ' is true')
        var arr = defCheckins[ii];
        var defCh = [];
        for (let j = 0; j < arr.length; j++) {
          let className = '';
          let item = arr[j];
          let tru = selectedCheckins != null ? selectedCheckins[ii][j] : false;

          if (tru) {
            className = 'ob-cat-opt selected'
          } else {
            className = 'ob-cat-opt'
          }

          let el = null;
          if (item.type == StaticUserData.QTYPE_TEXT) {
            el = (
              <span className="jam checkicon jam-write"></span>
            );
          }
          else if (item.type == StaticUserData.QTYPE_YESNO) {
            el = (
              <span className="jam checkicon jam-brightness"></span>
            );
          } else {
            el = (
              <span className="jam checkicon jam-ruler"></span>
            );
          }

          let onClick;
          if (this.props.onboarding == true) {
            onClick = () => {
              this.changeSelected(ii, j);
            }
          } else {
            onClick = () => {
              this.props.select(item, categoryName)
            }
          }

          defCh.push(<button 
          key = {ii+ '_'+j}
          className={className} 
          onClick={onClick}>
            {tru ? <span class="jam jam-check"></span> : null}
            {el}
            {item.q}
          </button>);
        }

        addEl = (
          <div 
          key = {ii+ '_'}
          className={"ob-cat " + categoryName}>
            {button}
            {defCh}
          </div>
        );
      }
      else {
        addEl = button;
      }
      checkins.push(addEl);
    }

    if (this.props.onboarding == false) {
      return (
        <div className="categories">
          {checkins}
        </div>
      );
    }

    return (
      <div className="page three">
        <h2>What would you like to check in about?</h2>
        <p>Select questions you'd like to be asked regularly.</p>
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