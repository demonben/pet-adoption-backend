CREATE TABLE IF NOT EXISTS animals(
    id            VARCHAR(36) DEFAULT(UUID()),
    nameAnimal          VARCHAR(200) NOT NULL,
    type         INT NOT NULL,
    created_date  DATE DEFAULT(CURRENT_DATE),
    PRIMARY KEY(id)
)