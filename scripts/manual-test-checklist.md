# Manual Form Testing Checklist

Use this checklist to manually test all forms in your dev environment before pushing schema changes to Supabase.

## Prerequisites
- [ ] Dev server running (`pnpm dev`)
- [ ] All environment variables set in `.env.local`
- [ ] Database connection working
- [ ] Stripe test keys configured

## 1. Contact Form Testing (`/contact`)

### Basic Functionality
- [ ] Form loads without errors
- [ ] All fields are visible and properly labeled
- [ ] Required fields are marked with asterisks
- [ ] Email validation works (try invalid emails)
- [ ] Subject dropdown shows all options
- [ ] Message textarea has proper character limits

### Form Submission
- [ ] Submit with valid data → Success message appears
- [ ] Submit with missing required fields → Error messages appear
- [ ] Submit with invalid email → Error message appears
- [ ] Submit with short message (< 10 chars) → Error message appears
- [ ] Submit with long name (> 120 chars) → Error message appears
- [ ] Form resets after successful submission
- [ ] Check email is received at `steve@ceceriforma.com`

### Rate Limiting
- [ ] Submit 5 forms quickly → All succeed
- [ ] Submit 6th form within 1 minute → Rate limit error appears
- [ ] Wait 1 minute and submit again → Succeeds

### Honeypot Testing
- [ ] Fill out hidden "website" field → Form appears to succeed but no email sent
- [ ] Leave honeypot empty → Form works normally

## 2. Volunteer Form Testing (`/volunteer`)

### Basic Functionality
- [ ] Form loads without errors
- [ ] All fields are visible and properly labeled
- [ ] Checkboxes for volunteer tasks work correctly
- [ ] Multiple tasks can be selected
- [ ] Form validation works for required fields

### Form Submission
- [ ] Submit with valid data → Success message appears
- [ ] Submit with missing name/email → Error occurs
- [ ] Submit with invalid email → Error occurs
- [ ] Submit with no tasks selected → Form accepts (optional field)
- [ ] Form resets after successful submission
- [ ] Check database for new volunteer record

### Data Validation
- [ ] Phone number accepts various formats
- [ ] Availability field accepts long text
- [ ] Message field accepts long text
- [ ] Email validation works properly

## 3. Donation Form Testing (`/donate`)

### Basic Functionality
- [ ] Form loads without errors
- [ ] Preset amount buttons work ($25, $50, $100, $250)
- [ ] Custom amount field works
- [ ] Amount validation works (min $1, max $1000)
- [ ] Required fields show for donations ≥ $200

### Amount Selection
- [ ] Click preset amounts → Custom amount clears
- [ ] Enter custom amount → Preset buttons deselect
- [ ] Try amount < $1 → Error message appears
- [ ] Try amount > $1000 → Error message appears
- [ ] Try amount = $0 → Error message appears

### Form Fields
- [ ] Name and email always required
- [ ] Address fields appear for donations ≥ $200
- [ ] Occupation/employer fields appear for donations ≥ $200
- [ ] All fields validate properly

### Stripe Integration
- [ ] Submit valid donation → Redirects to Stripe checkout
- [ ] Check Stripe session metadata includes donor info
- [ ] Test with Stripe test card numbers
- [ ] Cancel checkout → Returns to donation page
- [ ] Complete payment → Redirects to success page

### Error Handling
- [ ] Submit without Stripe key → Error message appears
- [ ] Submit with invalid amount → Error message appears
- [ ] Network errors → Proper error handling

## 4. Database Integration Testing

### Volunteer Data
- [ ] Check Supabase dashboard for new volunteer records
- [ ] Verify all fields are saved correctly
- [ ] Check timestamps are set properly
- [ ] Verify email index exists for performance

### Donation Data
- [ ] Check Stripe dashboard for successful payments
- [ ] Verify session metadata is complete
- [ ] Check donation amounts are correct
- [ ] Verify donor information is captured

## 5. Cross-Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Mobile form layouts work properly
- [ ] Touch interactions work correctly

## 6. Performance Testing

### Load Testing
- [ ] Forms load quickly (< 2 seconds)
- [ ] No console errors
- [ ] No network errors
- [ ] Images and assets load properly

### Submission Testing
- [ ] Form submissions complete within 5 seconds
- [ ] No timeout errors
- [ ] Success/error messages appear promptly
- [ ] No duplicate submissions

## 7. Accessibility Testing

### Keyboard Navigation
- [ ] All form fields accessible via Tab key
- [ ] Enter key submits forms
- [ ] Escape key closes modals/dropdowns
- [ ] Focus indicators are visible

### Screen Reader Support
- [ ] Form labels are properly associated
- [ ] Error messages are announced
- [ ] Success messages are announced
- [ ] Required fields are indicated

## 8. Security Testing

### Input Validation
- [ ] XSS attempts are blocked
- [ ] SQL injection attempts are blocked
- [ ] File upload attempts are blocked
- [ ] Special characters are handled properly

### CSRF Protection
- [ ] Forms include CSRF tokens (if applicable)
- [ ] Cross-origin requests are blocked
- [ ] SameSite cookies are set properly

## 9. Environment-Specific Testing

### Development Environment
- [ ] All forms work with dev database
- [ ] Test emails are sent to dev email
- [ ] Stripe test mode works correctly
- [ ] Console logs show proper debugging info

### Production Readiness
- [ ] Environment variables are set correctly
- [ ] Database connections use production URLs
- [ ] Email configuration uses production settings
- [ ] Stripe keys are production-ready

## 10. Final Verification

### Schema Compatibility
- [ ] All form fields match database schema
- [ ] Data types are compatible
- [ ] Required fields are properly constrained
- [ ] Indexes exist for performance

### Migration Readiness
- [ ] Current schema is documented
- [ ] Migration scripts are ready
- [ ] Rollback plan exists
- [ ] Backup strategy is in place

## Test Results Summary

- [ ] All tests passed
- [ ] Issues found and documented
- [ ] Ready for schema migration
- [ ] Production deployment checklist completed

---

**Notes:**
- Test with real data when possible
- Document any issues found
- Verify error handling works as expected
- Check that all integrations are working
- Ensure responsive design works on all devices 