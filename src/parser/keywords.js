const keywords = {
  'variable-declaraction-var': { r: /(var\s)/, s: 'var' },
  'variable-declaration-let': { r: /(let\s)/, s: 'let' },
  'keyword-function-if': { r: /(if)/, s: 'if'},
  'keyword-function-while': { r: /(while)/, s: 'while'},
  'keyword-function-swich': { r:/(swich)/, s: 'swich'},
  'keyword-function-do': { r:/(do)/, s: 'do'},
  'constant-declaration' : { r: /(const\s)/, s: 'const'},
  'method-console-log': { r: /(log)/, s: 'log'},
  'object-class' : {r: /(this\s)/, s: 'this'},
  'console-object': { r: /(console)/, s: 'console' }
};

module.exports = keywords;