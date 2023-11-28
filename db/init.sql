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
         
         "Flexão",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Flexão Apoiado",
         "Peitoral",
         "Medial"
    ),
    (
		 
        "Flexão de Joelho",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Supino Reto Barra",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Supino Inclinado Barra",
         "Peitoral",
         "Superior"
    ),
    (
		 
         "Supino Declinado Barra",
         "Peitoral",
         "Inferior"
    ),
    (
		 
         "Supino Reto Halter",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Supino Halter 45",
         "Peitoral",
         "Superior"
    ),
    (
		 
         "Supino Halter Declinado",
         "Peitoral",
         "Inferior"
    ),
    (
		 
         "Supino Reto Máquina",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Supino 45 Máquina",
         "Peitoral",
         "Superior"
    ),
    (
		 
         "Supino Declinado Máquina",
         "Peitoral",
         "Inferior"
    ),
    (
		 
         "Crucifixo Reto",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Crucifixo Inclinado",
         "Peitoral",
         "Superior"
    ),
    (
		 
		 "Crucifixo Voador",
         "Peitoral",
         "Medial"
    ),
    (
		 
         "Crucifixo Inclinado Máquina",
         "Peitoral",
         "Superior"
    ),
    (
		 
        "Pullover",
         "Peitoral",
        "Medial"
    ),
    (
		 
         "Remada Barra",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Remada Halter",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Remada Máquina",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Puxada Supinada",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Puxada Pronada",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Puxada Neutra",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Barra Supinada",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Barra Pronada",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Barra Neutra",
         "Costas",
         "Dorsal"
    ),
    (
		 
         "Pull Down Polia",
        "Costas",
        "Dorsal"
    ),
    (
		 
         "Hiperextensao Lombar",
         "Costas",
        "Inferior"
    ),
    (
		 
        "Levantamento Terra",
         "Costas",
         NULL
    ),
    (
		 
        "Remada Alta",
        "Ombros",
        NULL
    ),
    (
		 
        "Desenvolvimento Lateral Halter",
        "Ombros",
        "Lateral"
    ),
    (
		 
        "Desenvolvimento Frontal Halter",
        "Ombros",
        "Anterior"
    ),
    (
		 
        "Desenvolvimento Lateral Máquina",
        "Ombros",
        "Lateral"
    ),
    (
		 
        "Desenvolvimento Frontal Máquina",
        "Ombros",
        "Anterior"
    ),
    (
		 
        "Elevação Lateral Halter",
         "Ombros",
        "Lateral"
    ),
    (
		 
        "Elevação Frontal Halter",
         "Ombros",
        "Anterior"
    ),
    (
		 
        "Elevação Lateral Polia",
         "Ombros",
        "Lateral"
    ),
    (
		 
        "Elevação Frontal Polia",
         "Ombros",
        "Anterior"
    ),
    (
		 
         "Crucifixo Invertido Halter",
         "Ombros",
        "Posterior"
    ),
    (
		 
         "Crucifixo Invertido Máquina",
         "Ombros",
        "Posterior"
    ),
    (
		 
        "Tríceps Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Invertido Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Coice Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Corda Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Testa Polia",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Coice Halter",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Testa Halter",
        "Braços",
        "Tríceps"
    ),
    (
		 
        "Tríceps Banco",
        "Braços",
        "Tríceps"
    ),
    ("Paralela","Braços","Tríceps");
    
