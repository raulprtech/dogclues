-- Anonymous destination demand and private business applications.

CREATE TABLE IF NOT EXISTS public.destination_demand_daily (
  demand_date DATE NOT NULL DEFAULT current_date,
  normalized_destination TEXT NOT NULL CHECK (char_length(normalized_destination) BETWEEN 1 AND 120),
  matched_city_slug TEXT NOT NULL DEFAULT 'unmatched',
  coverage_status TEXT NOT NULL CHECK (coverage_status IN ('planned', 'unknown')),
  source TEXT NOT NULL DEFAULT 'website',
  searches INTEGER NOT NULL DEFAULT 1 CHECK (searches > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (demand_date, normalized_destination, matched_city_slug, coverage_status, source)
);

ALTER TABLE public.destination_demand_daily ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.destination_demand_daily FROM anon, authenticated;
GRANT ALL ON public.destination_demand_daily TO service_role;

CREATE OR REPLACE FUNCTION public.increment_destination_demand(
  destination_name TEXT,
  city_slug TEXT,
  coverage TEXT,
  demand_source TEXT
) RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.destination_demand_daily (
    normalized_destination, matched_city_slug, coverage_status, source
  ) VALUES (
    destination_name, city_slug, coverage, demand_source
  )
  ON CONFLICT (demand_date, normalized_destination, matched_city_slug, coverage_status, source)
  DO UPDATE SET searches = destination_demand_daily.searches + 1, updated_at = now();
$$;

REVOKE ALL ON FUNCTION public.increment_destination_demand(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_destination_demand(TEXT, TEXT, TEXT, TEXT) TO service_role;

CREATE OR REPLACE VIEW public.destination_demand_summary
WITH (security_invoker = true)
AS
SELECT
  normalized_destination,
  matched_city_slug,
  coverage_status,
  sum(searches)::BIGINT AS total_searches,
  max(updated_at) AS last_interest_at
FROM public.destination_demand_daily
GROUP BY normalized_destination, matched_city_slug, coverage_status;

REVOKE ALL ON public.destination_demand_summary FROM anon, authenticated;
GRANT SELECT ON public.destination_demand_summary TO service_role;

CREATE TABLE IF NOT EXISTS public.business_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  city_name TEXT NOT NULL,
  normalized_city TEXT NOT NULL,
  region_name TEXT,
  address TEXT NOT NULL,
  website TEXT,
  instagram TEXT,
  category TEXT,
  chef_background TEXT,
  opening_hours TEXT NOT NULL,
  reason TEXT,
  ownership_confirmed BOOLEAN NOT NULL DEFAULT false,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  privacy_version TEXT NOT NULL,
  consent_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN (
    'submitted', 'pre_screening', 'eligible', 'researching', 'visited',
    'editorial_review', 'selected', 'not_selected', 'closed'
  )),
  response_status TEXT NOT NULL DEFAULT 'pending' CHECK (response_status IN (
    'pending', 'acknowledged', 'follow_up', 'closed'
  )),
  internal_visit_window_start DATE,
  internal_visit_window_end DATE,
  acknowledged_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (ownership_confirmed = true AND terms_accepted = true),
  CHECK (
    internal_visit_window_start IS NULL OR internal_visit_window_end IS NULL
    OR internal_visit_window_start <= internal_visit_window_end
  )
);

ALTER TABLE public.business_applications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.business_applications FROM anon, authenticated;
GRANT ALL ON public.business_applications TO service_role;

CREATE INDEX IF NOT EXISTS business_applications_status_city_idx
  ON public.business_applications (status, normalized_city, created_at DESC);
CREATE INDEX IF NOT EXISTS business_applications_response_idx
  ON public.business_applications (response_status, created_at DESC);
