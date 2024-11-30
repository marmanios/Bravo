-- Enums for various status types
CREATE TYPE emergency_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE emergency_status AS ENUM ('pending', 'active', 'resolved', 'cancelled');
CREATE TYPE responder_status AS ENUM ('available', 'dispatched', 'on_scene', 'returning');
CREATE TYPE responder_type AS ENUM ('police', 'fire', 'medical', 'traffic_control', 'hazmat', 'search_rescue');
CREATE TYPE unit_type AS ENUM ('ambulance', 'fire_engine', 'police_car', 'helicopter', 'hazmat_unit', 'swat', 'k9', 'motorcycle', 'tow_truck');

-- Main emergency call table
CREATE TABLE emergency_calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_id TEXT UNIQUE NOT NULL,
    caller_id UUID REFERENCES callers(id),
    emergency_type_id UUID REFERENCES emergency_types(id),
    priority emergency_priority NOT NULL,
    status emergency_status NOT NULL DEFAULT 'pending',
    location_id UUID REFERENCES locations(id),
    description TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Caller information
CREATE TABLE callers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    phone_number TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    medical_conditions TEXT[],
    previous_calls INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Location information with geocoding
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    building_type TEXT,
    access_notes TEXT,
    hazards TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(latitude, longitude)
);

-- Emergency types and their required resources
CREATE TABLE emergency_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    default_priority emergency_priority DEFAULT 'medium',
    required_responder_types responder_type[],
    minimum_units INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Response units (vehicles)
CREATE TABLE response_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_number TEXT NOT NULL UNIQUE,
    unit_type unit_type NOT NULL,
    status responder_status DEFAULT 'available',
    current_location_id UUID REFERENCES locations(id),
    station_id UUID REFERENCES stations(id),
    last_maintenance_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Emergency responders
CREATE TABLE responders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_number TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    responder_type responder_type NOT NULL,
    status responder_status DEFAULT 'available',
    certification_level TEXT,
    certifications TEXT[],
    station_id UUID REFERENCES stations(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Stations (base locations for units and responders)
CREATE TABLE stations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    station_type TEXT[],
    coverage_radius DECIMAL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Dispatch assignments
CREATE TABLE dispatch_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emergency_call_id UUID REFERENCES emergency_calls(id),
    unit_id UUID REFERENCES response_units(id),
    responder_id UUID REFERENCES responders(id),
    dispatched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    arrived_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    status responder_status NOT NULL DEFAULT 'dispatched',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Call transcript entries
CREATE TABLE transcript_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emergency_call_id UUID REFERENCES emergency_calls(id),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    speaker_type TEXT NOT NULL,  -- 'dispatcher', 'caller', 'system'
    content TEXT NOT NULL,
    ai_analysis JSONB,  -- Stores BRAVO's analysis
    confidence_score DECIMAL,
    highlight_type TEXT,  -- 'urgent', 'important', 'none'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Actions taken during emergency
CREATE TABLE emergency_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emergency_call_id UUID REFERENCES emergency_calls(id),
    action_type TEXT NOT NULL,
    description TEXT,
    performed_by UUID REFERENCES responders(id),
    performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    result TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_emergency_calls_status ON emergency_calls(status);
CREATE INDEX idx_emergency_calls_priority ON emergency_calls(priority);
CREATE INDEX idx_response_units_status ON response_units(status);
CREATE INDEX idx_responders_status ON responders(status);
CREATE INDEX idx_locations_coords ON locations(latitude, longitude);
CREATE INDEX idx_transcript_entries_call_id ON transcript_entries(emergency_call_id);

-- Function to update emergency_calls updated_at
CREATE OR REPLACE FUNCTION update_emergency_call_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to keep emergency_calls updated_at current
CREATE TRIGGER update_emergency_call_timestamp
    BEFORE UPDATE ON emergency_calls
    FOR EACH ROW
    EXECUTE FUNCTION update_emergency_call_timestamp();