import { test } from 'qunit';
import { delay } from 'wherehows-web/utils/promise-delay';
import moduleForAcceptance from 'wherehows-web/tests/helpers/module-for-acceptance';
import {
  loginContainer,
  authenticationUrl,
  invalidCredentials,
  testUser,
  testPassword,
  testPasswordInvalid
} from 'wherehows-web/tests/helpers/login/constants';
import {
  loginUserInput,
  loginPasswordInput,
  loginSubmitButton
} from 'wherehows-web/tests/helpers/login/page-element-constants';

moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    visit(authenticationUrl);
  }
});

test('visiting /login', function(assert) {
  andThen(function() {
    assert.equal(currentURL(), authenticationUrl, `the current url is ${authenticationUrl}`);
  });
});

test('should render login form', function(assert) {
  assert.expect(4);

  andThen(() => {
    assert.equal(find(loginContainer).length, 1, 'should have a login form container');
    assert.equal(find('input[type=text]', loginContainer).length, 1, 'should have a username text input field');
    assert.equal(find('input[type=password]', loginContainer).length, 1, 'should have a password text input field');
    assert.equal(find('button[type=submit]', loginContainer).length, 1, 'should have a submit button');
  });
});

test('should display error message with empty credentials', async function(assert) {
  assert.expect(2);
  await fillIn(loginUserInput, testUser);
  await click('button[type=submit]');

  assert.ok(find('#login-error').text().length, 'error message element is rendered');

  assert.equal(
    find('#login-error')
      .text()
      .trim(),
    invalidCredentials
  );
});

test('Login with an empty password', async function(assert) {
  await fillIn(loginUserInput, testUser);
  await click(loginSubmitButton);

  assert.equal(
    find('#login-error')
      .text()
      .trim(),
    invalidCredentials
  );
});

test('Login with an invalid password', async function(assert) {
  await fillIn(loginUserInput, testUser);
  await fillIn(loginPasswordInput, testPasswordInvalid);
  await click(loginSubmitButton);

  assert.equal(
    find('#login-error')
      .text()
      .trim(),
    'Invalid Password'
  );
});
