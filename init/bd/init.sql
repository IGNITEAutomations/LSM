/* TEACHERS */
INSERT INTO public."Teacher" (uid, token, "displayName", name, email, role, id) VALUES ('7O0i8oqmdpUuFQQUIPaZSkuwk3p2', null, 'Iker Borrallo', 'Iker', 'ikerborr@gmail.com', 0, 1);
INSERT INTO public."Teacher" (uid, token, "displayName", name, email, role, id) VALUES (null, null, 'Jordi Carrasco', 'Jordi', 'igniteseriousplay@gmail.com', 0, 2);

/* SCHOOLS */
INSERT INTO public."School" (id, name) VALUES (1, 'Fedac Horta');
INSERT INTO public."School" (id, name) VALUES (2, 'Fedac Amilcar');
INSERT INTO public."School" (id, name) VALUES (3, 'Fedac Sant Andreu');

/* CLASS */
INSERT INTO public."Class" (id, name, "schoolId", day) VALUES (2, 'Coding PRIM', 1, 'Monday');
INSERT INTO public."Class" (id, name, "schoolId", day) VALUES (3, '3D&VR ESO', 2, 'Wednesday');
INSERT INTO public."Class" (id, name, "schoolId", day) VALUES (4, 'Robotics INF', 3, 'Friday');
INSERT INTO public."Class" (id, name, "schoolId", day) VALUES (5, '3D&VR PRIM', 1, 'Tuesday');
INSERT INTO public."Class" (id, name, "schoolId", day) VALUES (6, 'Coding ESO', 2, 'Thursday');

/* STUDENT */
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (5, 'Blanca', 'Nieves', '4@ignitesp.net', 'IgniteSP', true, 2);
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (3, 'Lola', 'Mento', '2@ignitesp.net', 'IgniteSP', true, 2);
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (2, 'Marc', 'Opolo', '1@ignitesp.net', 'IgniteSP', true, 2);
INSERT INTO public."Student" (id, name, surname, email, password, activated, "classId") VALUES (4, 'Armando', 'Jaleo', '3@ignitesp.net', 'IgniteSP', true, 2);

/* CLASS TO TEACHER */
INSERT INTO public."_ClassToTeacher" ("A", "B") VALUES (2, 1);
INSERT INTO public."_ClassToTeacher" ("A", "B") VALUES (3, 1);
INSERT INTO public."_ClassToTeacher" ("A", "B") VALUES (4, 1);

/* CHALLENGES HEADERS */
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1234', 'Challenge 1');
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1235', 'Challenge 2');
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1236', 'Challenge 3');
INSERT INTO public."ChallengesHeaders" (id, name) VALUES ('1237', 'Challenge 4');

/* CHALLENGES */
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (4, '1237');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (3, '1235');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (5, '1234');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (2, '1234');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (3, '1234');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (5, '1237');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (2, '1235');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (2, '1237');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (3, '1236');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (4, '1236');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (4, '1235');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (5, '1236');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (5, '1235');
INSERT INTO public."Challenges" ("studentId", "challengeId") VALUES (3, '1237');

/* SKILLS HEADERS */
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('1234', 'Communication Level 1', '0');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('1235', 'Communication Level 2', '0');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('1345', 'Creativity Level 1', '0');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('1346', 'Creativity Level 2', '0');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('1456', 'Problem-solving Level 1', '0');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('1457', 'Problem-solving Level 2', '0');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('4321', 'Customization Level 1', '1');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('4322', 'Customization Level 2', '1');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('5432', 'Critical Thinking Level 1', '1');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('5433', 'Critical Thinking Level 2', '1');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('6543', 'Abstract Thinking Level 1', '1');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('6544', 'Abstract Thinking Level 2', '1');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('9876', 'Hiper Realistic', '2');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('9877', 'Best Prototype', '2');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('9878', 'Best Geek', '3');
INSERT INTO public."SkillsHeaders" (id, name, type) VALUES ('9879', 'Code Innovator', '3');

/* SKILLS */
INSERT INTO public."Skills" ("studentId", "skillId") VALUES (5, '1234');
INSERT INTO public."Skills" ("studentId", "skillId") VALUES (3, '1235');
