/* eslint-disable func-names */
import { PurgeManager } from './PurgeManager';

global.process = function (event) {
  const purgeManager = new PurgeManager();
  purgeManager.processPurge(event);
};
