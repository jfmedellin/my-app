/# Login Module Test Plan

## Application Overview

This test plan covers the login module functionality of the application. The login page is located at /testing/login and includes form validation, error handling, and success scenarios. The tests verify both successful authentication and failed login attempts with invalid credentials.

## Test Scenarios

### 1. Login Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login - Happy Path

**File:** `tests/login/successful-login.spec.ts`

**Steps:**
  1. Verify the login form is displayed with data-testid 'login-form'
    - expect: The login form should be visible with all required fields
  2. Locate and verify the username input field using data-testid 'login-username-input'
    - expect: The username input field should be visible and empty
  3. Locate and verify the password input field using data-testid 'login-password-input'
    - expect: The password input field should be visible and empty
  4. Verify the submit button exists with data-testid 'login-submit-btn'
    - expect: The submit button should be visible and enabled
  5. Enter 'qa_tester' into the username input using data-testid 'login-username-input'
    - expect: Type 'qa_tester' into the username input field
  6. Enter 'password123' into the password input using data-testid 'login-password-input'
    - expect: Type 'password123' into the password input field
  7. Click the submit button using data-testid 'login-submit-btn'
    - expect: Click the submit button to attempt login
  8. Wait for and verify the success overlay appears with data-testid 'login-success-overlay'
    - expect: The success overlay should be visible after successful login
  9. Verify the success modal appears with data-testid 'login-success-modal'
    - expect: The success modal should be visible
  10. Verify the close button exists with data-testid 'login-success-close-btn'
    - expect: The success modal should contain a close button

#### 1.2. Failed Login - Invalid Credentials

**File:** `tests/login/failed-login.spec.ts`

**Steps:**
  1. Verify the login form is displayed with data-testid 'login-form'
    - expect: The login form should be visible with all required fields
  2. Locate and verify the username input field using data-testid 'login-username-input'
    - expect: The username input field should be visible and empty
  3. Locate and verify the password input field using data-testid 'login-password-input'
    - expect: The password input field should be visible and empty
  4. Verify the submit button exists with data-testid 'login-submit-btn'
    - expect: The submit button should be visible and enabled
  5. Enter 'wrong_user' into the username input using data-testid 'login-username-input'
    - expect: Type invalid username into the username input field
  6. Enter 'wrong_password' into the password input using data-testid 'login-password-input'
    - expect: Type invalid password into the password input field
  7. Click the submit button using data-testid 'login-submit-btn'
    - expect: Click the submit button to attempt login with invalid credentials
  8. Wait for and verify the error message appears with data-testid 'login-error-message'
    - expect: An error message should be displayed
  9. Verify the error message element is visible and contains error text
    - expect: The error message should be visible and contain error text
  10. Verify the success overlay with data-testid 'login-success-overlay' is NOT displayed
    - expect: The success overlay should NOT be visible
  11. Verify the success modal with data-testid 'login-success-modal' is NOT displayed
    - expect: The success modal should NOT be visible
