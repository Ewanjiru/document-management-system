const webdriver = require('selenium-webdriver');

const By = webdriver.By;
const until = webdriver.until;
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
describe('login form', function () {
  this.timeout(100000);

  it('simulates a click on create newdocument', (done) => {
    driver.navigate().to('http://localhost:8000/');
    driver.wait(until.elementLocated(By.name('signup')), 10000);
    driver.findElement(By.name('signup')).click()
      .then(() => done());
  });

  it('simulates a signup', (done) => {
    driver.findElement(By.name('firstName')).sendKeys('test');
    driver.findElement(By.name('lastName')).sendKeys('user');
    driver.findElement(By.name('email')).sendKeys('testuser@gmail.com');
    driver.findElement(By.name('password')).sendKeys('Qwerty@1234');
    driver.findElement(By.name('sign')).click()
      .then(() => done());
  });

  it('simulates a login', (done) => {
    driver.navigate().to('http://localhost:8000/');
    driver.findElement(By.name('email')).sendKeys('testuser@gmail.com');
    driver.findElement(By.name('password')).sendKeys('Qwerty@1234');
    driver.findElement(By.name('login')).click()
      .then(() => done());
  });

  it('simulates a click on create newdocument', (done) => {
    driver.wait(until.elementLocated(By.name('new')), 10000);
    driver.findElement(By.name('new')).click()
      .then(() => done());
  });

  it('simulates create newdocument', (done) => {
    driver.findElement(By.name('title')).sendKeys('e2e test document');
    driver.findElement(By.name('access')).sendKeys('public');
    driver.findElement(By.name('content')).sendKeys('this test document should go to the test db');
    driver.findElement(By.id('submit')).click()
      .then(() => done());
  });

  it('simulates a click on alldocuments', (done) => {
    driver.wait(until.elementLocated(By.name('view')), 10000);
    driver.findElement(By.name('view')).click()
      .then(() => done());
  });

  it('simulates search document', (done) => {
    driver.findElement(By.name('search')).sendKeys('e2e test document');
    const search = driver.wait(until.elementLocated(By.name('search')), 10000);
    search.click()
      .then(() => done());
  });

  it('simulates my documents click', (done) => {
    driver.wait(until.elementLocated(By.name('mine')), 10000);
    driver.findElement(By.name('mine')).click()
      .then(() => done());
  });

  it('simulates view document click', (done) => {
    driver.wait(until.elementLocated(By.name('viewdoc')), 10000);
    driver.findElement(By.name('viewdoc')).click()
      .then(() => done());
  });

  it('simulates view document click', (done) => {
    driver.wait(until.elementLocated(By.name('deletedoc')), 10000);
    driver.findElement(By.name('deletedoc')).click()
      .then(() => done());
  });

  it('simulates a logout', (done) => {
    driver.wait(until.elementLocated(By.className('glyphicon glyphicon-log-in')), 10000);
    driver.findElement(By.className('glyphicon glyphicon-log-in')).click()
      .then(() => done());
  });

  after(function (done) {
    driver.quit()
      .then(() => done());
  });
});
