var hbs = require("hbs");

hbs.registerHelper("constructUpdate", function() {
  return `/todo/update/${this.id}`;
});

hbs.registerHelper("constructDelete", function() {
  return `/todos/delete/${this.id}?cadbury=DELETE`;
});

hbs.registerHelper("constructUpdateAPI", function() {
  return `/todos/update/${this.todo.id}?cadbury=PATCH`;
});
