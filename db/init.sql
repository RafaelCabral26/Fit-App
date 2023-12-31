USE fitdb;
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` CHAR(36) BINARY NOT NULL UNIQUE ,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `active` TINYINT(1) DEFAULT true,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`user_id`));

CREATE TABLE IF NOT EXISTS `trainers` (
    `trainer_id` CHAR(36) BINARY NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `active` TINYINT(1) DEFAULT true,
    `trainer_clients` JSON,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`trainer_id`));

CREATE TABLE IF NOT EXISTS `exercises_samples` (
    `exercise_id` CHAR(36) BINARY UNIQUE ,
    `exercise_name` VARCHAR(255) NOT NULL UNIQUE,
    `muscle_group` VARCHAR(255) NOT NULL,
    `subgroup` VARCHAR(255),
    `obs` VARCHAR(255),
 PRIMARY KEY (`exercise_id`));

CREATE TABLE IF NOT EXISTS `spreadsheets` (
    `spreadsheet_id` CHAR(36) BINARY NOT NULL UNIQUE,
    `fk_user_id` CHAR(36)  BINARY DEFAULT NULL,
    `fk_trainer_id` CHAR(36) BINARY DEFAULT NULL,
    `spreadsheet_days` JSON,
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`spreadsheet_id`),
    FOREIGN KEY(`fk_user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY(`fk_trainer_id`) REFERENCES `trainers`(`trainer_id`));

SET NAMES utf8mb4;
DELIMITER //
CREATE FUNCTION uuid_v4() 
RETURNS CHAR(36) DETERMINISTIC
BEGIN
    RETURN LOWER(CONCAT(
            HEX(RANDOM_BYTES(4)),
            '-', HEX(RANDOM_BYTES(2)),
            '-4', SUBSTR(HEX(RANDOM_BYTES(2)), 2, 3),
            '-', HEX(FLOOR(ASCII(RANDOM_BYTES(1)) / 64) + 8), SUBSTR(HEX(RANDOM_BYTES(2)), 2, 3),
            '-', hex(RANDOM_BYTES(6))
        ));
END; //
DELIMITER ;


