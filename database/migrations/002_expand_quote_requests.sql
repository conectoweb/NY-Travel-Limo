ALTER TABLE quote_requests
  MODIFY trip_details VARCHAR(3000) NULL,
  ADD COLUMN pickup_date DATE NULL AFTER phone,
  ADD COLUMN pickup_time TIME NULL AFTER pickup_date,
  ADD COLUMN event_type VARCHAR(100) NULL AFTER pickup_time,
  ADD COLUMN vehicle VARCHAR(30) NULL AFTER event_type,
  ADD COLUMN passenger_count SMALLINT UNSIGNED NULL AFTER vehicle,
  ADD COLUMN stop_count SMALLINT UNSIGNED NULL AFTER passenger_count,
  ADD COLUMN pickup_place VARCHAR(200) NULL AFTER stop_count,
  ADD COLUMN dropoff_place VARCHAR(200) NULL AFTER pickup_place,
  ADD COLUMN service_hours SMALLINT UNSIGNED NULL AFTER dropoff_place,
  ADD COLUMN instructions VARCHAR(3000) NULL AFTER service_hours,
  ADD COLUMN consent TINYINT(1) NOT NULL DEFAULT 0 AFTER instructions;
