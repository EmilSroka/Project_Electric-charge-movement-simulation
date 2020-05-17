import "babel-polyfill";
import css from './style.css';

import globalState from './general/state';
globalState.setValue('massFactor', 1);
globalState.setValue('fixedStep', false); 
globalState.setValue('fixedStepValue', 25);

import { Controller } from './controller';
new Controller().init();
