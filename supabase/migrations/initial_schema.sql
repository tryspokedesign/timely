-- Create tables
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('employee', 'manager')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE project_assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, project_id)
);

CREATE TABLE time_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    hours NUMERIC(4,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read all users
CREATE POLICY "Users can read all users" ON users
    FOR SELECT USING (true);

-- Only managers can create projects
CREATE POLICY "Managers can create projects" ON projects
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'manager'
        )
    );

-- Managers can read all projects, employees can only read assigned projects
CREATE POLICY "Read projects access" ON projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND (
                users.role = 'manager'
                OR EXISTS (
                    SELECT 1 FROM project_assignments
                    WHERE project_assignments.project_id = projects.id
                    AND project_assignments.user_id = auth.uid()
                )
            )
        )
    );

-- Only managers can create project assignments
CREATE POLICY "Managers can manage project assignments" ON project_assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'manager'
        )
    );

-- Employees can read their project assignments
CREATE POLICY "Users can read their project assignments" ON project_assignments
    FOR SELECT USING (
        user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'manager'
        )
    );

-- Time logs policies
CREATE POLICY "Users can create their own time logs" ON time_logs
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read their own time logs" ON time_logs
    FOR SELECT USING (
        user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'manager'
        )
    );

CREATE POLICY "Users can update their own time logs" ON time_logs
    FOR UPDATE USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own time logs" ON time_logs
    FOR DELETE USING (user_id = auth.uid());

-- Insert some initial data
INSERT INTO users (id, name, role) VALUES
    ('00000000-0000-0000-0000-000000000001', 'John Manager', 'manager'),
    ('00000000-0000-0000-0000-000000000002', 'Alice Employee', 'employee'),
    ('00000000-0000-0000-0000-000000000003', 'Bob Employee', 'employee');

INSERT INTO projects (id, name, description, created_by) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Project Alpha', 'Our first major project', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000002', 'Project Beta', 'The sequel project', '00000000-0000-0000-0000-000000000001');

INSERT INTO project_assignments (user_id, project_id) VALUES
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002'); 