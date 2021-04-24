CREATE TABLE IF NOT EXISTS animals(
    id            VARCHAR(36) DEFAULT(UUID()),
    name_animal          VARCHAR(200) NOT NULL,
    type         VARCHAR(200),
    adoption_status VARCHAR(200),
    picture VARCHAR(200),
    height  VARCHAR(200),
    weight  VARCHAR(200),
    color   VARCHAR(200), 
    bio     VARCHAR(200),
    hypoallergenic VARCHAR(200),
    dietary_restrictions  VARCHAR(200),
    breed_of_animal   VARCHAR(200),
    created_date  DATE DEFAULT(CURRENT_DATE),
    PRIMARY KEY(id)
)