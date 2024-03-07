# IBAN Checker

A simple web application to validate and identify International Bank Account Numbers (IBANs).

## Features

- Validates the length and format of the IBAN
- Uses the MOD97 algorithm for checksum validation
- Identifies three banks registered in estonia. LHV, Swedbank, SEB 
- In the next steps, I would plan to implement a test that verifies whether the first two characters are letters, which will determine the country code, followed by a check to ensure the IBAN is of the correct length specified for that country. Rewrite bank identifying logic to handle more than 3 banks and make it easy to add banks. 



