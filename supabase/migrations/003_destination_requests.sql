-- Destination demand and reader recommendations.
-- Records are private and may only be written by the server using service_role.

CREATE TABLE IF NOT EXISTS public.destination_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type TEXT NOT NULL CHECK (request_type IN ('city_request', 'place_recommendation')),
  city_name TEXT NOT NULL CHECK (char_length(city_name) BETWEEN 1 AND 120),
  normalized_city TEXT NOT NULL CHECK (char_length(normalized_city) BETWEEN 1 AND 120),
  place_name TEXT CHECK (place_name IS NULL OR char_length(place_name) <= 160),
  reason TEXT CHECK (reason IS NULL OR char_length(reason) <= 1200),
  email TEXT CHECK (email IS NULL OR char_length(email) <= 254),
  contact_consent BOOLEAN NOT NULL DEFAULT false,
  consent_at TIMESTAMPTZ,
  privacy_version TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'planned', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  CHECK (email IS NULL OR (contact_consent = true AND consent_at IS NOT NULL AND privacy_version IS NOT NULL))
);

ALTER TABLE public.destination_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.destination_requests FROM anon, authenticated;
GRANT ALL ON public.destination_requests TO service_role;

CREATE INDEX IF NOT EXISTS destination_requests_city_status_idx
  ON public.destination_requests (normalized_city, status, created_at DESC);
CREATE INDEX IF NOT EXISTS destination_requests_type_created_idx
  ON public.destination_requests (request_type, created_at DESC);
