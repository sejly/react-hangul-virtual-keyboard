import React from "react";
import Keyboard from "../lib";
import Hangul from "hangul-js";
import "./css/App.css";

let buttonArray = [];
let inputText = "";

class App extends React.Component {
  state = {
    input: "",
    layoutName: "default",
    language: "default",
    buttonTheme: []
  };

  keyboard = React.createRef();

  onChange = input => {
    this.setState({ input }, () => console.log("Input changed", inputText));
    console.log("inputText", inputText);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);
    if (
      ![
        "{shift}",
        "{language}",
        "{enter}",
        "{bksp}",
        "{space}",
        "{tab}"
      ].includes(button)
    ) {
      buttonArray.push(button);
    }
    if (button === "{bksp}") {
      buttonArray.pop();
    }
    if (button === "{space}") {
      buttonArray.push(" ");
    }
    if (button === "{tab}") {
      buttonArray.push("  ");
    }

    inputText = Hangul.assemble(buttonArray);

    /**
     * Shift functionality
     */
    if (button === "{shift}") this.handleShiftButton();
    if (button === "{language}") this.handleLanguageButton();
  };

  handleShiftButton = () => {
    const {
      state: { layoutName }
    } = this;
    const shiftToggle = layoutName === "default" ? "shift" : "default";

    this.setState({ layoutName: shiftToggle });
  };

  handleLanguageButton() {
    console.log("here");
    const {
      state: { language }
    } = this;
    const languageToggle = language === "default" ? "english" : "default";

    this.setState({ language: languageToggle });
  }

  onChangeInput = event => {
    const input = event.target.value;

    this.setState({ input: event.target.value }, () =>
      this.keyboard.setInput(input)
    );
  };

  render() {
    const {
      state: { input, layoutName, language, buttonTheme },
      onChangeInput,
      onChange,
      onKeyPress
    } = this;

    return (
      <div className="demoPage">
        <div className="screenContainer">
          <textarea
            className="inputContainer"
            value={inputText}
            onChange={onChangeInput}
          />
        </div>
        <Keyboard
          stateToIgnore={input}
          keyboardRef={r => (this.keyboard = r)}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layoutName={layoutName}
          language={language}
          buttonTheme={buttonTheme}
          newLineOnEnter
          physicalKeyboardHighlight
          debug
        />
      </div>
    );
  }
}

export default App;
