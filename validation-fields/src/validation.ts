import {
  requiredMessage,
  minLengthMessage,
  numericMessage,
  minMessage,
  maxMessage,
  validEmailMessage,
} from "./messages";

type Output<T> = {
  [P in keyof T]: string[];
};

interface Fields {
  [index: string]: string;
}

interface Rules {
  [index: string]: Function[] | IRule[];
}

interface IRule {
  validator: (value: any) => boolean;
  message: (value: string) => string;
}
type FunctionIRule = (value: number) => IRule;

function validate(data: Fields, rules: Rules) {
  const errors: Output<Fields> = {};
  Object.keys(rules).forEach((key) => {
    if (!errors[key]) {
      errors[key] = [];
    }
    rules[key].forEach((rule: any) => {
      if (!rule.validator(data[key])) {
        errors[key].push(rule.message(key));
      }
    });
  });

  return errors;
}

const required: IRule = {
  validator: (value: string) => value !== "",
  message: (fieldName: string) => requiredMessage(fieldName),
};
const validEmail: IRule = {
  validator: (value: string) => /@/.test(value),
  message: (fieldName: string) => validEmailMessage(fieldName),
};
const numeric: IRule = {
  validator: (value: string) => /^\d+$/.test(value),
  message: (fieldName: string) => numericMessage(fieldName),
};
const minLength: FunctionIRule = (min: number) => ({
  validator: (value: string) => value.length >= min,
  message: (fieldName: string) => minLengthMessage(fieldName, min),
});
const min: FunctionIRule = (min: number) => ({
  validator: (value: number) => {
    if (+value < 0 || isNaN(+value)) {
      return true;
    } else {
      return +value >= min;
    }
  },
  message: (fieldName: string) => minMessage(fieldName, min),
});
const max: FunctionIRule = (max: number) => ({
  validator: (value: number) => {
    if (+value === 0) {
      return false;
    } else if (isNaN(+value)) {
      return true;
    } else {
      return +value <= max;
    }
  },
  message: (fieldName: string) => maxMessage(fieldName, max),
});

export { required, minLength, numeric, min, max, validEmail, validate };
