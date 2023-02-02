/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { BadRequestError } from "helpers/errorHandler";
import { logger } from "helpers/logger";

type TDecorator = (
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor,
) => void;

interface IValidators {
  validationFunction: (...params: any) => boolean;
  error: string;
  validateTo: boolean;
  options?: any;
}

export interface IValidationSchema {
  [x: string]: IValidators[];
}

function getErrors(schema: IValidationSchema, valuesToCheck: any) {
  const errors = Object.keys(schema).map((property) => {
    const errorMap = schema[property].map((eachValidator) => {
      let validationResult;
      if (eachValidator.options) {
        validationResult = eachValidator.validationFunction(
          valuesToCheck[property],
          eachValidator.options,
        );
      } else {
        validationResult = eachValidator.validationFunction(
          valuesToCheck[property],
        );
      }
      if (validationResult !== eachValidator.validateTo) {
        return {
          checkPerformed: eachValidator.validationFunction.name,
          error: eachValidator.error,
        };
      }
      return undefined;
    });
    const cleanUndefinedValues = errorMap.filter((_) => _ !== undefined);
    if (cleanUndefinedValues.length === 0) return undefined;
    return { property, errors: cleanUndefinedValues };
  });
  const cleanUndefinedValues = errors.filter((_) => _ !== undefined);
  if (cleanUndefinedValues.length === 0) return undefined;
  return { valuesToCheck, errors: cleanUndefinedValues };
}

export function ValidationDecorator(schema: IValidationSchema): TDecorator {
  return (_: unknown, _key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function doValidation(...args: any[]) {
      // pull graphql variables
      const valuesToCheck = args[0];

      const errors = getErrors(schema, valuesToCheck);
      if (errors) {
        logger.error(JSON.stringify(errors));
        throw new BadRequestError(
          `Validation error: ${JSON.stringify(errors)}`,
        );
      }
      return method.apply(this, args);
    };
    return descriptor;
  };
}
