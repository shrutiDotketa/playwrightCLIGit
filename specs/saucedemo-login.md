# Sauce Demo Login Flow - Test Plan

## Overview
Test plan for Swag Labs (Sauce Demo) login page at https://www.saucedemo.com/

### Test Environment
- **URL**: https://www.saucedemo.com/
- **Page Title**: Swag Labs
- **Available Test Users**: standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user
- **Password for All Users**: secret_sauce

---

## Login Page Elements
- **Username Field**: Input textbox with placeholder "Username"
- **Password Field**: Input textbox with placeholder "Password"
- **Login Button**: Clickable button labeled "Login"
- **Credentials Info Box**: Displays accepted usernames and password (visible on login page)

---

## Test Scenarios

### 1. Standard User Login Flow

#### 1.1 Successful Login with standard_user
**Preconditions:**
- User is on the Swag Labs login page
- Username field is empty
- Password field is empty

**Steps:**
1. Click on the Username field
2. Enter "standard_user"
3. Click on the Password field
4. Enter "secret_sauce"
5. Click the Login button
6. Wait for page transition

**Expected Assertions:**
- Login form disappears
- Page successfully navigates to the inventory page
- URL changes from `https://www.saucedemo.com/` to `https://www.saucedemo.com/inventory.html`
- Page title/header displays "Swag Labs" with inventory content visible
- Products list is displayed with items for purchase
- User session is established (user can see their login state)

---

### 2. Locked Out User Flow

#### 2.1 Login Attempt with locked_out_user
**Preconditions:**
- User is on the Swag Labs login page
- Username field is empty
- Password field is empty

**Steps:**
1. Click on the Username field
2. Enter "locked_out_user"
3. Click on the Password field
4. Enter "secret_sauce"
5. Click the Login button
6. Wait for error response

**Expected Assertions:**
- Login form remains visible on the page
- Error banner appears with message containing "locked out" or "account is locked"
- Error message text: "Epic sadface: Sorry, this user has been locked out."
- Error banner displays in red/prominent color
- Error message has a close button (X icon)
- Username field retains the entered value "locked_out_user"
- Password field is cleared or retains value (verify behavior)
- User is NOT redirected to inventory page

---

### 3. Empty Form Submission

#### 3.1 Submit with Empty Username and Empty Password
**Preconditions:**
- User is on the Swag Labs login page
- Both Username and Password fields are empty

**Steps:**
1. Leave Username field empty (no input)
2. Leave Password field empty (no input)
3. Click the Login button

**Expected Assertions:**
- Login form remains on the page
- Error banner appears on the form
- Error message text: "Epic sadface: Username is required"
- Error message displays in red/prominent color
- Error banner has a close button (X icon) to dismiss
- Both username and password fields remain empty
- User is NOT redirected to inventory page

---

### 4. Empty Username with Password

#### 4.1 Submit with Empty Username and Valid Password
**Preconditions:**
- User is on the Swag Labs login page
- Username field is empty
- Password field is empty

**Steps:**
1. Leave Username field empty (do not enter any value)
2. Click on the Password field
3. Enter "secret_sauce"
4. Click the Login button

**Expected Assertions:**
- Login form remains visible on the page
- Error banner appears
- Error message text: "Epic sadface: Username is required"
- Error message displays in red/prominent color
- Error message has a close button (X icon)
- Password field value is cleared (verify if retained or cleared)
- User is NOT redirected to inventory page

---

### 5. Empty Password with Username

#### 5.1 Submit with Valid Username and Empty Password
**Preconditions:**
- User is on the Swag Labs login page
- Username field is empty
- Password field is empty

**Steps:**
1. Click on the Username field
2. Enter "standard_user"
3. Leave Password field empty (do not enter any value)
4. Click the Login button

**Expected Assertions:**
- Login form remains visible on the page
- Error banner appears
- Error message text: "Epic sadface: Password is required" (or "Username and password do not match")
- Error message displays in red/prominent color
- Error message has a close button (X icon)
- Username field retains the value "standard_user"
- Password field remains empty
- User is NOT redirected to inventory page

---

### 6. Invalid Credentials

#### 6.1 Login Attempt with Invalid Username and Password
**Preconditions:**
- User is on the Swag Labs login page
- Username field is empty
- Password field is empty

**Steps:**
1. Click on the Username field
2. Enter "foo" (non-existent username)
3. Click on the Password field
4. Enter "bar" (incorrect password)
5. Click the Login button

**Expected Assertions:**
- Login form remains visible on the page
- Error banner appears
- Error message text: "Epic sadface: Username and password do not match any user in this service"
- Error message displays in red/prominent color
- Error message has a close button (X icon)
- Username field retains the value "foo"
- Password field is cleared or retains value (verify behavior)
- User is NOT redirected to inventory page

---

## Cross-Cutting Assertions

### All Login Failure Scenarios (2.1, 3.1, 4.1, 5.1, 6.1)
- Error banner contains:
  - Red background color (#e2231a or similar)
  - White text
  - Close button (X icon) with clickable functionality
  - Error message text positioned centrally in the banner
- Login button remains clickable after error
- Form fields are still accessible for modification after error
- Error message dismisses when close button is clicked
- URL remains at `https://www.saucedemo.com/` (no navigation occurs)

### Form Field Behaviors
- **Username Field**:
  - Accepts text input
  - Placeholder text visible when empty
  - Has visible focus state when selected
  - May have error indicator when validation fails
- **Password Field**:
  - Masks input characters with dots/asterisks
  - Accepts text input
  - Placeholder text visible when empty
  - Has visible focus state when selected
  - May have error indicator when validation fails
- **Login Button**:
  - Remains enabled in all states
  - Provides visual feedback on hover
  - Provides visual feedback on click/active state
  - Cursor changes to pointer on hover

---

## Test Data Summary

| Scenario | Username | Password | Expected Result |
|----------|----------|----------|-----------------|
| 1.1 | standard_user | secret_sauce | Login Success → Inventory Page |
| 2.1 | locked_out_user | secret_sauce | Error: User Locked Out |
| 3.1 | (empty) | (empty) | Error: Username Required |
| 4.1 | (empty) | secret_sauce | Error: Username Required |
| 5.1 | standard_user | (empty) | Error: Password Required |
| 6.1 | foo | bar | Error: Invalid Credentials |

---

## Notes for QA Execution

1. **Credentials to Avoid Real Submission**: Do not use the form submission as a means to permanently test login states without capturing page state first
2. **Error Message Consistency**: All error messages should follow the "Epic sadface:" format consistently
3. **Error Recovery**: After each error scenario, verify that the form resets properly for the next attempt
4. **Session Management**: Verify that each failed login attempt does not create unwanted session data
5. **Accessibility**: When testing, ensure error messages are readable and focused elements are clearly visible
6. **Browser Console**: Monitor browser console for any JavaScript errors during login attempts

---

## Related Tests (Out of Scope for This Plan)

- Multi-user login session management
- Login page load time performance
- Login form responsiveness on different screen sizes
- Password reset functionality
- Account lockout duration and reset
- Special character handling in credentials
- SQL injection and security testing
- Login rate limiting/brute force protection
