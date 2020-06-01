import React, { createContext } from 'react';
import { I_FORM_FIELDS } from '../../type';

export const FormContext = createContext<Partial<I_FORM_FIELDS>>({});
FormContext.displayName = 'FormContext';
