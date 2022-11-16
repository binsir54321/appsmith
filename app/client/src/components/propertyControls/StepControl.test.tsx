import StepControl from "./StepControl";

const requiredParams = {
  evaluatedValue: undefined,
  widgetProperties: undefined,
  parentPropertyName: "",
  parentPropertyValue: undefined,
  additionalDynamicData: {},
  label: "",
  propertyName: "",
  controlType: "",
  isBindProperty: false,
  isTriggerProperty: false,
};

const config = { ...requiredParams };

describe("StepControl.canDisplayValue", () => {
  it("Checks for true cases for default value of stepType", () => {
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 1)).toEqual(true);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 9)).toEqual(true);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 5)).toEqual(true);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 75)).toEqual(true);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 25)).toEqual(true);
  });

  it("Checks for false cases for default value of stepType", () => {
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, -4)).toEqual(false);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 105)).toEqual(false);
  });

  it("Checks for true cases for 'ZOOM_PERCENTAGE' value of stepType", () => {
    const config = { ...requiredParams, stepType: "ZOOM_PERCENTAGE" };
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 5)).toEqual(true);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 75)).toEqual(true);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 25)).toEqual(true);
  });

  it("Checks for false cases for 'ZOOM_PERCENTAGE' value of stepType", () => {
    const config = { ...requiredParams, stepType: "ZOOM_PERCENTAGE" };
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 1)).toEqual(false);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 9)).toEqual(false);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, -4)).toEqual(false);
    //tb  // @ts-expect-error: config does not have all keys
    expect(StepControl.canDisplayValueInUI(config, 105)).toEqual(false);
  });
});