INSERT INTO exercises_samples(exercise_id,exercise_name, muscle_group, subgroup)
VALUES 
    (
         uuid_v4(),
         "Flexão",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Flexão Apoiado",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
        "Flexão de Joelho",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Supino Reto Barra",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Supino Inclinado Barra",
         "Peitoral",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Supino Declinado Barra",
         "Peitoral",
         "Inferior"
    ),
    (
		 uuid_v4(),
         "Supino Reto Halter",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Supino Halter 45",
         "Peitoral",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Supino Halter Declinado",
         "Peitoral",
         "Inferior"
    ),
    (
		 uuid_v4(),
         "Supino Reto Máquina",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Supino 45 Máquina",
         "Peitoral",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Supino Declinado Máquina",
         "Peitoral",
         "Inferior"
    ),
    (
		 uuid_v4(),
         "Crucifixo Reto",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Crucifixo Inclinado",
         "Peitoral",
         "Superior"
    ),
    (
		 uuid_v4(),
		 "Crucifixo Voador",
         "Peitoral",
         "Medial"
    ),
    (
		 uuid_v4(),
         "Crucifixo Inclinado Máquina",
         "Peitoral",
         "Superior"
    ),
    (
		 uuid_v4(),
        "Pullover",
         "Peitoral",
        "Medial"
    ),
    (
		 uuid_v4(),
         "Remada Barra Pronada",
         "Costas",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Remada Barra Supinada",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Remada Halter",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Remada Halter Aberta",
         "Costas",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Remada Máquina",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Remada Máquina Pronada",
         "Costas",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Puxada Supinada",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Puxada Pronada",
         "Costas",
         "Superior"
    ),
    (
		 uuid_v4(),
         "Puxada Neutra",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Barra Supinada",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Barra Pronada",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Barra Neutra",
         "Costas",
         "Dorsal"
    ),
    (
		 uuid_v4(),
         "Pull Down Polia",
        "Costas",
        "Dorsal"
    ),
    (
		 uuid_v4(),
         "Hiperextensao Lombar",
         "Costas",
        "Inferior"
    ),
    (
		 uuid_v4(),
        "Levantamento Terra",
         "Costas",
         NULL
    ),
    (
		 uuid_v4(),
        "Remada Alta",
        "Ombros",
        NULL
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Lateral Halter",
        "Ombros",
        "Lateral"
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Frontal Halter",
        "Ombros",
        "Anterior"
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Lateral Máquina",
        "Ombros",
        "Lateral"
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Frontal Máquina",
        "Ombros",
        "Anterior"
    ),
    (
		 uuid_v4(),
        "Elevação Lateral Halter",
         "Ombros",
        "Lateral"
    ),
    (
		 uuid_v4(),
        "Elevação Frontal Halter",
         "Ombros",
        "Anterior"
    ),
    (
		 uuid_v4(),
        "Elevação Lateral Polia",
         "Ombros",
        "Lateral"
    ),
    (
		 uuid_v4(),
        "Elevação Frontal Polia",
         "Ombros",
        "Anterior"
    ),
    (
		 uuid_v4(),
         "Crucifixo Invertido Halter",
         "Ombros",
        "Posterior"
    ),
    (
		 uuid_v4(),
         "Crucifixo Invertido Máquina",
         "Ombros",
        "Posterior"
    ),
    (
		 uuid_v4(),
        "Tríceps Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Invertido Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Coice Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Corda Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Testa Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Coice Halter",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Testa Halter",
        "Braços",
        "Tríceps"
    ),
    (
		 uuid_v4(),
        "Tríceps Banco",
        "Braços",
        "Tríceps"
    ),
    (
    uuid_v4(),
    "Paralela",
    "Braços",
    "Tríceps"
    ),
    (
    uuid_v4(),
    "Rosca Direta",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Alternada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Martelo Alternada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Martelo",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Direta c/ Rotação",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Inclinada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Inclinada Alternada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Direta Barra W",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Direta Barra",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Concentrada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Arnold",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Scott",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Scott Barra W",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Scott Alternada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Scott Martelo",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca Scott Martelo Alternada",
    "Braços",
    "Bíceps"
    ),
    (
    uuid_v4(),
    "Rosca de Punho",
    "Braços",
    "Antebraço"
    ),
    (
    uuid_v4(),
    "Rosca de Punho Invertida",
    "Braços",
    "Antebraço"
    ),
    (
    uuid_v4(),
    "Leg Press",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Agachamento Livre",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Agachamento Sumô",
    "Pernas",
    "Glúteos"
    ),
    (
    uuid_v4(),
    "Agachamento Smith",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Agachamento Livre Frontal",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Hack Squat",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Agachamento Afundo",
    "Pernas",
    "Glúteos"
    ),
    (
    uuid_v4(),
    "Agachamento Búlgaro",
    "Pernas",
    "Glúteos"
    ),
    (
    uuid_v4(),
    "Agachamento Goblet",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Cadeira Extensora",
    "Pernas",
    "Quadríceps"
    ),
    (
    uuid_v4(),
    "Cadeira Flexora",
    "Pernas",
    "Posterior"
    ),
    (
    uuid_v4(),
    "Mesa Flexora",
    "Pernas",
    "Posterior"
    ),
    (
    uuid_v4(),
    "Abdução de Quadril",
    "Pernas",
    "Glúteos"
    ),
    (
    uuid_v4(),
    "Adução de Quadril",
    "Pernas",
    NULL
    ),
    (
    uuid_v4(),
    "Panturrilha em Pé",
    "Pernas",
    "Panturrilha"
    ),
    (
    uuid_v4(),
    "Panturrilha Sentado",
    "Pernas",
    "Panturrilha"
    ),
    (
    uuid_v4(),
    "Stiff",
    "Pernas",
    "Posterior"
    ),
    (
    uuid_v4(),
    "Levantamento Terra Sumô",
    "Pernas",
    "Glúteos"
    ),
    (
    uuid_v4(),
    "Levantamento Terra ",
    "Pernas",
    "Posterior"
    );



