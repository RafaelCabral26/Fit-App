USE fitdb;
SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS `users` (`id` CHAR(36) BINARY NOT NULL UNIQUE , `name` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `profile` VARCHAR(255) DEFAULT 'user', `active` TINYINT(1) DEFAULT true, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`));



CREATE TABLE IF NOT EXISTS `exercises` (`exercise_id` CHAR(36) BINARY UNIQUE , `exercise_name` VARCHAR(255) NOT NULL UNIQUE, `muscle_group` VARCHAR(255) NOT NULL, `subgroup` VARCHAR(255), PRIMARY KEY (`exercise_id`));
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
INSERT INTO exercises(exercise_id,exercise_name, muscle_group, subgroup)
VALUES 
    (
         uuid_v4(),
         "Flexao",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Flexao Apoiado",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Flexao de Joelho",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Supino Reto Barra",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Supino Inclinado Barra",
         "chest",
         "upperchest"
    ),
    (
		 uuid_v4(),
         "Supino Declinado Barra",
         "chest",
         "lowerchest"
    ),
    (
		 uuid_v4(),
         "Supino Reto Halter",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Supino Halter 45",
         "chest",
         "upperchest"
    ),
    (
		 uuid_v4(),
         "Supino Halter Declinado",
         "chest",
         "lowerchest"
    ),
    (
		 uuid_v4(),
         "Supino Reto Máquina",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Supino 45 Máquina",
         "chest",
         "upperchest"
    ),
    (
		 uuid_v4(),
         "Supino Declinado Máquina",
         "chest",
         "lowerchest"
    ),
    (
		 uuid_v4(),
         "Crucifixo Reto",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Crucifixo Inclinado",
         "chest",
         "upperchest"
    ),
    (
		 uuid_v4(),
		 "Crucifixo Voador",
         "chest",
         "middlechest"
    ),
    (
		 uuid_v4(),
         "Crucifixo Inclinado Máquina",
         "chest",
         "upperchest"
    ),
    (
		 uuid_v4(),
        "Pullover",
         "chest",
        "middlechest"
    ),
    (
		 uuid_v4(),
         "Remada Barra",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Remada Halter",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Remada Máquina",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Puxada Supinada",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Puxada Pronada",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Puxada Neutra",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Barra Supinada",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Barra Pronada",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Barra Neutra",
         "back",
         "lats"
    ),
    (
		 uuid_v4(),
         "Pull Down Polia",
        "back",
        "lats"
    ),
    (
		 uuid_v4(),
         "Hiperextensao Lombar",
         "back",
        "lowerback"
    ),
    (
		 uuid_v4(),
        "Levantamento Terra",
         "back",
         NULL
    ),
    (
		 uuid_v4(),
        "Remada Alta",
        "shoulder",
        NULL
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Lateral Halter",
        "shoulder",
        "lateral"
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Frontal Halter",
        "shoulder",
        "anterior"
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Lateral Máquina",
        "shoulder",
        "lateral"
    ),
    (
		 uuid_v4(),
        "Desenvolvimento Frontal Máquina",
        "shoulder",
        "anterior"
    ),
    (
		 uuid_v4(),
        "Elevacao Lateral Halter",
         "shoulder",
        "lateral"
    ),
    (
		 uuid_v4(),
        "Elevacao Frontal Halter",
         "shoulder",
        "anterior"
    ),
    (
		 uuid_v4(),
        "Elevacao Lateral Polia",
         "shoulder",
        "lateral"
    ),
    (
		 uuid_v4(),
        "Elevacao Frontal Polia",
         "shoulder",
        "anterior"
    ),
    (
		 uuid_v4(),
         "Crucifixo Invertido Halter",
         "shoulder",
        "posterior"
    ),
    (
		 uuid_v4(),
         "Crucifixo Invertido Máquina",
         "shoulder",
        "posterior"
    ),
    (
		 uuid_v4(),
        "Triceps Polia",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Invertido Polia",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Coice Polia",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Corda Polia",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Testa Polia",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Coice Halter",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Testa Halter",
        "arm",
        "triceps"
    ),
    (
		 uuid_v4(),
        "Triceps Banco",
        "arm",
        "triceps"
    ),
    (uuid_v4(),"Paralela","arm","triceps");
    
