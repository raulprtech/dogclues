-- Launch foundation: private subscriptions and data-quality operations.
-- Sanity is the source of truth for editorial content. Legacy editorial tables from
-- migration 001 remain untouched to preserve migration history.

ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'subscribed'
    CHECK (status IN ('subscribed', 'unsubscribed', 'pending')),
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS privacy_version TEXT,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS beehiiv_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.newsletter_subscribers FROM anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

CREATE TABLE IF NOT EXISTS public.source_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('editorial', 'business', 'public', 'partner')),
  canonical_url TEXT,
  license_or_terms TEXT,
  owner_contact TEXT,
  refresh_frequency TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.content_quality_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  check_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'passed', 'failed', 'waived')),
  checked_by UUID,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  checked_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (entity_type, entity_id, check_type)
);

CREATE TABLE IF NOT EXISTS public.data_import_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.source_registry(id) ON DELETE RESTRICT,
  status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed', 'rolled_back')),
  records_seen INTEGER NOT NULL DEFAULT 0,
  records_accepted INTEGER NOT NULL DEFAULT 0,
  records_rejected INTEGER NOT NULL DEFAULT 0,
  schema_version TEXT NOT NULL,
  error_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  CHECK (records_seen >= records_accepted + records_rejected)
);

ALTER TABLE public.source_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_quality_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_import_runs ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.source_registry, public.content_quality_checks, public.data_import_runs FROM anon, authenticated;
GRANT ALL ON public.source_registry, public.content_quality_checks, public.data_import_runs TO service_role;

CREATE INDEX IF NOT EXISTS content_quality_entity_idx
  ON public.content_quality_checks (entity_type, entity_id, status);
CREATE INDEX IF NOT EXISTS data_import_source_started_idx
  ON public.data_import_runs (source_id, started_at DESC);
