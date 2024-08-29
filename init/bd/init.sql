/*Schools creation*/
INSERT INTO public."School" (id, name) VALUES (1, 'Fedac Horta');
INSERT INTO public."School" (id, name) VALUES (2, 'Fedac Amilcar');
INSERT INTO public."School" (id, name) VALUES (3, 'Fedac Sant Andreu');

/*Teacher creation*/
INSERT INTO public."Teacher" (uid, token, "displayName", name, email, role) VALUES ('7O0i8oqmdpUuFQQUIPaZSkuwk3p2', '1234', 'Iker Borrallo', 'Iker', 'ikerborr@gmail.com', 0);

/*Groups creation*/
INSERT INTO public."Class" (id, name, "schoolId", day, "teacherUid") VALUES (2, 'Coding PRIM', 1, 'Monday', '7O0i8oqmdpUuFQQUIPaZSkuwk3p2');
INSERT INTO public."Class" (id, name, "schoolId", day, "teacherUid") VALUES (3, '3D&VR ESO', 2, 'Wednesday', '7O0i8oqmdpUuFQQUIPaZSkuwk3p2');
INSERT INTO public."Class" (id, name, "schoolId", day, "teacherUid") VALUES (4, 'Robotics INF', 3, 'Friday', '7O0i8oqmdpUuFQQUIPaZSkuwk3p2');

/*Assign students*/
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (2, 'Pol', 'Albarran', '1@ignitesp.net', 'IgniteSP', true, 2);
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (3, 'Maria', 'Cantudo', '2@ignitesp.net', 'IgniteSP', true, 2);
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (4, 'Jan', 'Aguadé', '3@ignitesp.net', 'IgniteSP', true, 2);
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (5, 'Maria', 'Ferrero', '4@ignitesp.net', 'IgniteSP', true, 2);

/*Creation challenges*/
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1234', 'Challenge 1');
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1235', 'Challenge 2');
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1236', 'Challenge 3');
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1237', 'Challenge 4');

/*Assign challenges*/
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (2, '1234');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (3, '1235');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (4, '1236');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (5, '1237');
