SET SCHEMA 'fitdb';
CREATE TABLE IF NOT EXISTS public.users (
    user_id uuid NOT NULL UNIQUE ,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active boolean DEFAULT true,
    createdAt TIMESTAMP(0) NOT NULL,
    updatedAt TIMESTAMP(0) NOT NULL,
    PRIMARY KEY (user_id));

CREATE TABLE IF NOT EXISTS public.trainers (
    trainer_id uuid NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active boolean DEFAULT true,
    trainer_clients JSON,
    createdAt TIMESTAMP(0) NOT NULL,
    updatedAt TIMESTAMP(0) NOT NULL, 
    PRIMARY KEY (trainer_id));

CREATE TABLE IF NOT EXISTS public.exercises_samples (
    exercise_id uuid UNIQUE ,
    exercise_name VARCHAR(255) NOT NULL UNIQUE,
    muscle_group VARCHAR(255) NOT NULL,
    subgroup VARCHAR(255),
    obs VARCHAR(255),
 PRIMARY KEY (exercise_id));

CREATE TABLE IF NOT EXISTS public.spreadsheets (
    spreadsheet_id uuid NOT NULL UNIQUE,
    fk_user_id uuid DEFAULT NULL,
    fk_trainer_id uuid DEFAULT NULL,
    spreadsheet_days JSON,
    createdAt TIMESTAMP(0) NOT NULL, 
    updatedAt TIMESTAMP(0) NOT NULL, 
    PRIMARY KEY (spreadsheet_id));

ALTER TABLE public.spreadsheets ADD FOREIGN KEY (fk_user_id) REFERENCES users(user_id);

ALTER TABLE public.spreadsheets ADD FOREIGN KEY(fk_trainer_id) REFERENCES trainers(trainer_id);


INSERT INTO public.exercises_samples(exercise_id,exercise_name, muscle_group, subgroup)
VALUES 
    (
        gen_random_uuid(),
         'Flexão',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Flexão Apoiado',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
        'Flexão de Joelho',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Supino Reto Barra',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Supino Inclinado Barra',
         'Peitoral',
         'Superior'
    ),
    (
		 gen_random_uuid(),
         'Supino Declinado Barra',
         'Peitoral',
         'Inferior'
    ),
    (
		 gen_random_uuid(),
         'Supino Reto Halter',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Supino Halter 45',
         'Peitoral',
         'Superior'
    ),
    (
		 gen_random_uuid(),
         'Supino Halter Declinado',
         'Peitoral',
         'Inferior'
    ),
    (
		 gen_random_uuid(),
         'Supino Reto Máquina',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Supino 45 Máquina',
         'Peitoral',
         'Superior'
    ),
    (
		 gen_random_uuid(),
         'Supino Declinado Máquina',
         'Peitoral',
         'Inferior'
    ),
    (
		 gen_random_uuid(),
         'Crucifixo Reto',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Crucifixo Inclinado',
         'Peitoral',
         'Superior'
    ),
    (
		 gen_random_uuid(),
		 'Crucifixo Voador',
         'Peitoral',
         'Medial'
    ),
    (
		 gen_random_uuid(),
         'Crucifixo Inclinado Máquina',
         'Peitoral',
         'Superior'
    ),
    (
		 gen_random_uuid(),
        'Pullover',
         'Peitoral',
        'Medial'
    ),
    (
		 gen_random_uuid(),
         'Remada Barra',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Remada Halter',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Remada Máquina',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Puxada Supinada',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Puxada Pronada',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Puxada Neutra',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Barra Supinada',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Barra Pronada',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Barra Neutra',
         'Costas',
         'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Pull Down Polia',
        'Costas',
        'Dorsal'
    ),
    (
		 gen_random_uuid(),
         'Hiperextensao Lombar',
         'Costas',
        'Inferior'
    ),
    (
		 gen_random_uuid(),
        'Levantamento Terra',
         'Costas',
         NULL
    ),
    (
		 gen_random_uuid(),
        'Remada Alta',
        'Ombros',
        NULL
    ),
    (
		 gen_random_uuid(),
        'Desenvolvimento Lateral Halter',
        'Ombros',
        'Lateral'
    ),
    (
		 gen_random_uuid(),
        'Desenvolvimento Frontal Halter',
        'Ombros',
        'Anterior'
    ),
    (
		 gen_random_uuid(),
        'Desenvolvimento Lateral Máquina',
        'Ombros',
        'Lateral'
    ),
    (
		 gen_random_uuid(),
        'Desenvolvimento Frontal Máquina',
        'Ombros',
        'Anterior'
    ),
    (
		 gen_random_uuid(),
        'Elevação Lateral Halter',
         'Ombros',
        'Lateral'
    ),
    (
		 gen_random_uuid(),
        'Elevação Frontal Halter',
         'Ombros',
        'Anterior'
    ),
    (
		 gen_random_uuid(),
        'Elevação Lateral Polia',
         'Ombros',
        'Lateral'
    ),
    (
		 gen_random_uuid(),
        'Elevação Frontal Polia',
         'Ombros',
        'Anterior'
    ),
    (
		 gen_random_uuid(),
         'Crucifixo Invertido Halter',
         'Ombros',
        'Posterior'
    ),
    (
		 gen_random_uuid(),
         'Crucifixo Invertido Máquina',
         'Ombros',
        'Posterior'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Polia',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Invertido Polia',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Coice Polia',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Corda Polia',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Testa Polia',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Coice Halter',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Testa Halter',
        'Braços',
        'Tríceps'
    ),
    (
		 gen_random_uuid(),
        'Tríceps Banco',
        'Braços',
        'Tríceps'
    ),
    (
    gen_random_uuid(),
    'Paralela',
    'Braços',
    'Tríceps'
    );
    

