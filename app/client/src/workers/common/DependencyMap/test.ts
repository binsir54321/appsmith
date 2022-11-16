import DataTreeEvaluator from "workers/common/DataTreeEvaluator";
import {
  unEvalTree,
  unEvalTreeWidgetSelectWidget,
} from "workers/common/DataTreeEvaluator/mockData/mockUnEvalTree";
import ButtonWidget, {
  CONFIG as BUTTON_WIDGET_CONFIG,
} from "widgets/ButtonWidget";
import SelectWidget, {
  CONFIG as SELECT_WIDGET_CONFIG,
} from "widgets/SelectWidget";
import { DataTree } from "entities/DataTree/dataTreeFactory";

const widgetConfigMap = {};

[
  [ButtonWidget, BUTTON_WIDGET_CONFIG],
  [SelectWidget, SELECT_WIDGET_CONFIG],
].map(([, config]) => {
  //tb  // @ts-expect-error: Types are not available
  if (config.type && config.properties) {
    //tb  // @ts-expect-error: Types are not available
    widgetConfigMap[config.type] = {
      //tb  // @ts-expect-error: properties does not exists
      defaultProperties: config.properties.default,
      //tb  // @ts-expect-error: properties does not exists
      derivedProperties: config.properties.derived,
      //tb  // @ts-expect-error: properties does not exists
      metaProperties: config.properties.meta,
    };
  }
});

const dataTreeEvaluator = new DataTreeEvaluator(widgetConfigMap);

describe("test validationDependencyMap", () => {
  beforeAll(() => {
    dataTreeEvaluator.setupFirstTree(
      (unEvalTreeWidgetSelectWidget as unknown) as DataTree,
    );
    dataTreeEvaluator.evalAndValidateFirstTree();
  });

  it("initial validation dependencyMap computation", () => {
    expect(dataTreeEvaluator.validationDependencyMap).toStrictEqual({
      "Select2.defaultOptionValue": [
        "Select2.serverSideFiltering",
        "Select2.options",
      ],
    });
  });

  it("update validation dependencyMap computation", () => {
    const {
      evalOrder,
      nonDynamicFieldValidationOrder,
    } = dataTreeEvaluator.setupUpdateTree((unEvalTree as unknown) as DataTree);
    dataTreeEvaluator.evalAndValidateSubTree(
      evalOrder,
      nonDynamicFieldValidationOrder,
    );

    expect(dataTreeEvaluator.validationDependencyMap).toStrictEqual({});
  });
});
