ALTER TABLE quote_requests
  ADD COLUMN authorize_customer_profile_id VARCHAR(20) NULL AFTER consent,
  ADD COLUMN authorize_payment_profile_id VARCHAR(20) NULL AFTER authorize_customer_profile_id;
