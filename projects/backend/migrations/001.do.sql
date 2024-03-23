CREATE TABLE share (
  id SERIAL PRIMARY KEY,
  shareId VARCHAR(36) NOT NULL UNIQUE,
  sharedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  sharedBy VARCHAR(100) NOT NULL,
  filters JSONB NOT NULL,
  sharedContent JSONB NOT NULL
);

CREATE INDEX shareId_index ON share (shareId);