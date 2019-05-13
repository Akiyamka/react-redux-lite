function isCapitalize(string) {
  return string.slice(0, 1) === string.slice(0, 1).toUpperCase();
}

function camelToSnake(string) {
  return string.replace(
    /\.?([A-Z]+)/g,
    (x, y) => '_' + y)
    .replace(/^_/, ''
    ).toUpperCase();
}

const actionsQuestions = [{
  name: 'action',
  type: 'input',
  message: 'Action name:',
}];

module.exports = function (plop) {
  /* Plugins for inquirer */
  plop.inquirer.registerPrompt('recursive', require('inquirer-recursive'));

  /* Plugins for handlebars */
  plop.setHelper('upperSnackCase', txt => camelToSnake(txt));


  plop.setGenerator('component', {
    description: 'this is a skeleton component',
    prompts: [{
      name: 'componentName',
      type: 'input',
      message: 'How we name new component?',
      validate: input => isCapitalize(input) ? true : 'Component name must begin with capital letter'
    }, {
      name: 'componentType',
      type: 'list',
      message: 'What type of component you needed?',
      choices: [
        {
          name: 'UI component',
          value: 'ui'
        },
        {
          name: 'Business logic component',
          value: 'business'
        }]
    }],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{componentType}}/{{componentName}}/index.js',
        templateFile: 'plop-templates/component/{{componentType}}Component.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{componentType}}/{{componentName}}/style.styl',
        templateFile: 'plop-templates/component/style.hbs'
      },
    ]
  });

  plop.setGenerator('entity', {
    description: 'this is a skeleton entity',
    prompts: [
      {
        name: 'entityName',
        type: 'input',
        message: 'How we name new entity?',
      },
      {
        type: 'recursive',
        message: 'Add a more action?',
        name: 'actions',
        prompts: actionsQuestions
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/entities/{{entityName}}/api.js',
        templateFile: 'plop-templates/entity/api.hbs'
      },
      {
        type: 'add',
        path: 'src/entities/{{entityName}}/index.js',
        templateFile: 'plop-templates/entity/index.hbs'
      },
    ]
  });

};

