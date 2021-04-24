CREATE TABLE IF NOT EXISTS dima(
    id                VARCHAR(36) DEFAULT(UUID()),
    mail              VARCHAR(200) ,
    password          VARCHAR(200) NOT NULL,
    first_name        VARCHAR(200),
    last_name         VARCHAR(200),
    phone_number      INT NOT NULL,
    PRIMARY KEY(id)
)