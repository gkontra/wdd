import shuffle from 'lodash/shuffle';

(() => {
  // === DOM & VARS ===
  const DOM = {};

  // === INIT =========

  const init = () => {
    console.log('init:', shuffle([1, 2, 3]));
  };

  // === EVENTS / XHR =======

  // === FUNCTIONS ====

  init();
})();
