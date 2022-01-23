CREATE TABLE user 
(
	id int AUTO_INCREMENT,
	name varchar(32) NOT NULL,
    own_language varchar(16) NOT NULL,
    target_language varchar(16) NOT NULL,
    country varchar(16),
	email varchar(32) NOT NULL,
	password varchar(256) NOT NULL, 
    image longblob,
    description varchar(255),
	PRIMARY KEY (id)
);

INSERT INTO user VALUES (NULL, 'Shinichi', 'Japanese', 'English', 'Japan', 'nextplanehome1988@yahoo.co.jp', 'testpassword', LOAD_FILE('C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\Shinichi profile.jpg'), 'Thinking of beginning to work on Finnish too!');
INSERT INTO user VALUES (NULL, 'Test User', 'English', 'Japanese', 'United States', 'sonotasan2017@gmail.com', 'testpassword', LOAD_FILE('C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\default picture.png'), 'I want to watch Japanese anime without subtitles!');

CREATE TABLE word (
	id int AUTO_INCREMENT,
    user_id int,
    own_lang_word_name varchar(64) NOT NULL,
    target_lang_word_name varchar(64) NOT NULL,
	own_lang_ex_sentence varchar(255),
    target_lang_ex_sentence varchar(255),
    created_date datetime NOT NULL,
    image longblob,
    PRIMARY KEY(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO word VALUES (NULL, 1, '書く', 'write', '効果的な勉強法の1つは書く事だ', 'One of the effective ways to learn is to write', '2020-5-28 15:00:00', LOAD_FILE('C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\living room floor.jpg'));
INSERT INTO word VALUES (NULL, 1, '効果的', 'effective', '効果的な勉強法の1つは書く事だ', 'One of the effective ways to learn is to write', '2020-5-28 15:05:00', LOAD_FILE('C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\under the bed.jpg'));
INSERT INTO word VALUES (NULL, 1, 'come on', 'no niin', 'Come on, a long queue again?', 'No niin, onpas pitkä jono taas', '2020-5-28 15:05:00', LOAD_FILE('C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\toilet.jpg'));
INSERT INTO word VALUES (NULL, 1, 'stronger', 'starkare', 'You are no longer the world\'s strongest bear. With 3 pots of thunder-honey, now I am stronger than the strongest!', 'Du är inte världens starkaste björn längre. Med 3 brukar av dunderhonong i magen, nu är jag starkare än starkaste!', '2020-5-28 15:05:00', LOAD_FILE('C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\toilet.jpg'));







