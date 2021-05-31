# 3.1.0
- Support for Custom Products plugin

# 3.0.0
- Fix transaction versioning
- Update SDK

# 2.1.1
- Round amounts
- Redirect if the cart can not be recreated

# 2.1.0
- Fix email issues

# 2.0.0
- Fix cart recreation on promotions
- Remove availability rules
- Handle orders less than or equal to zero

# 1.4.3
- Silence missing order webhook errors
- Fix iframe breakout

# 1.4.2
- Fix payment method bug on first time install

# 1.4.1
- Fetch active payment methods only

# 1.4.0
- Fix payment method availability rule
- Fix email sending
- Cancel failed orders

# 1.3.0
- Update payment method syncing

# 1.2.0
- Add payment method availability rule
- Hardcoded system languages

# 1.1.27
- Retry orders on unavailable payment method

# 1.1.26
- Fix locales and translations

# 1.1.25
- Fix Email sending

# 1.1.24
- Fix webhook response
- Fix translation
- Prepare for Shopware 6.4

# 1.1.23
- Submit payment form when iframe has no fields

# 1.1.22
- Order invoice download setting

# 1.1.21
- Remove hardcoded Shopware API version

# 1.1.20
- Update webhook URLs on plugin update
- Add translations
- Fix email bug

# 1.1.19
- Allow customers to download order invoices

# 1.1.18
- Test against Shopware 6.3
- Fix error on invalid space id
- Remove hardcoded Shopware API version

# 1.1.17
- Use DAL on webhook locks

# 1.1.16
- Only provide translations for available languages
- Return CustomerCanceledAsyncPaymentException on cancelled transactions
- Update SDK to 2.1.1

# 1.1.15
- Send customer first name and last name from billing and shipping profiles
- Respect Shop URL

# 1.1.14
- Add cookies to the cookie manager
- Resize icon to 40px * 40px
- Fix line item attributes

# 1.1.13
- Include vendor folder in Shopware store releases

# 1.1.12
- Update doc path

# 1.1.11
- Add documentation

# 1.1.10
- Stop responding with server errors when orders are not found

# 1.1.9
- Put try catch on webhook install

# 1.1.8
- Remove unhelpful tickets info in release comments

# 1.1.7
- Implement promotions
- Code refactoring

# 1.1.6
- Disable sales channel selection on showcases
- Add product attributes to transaction payload

# 1.1.5
- Fix settings bug

# 1.1.4
- Disable changing credentials on the showcases

# 1.1.3
- Make line item consistency default
- Confirm transaction right away
- Update settings descriptions

# 1.1.2
- Prepare internal server side install for showcases and demos

# 1.1.1
- Stop default emails being sent
- Prettify payment page

# 1.1.0
- Handle empty/default Settings values
- Save refunds to db, and reload order tab on changes

# 1.0.0
- First version of the Wallee integrations for Shopware 6
