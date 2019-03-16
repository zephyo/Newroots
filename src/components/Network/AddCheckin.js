
import React from 'react';
import Dropdown from '../Misc/Dropdown';
import StaticUserData from '../../data/StaticUserData';
import OnboardingCategories from '../OnboardingCategories';
import SaveCancelHeader from '../Misc/SaveCancelHeader';
const visibleDefault = 2;

const INITIAL_STATE = {
  q: '',
  type: StaticUserData.QTYPE_TEXT,
  visibility: StaticUserData.getVisibility()[visibleDefault].text,
  category: '',
  showTemplateQuestions: false,
  typeSelect: 0,
  catSelect: 0,
  visSelect: visibleDefault,
  typeOptions: StaticUserData.getQuestionTypes(),
  visOptions: StaticUserData.getVisibility()
};

class AddCheckin extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setType = (type) => {
    this.setState({ type: type });
    for (let i = 0; i < this.state.typeOptions.length; i++) {
      if (this.state.typeOptions[i].text == type) {
        this.setState({ typeSelect: i });
      }
    }
  }

  setVisibility = (type) => {
    this.setState({ visibility: type });
    for (let i = 0; i < this.state.visOptions.length; i++) {
      if (this.state.visOptions[i].text == type) {
        this.setState({ visSelect: i });
      }
    }
  }

  setCategory = (type) => {
    this.setState({ category: type });
    for (let i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i] == type) {
        this.setState({ catSelect: i });
      }
    }
  }

  triggerTemplates = (e) => {
    e.preventDefault();
    this.setState({ showTemplateQuestions: !this.state.showTemplateQuestions });
  };

  selectTemplate = (template, category) => {
    this.setState({
      q: template.q,
      type: template.type,
      category: category,
      showTemplateQuestions: false
    })

    for (let i = 0; i < this.state.typeOptions.length; i++) {
      if (this.state.typeOptions[i].text == template.type) {
        this.setState({ typeSelect: i });
        console.log('set type state to ' + i);
      }
    }

    for (let i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i] == category) {
        this.setState({ catSelect: i });
      }
    }
  }

  onSubmit = () => {
    let cat = this.state.category;
    if (cat == StaticUserData.NULL_KEY) {
      cat = '';
    }
    this.props.setAddMode(false);
    this.props.addCheckin({
      q: this.state.q,
      type: this.state.type,
      visibility: this.state.visibility,
      category: cat
    });
  }

  onCancel = () => {
    this.props.setAddMode(false);
  }

  render() {
    const { q } = this.state;


    const isInvalid = q === '';


    let questionModule;
    if (this.state.showTemplateQuestions == true) {
      questionModule = (
        <div>
          <h3>
            <a href="#" onClick={this.triggerTemplates}>
              <span className="jam checkicon jam-chevron-left"></span>
            </a>
            Template questions</h3>
          <OnboardingCategories
            onboarding={false}
            select={this.selectTemplate}
          />
        </div>
      );
    } else {
      questionModule =
        (
          <div className="checkin-choice">
            <h3>
              <span className="jam checkicon jam-help"></span>
              Question</h3>
            <textarea
              id="check-in"
              name="q"
              placeholder="What'd you like to check in about?"
              value={q}
              onChange={this.onChange}>
            </textarea>
            <a href="#" onClick={this.triggerTemplates}>
              Template questions
        <span className="jam checkicon jam-arrow-right"></span>
            </a>
          </div>
        );
    }

    let categoriesAdjusted = [];

    categoriesAdjusted.push(
      {
        text: StaticUserData.NULL_KEY
      }
    );

    for (let i = 0; i < this.props.categories.length; i++) {
      categoriesAdjusted.push(
        {
          text: this.props.categories[i]
        }
      );
    }
    console.log(JSON.stringify(categoriesAdjusted));

    return (
      <div className="add-panel">
        <hr></hr>
        <h2>Add check-in</h2>

        {questionModule}

        <div className="checkin-choice">
          <h3>
            <span className="jam checkicon jam-info"></span>
            Question type
        </h3>
          <Dropdown
            options={this.state.typeOptions}
            onChange={this.setType}
            selected={this.state.typeSelect}
          ></Dropdown>
        </div>

        <div className="checkin-choice">
          <h3>
            <span className="jam checkicon jam-archive"></span>
            Category</h3>
          <Dropdown
            options={categoriesAdjusted}
            onChange={this.setCategory}
            selected={this.state.catSelect}
          ></Dropdown>
        </div>

        <div className="checkin-choice">
          <h3>
            <span className="jam checkicon jam-eye"></span>
            Visibility</h3>

          <Dropdown
            options={this.state.visOptions}
            onChange={this.setVisibility}
            selected={this.state.visSelect}
          ></Dropdown>
          <small>Who can see this?</small>
        </div>


        <SaveCancelHeader
          Cancel={this.onCancel}
          Save={this.onSubmit}
          disabled={isInvalid}
        />

      </div>
    );
  }
}


export default AddCheckin;