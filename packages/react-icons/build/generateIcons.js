const icons = require('./icons');
const path = require('path');
const nodePlop = require('node-plop');

const plop = nodePlop(path.resolve(__dirname, './generatorConfig.js'));
const pascalCase = plop.getHelper('pascalCase');
const kebabCase = plop.getHelper('kebabCase');

const allIcons = icons.fontAwesome.solid.map(getFontAwesomeIcon);

plop
  .getGenerator('icons')
  .runActions({ icons: allIcons })
  .catch(console.log); // eslint-disable-line

function getFontAwesomeIcon(name) {
  const faIconDef = require(`@fortawesome/free-solid-svg-icons/${name}`); // eslint-disable-line
  const iconName = kebabCase(name.substr(2)); // remove fa and make name kebab cased

  return {
    id: `${iconName}-icon`,
    name: pascalCase(`${iconName}-icon`),
    width: faIconDef.width,
    height: faIconDef.height,
    svgPath: faIconDef.svgPathData
  };
}
