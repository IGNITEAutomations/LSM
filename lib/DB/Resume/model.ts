import prismadb from "@/prisma/prismadb";

class CModelResume {
    public async resume(): Promise<Array<object>> {
        return prismadb.$queryRaw`
        SELECT
            g.id AS "Group ID",
            g.name AS "Group Name",
            s.name AS "School Name",
            t_non_coordinator."displayName" AS "Teacher Name",
            t_coordinator."displayName" AS "Coordinator Name",
            'Challenge' AS error
        FROM
            "Group" g
        JOIN
            "School" s ON g."schoolId" = s.id
        LEFT JOIN
            "Teacher" t_non_coordinator ON t_non_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role != 1
                LIMIT 1
            )
        LEFT JOIN
            "Teacher" t_coordinator ON t_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role = 1
                LIMIT 1
            )
        JOIN
            "Student" st ON st."groupId" = g.id AND st.activated = TRUE
        LEFT JOIN
            "Challenges" c ON c."studentId" = st.id
        WHERE
            c."studentId" IS NULL
        GROUP BY
            g.id, g.name, s.name, t_non_coordinator."displayName", t_coordinator."displayName"
        
        UNION ALL
        
        SELECT
            g.id AS "Group ID",
            g.name AS "Group Name",
            s.name AS "School Name",
            t_non_coordinator."displayName" AS "Teacher Name",
            t_coordinator."displayName" AS "Coordinator Name",
            'Soft Skill' AS error
        FROM
            "Group" g
        JOIN
            "School" s ON g."schoolId" = s.id
        LEFT JOIN
            "Teacher" t_non_coordinator ON t_non_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role != 1
                LIMIT 1
            )
        LEFT JOIN
            "Teacher" t_coordinator ON t_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role = 1
                LIMIT 1
            )
        JOIN
            "Student" st ON st."groupId" = g.id AND st.activated = TRUE
        LEFT JOIN
            "Skills" sk_soft ON sk_soft."studentId" = st.id
            AND sk_soft."skillId" IN (SELECT id FROM "SkillsHeaders" WHERE CAST(type AS INTEGER) = 0)
        WHERE
            sk_soft."studentId" IS NULL
        GROUP BY
            g.id, g.name, s.name, t_non_coordinator."displayName", t_coordinator."displayName"
        
        UNION ALL
        
        SELECT
            g.id AS "Group ID",
            g.name AS "Group Name",
            s.name AS "School Name",
            t_non_coordinator."displayName" AS "Teacher Name",
            t_coordinator."displayName" AS "Coordinator Name",
            'STEAM Skill' AS error
        FROM
            "Group" g
        JOIN
            "School" s ON g."schoolId" = s.id
        LEFT JOIN
            "Teacher" t_non_coordinator ON t_non_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role != 1
                LIMIT 1
            )
        LEFT JOIN
            "Teacher" t_coordinator ON t_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role = 1
                LIMIT 1
            )
        JOIN
            "Student" st ON st."groupId" = g.id AND st.activated = TRUE
        LEFT JOIN
            "Skills" sk_steam ON sk_steam."studentId" = st.id
            AND sk_steam."skillId" IN (SELECT id FROM "SkillsHeaders" WHERE CAST(type AS INTEGER) = 1)
        WHERE
            sk_steam."studentId" IS NULL
        GROUP BY
            g.id, g.name, s.name, t_non_coordinator."displayName", t_coordinator."displayName"
        
        UNION ALL
        
        SELECT
            g.id AS "Group ID",
            g.name AS "Group Name",
            s.name AS "School Name",
            t_non_coordinator."displayName" AS "Teacher Name",
            t_coordinator."displayName" AS "Coordinator Name",
            'Mention' AS error
        FROM
            "Group" g
        JOIN
            "School" s ON g."schoolId" = s.id
        LEFT JOIN
            "Teacher" t_non_coordinator ON t_non_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role != 1
                LIMIT 1
            )
        LEFT JOIN
            "Teacher" t_coordinator ON t_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role = 1
                LIMIT 1
            )
        JOIN
            "Student" st ON st."groupId" = g.id AND st.activated = TRUE
        LEFT JOIN
            "Skills" sk_mention ON sk_mention."studentId" = st.id
            AND sk_mention."skillId" IN (SELECT id FROM "SkillsHeaders" WHERE CAST(type AS INTEGER) = 2)
        WHERE
            sk_mention."studentId" IS NULL
        GROUP BY
            g.id, g.name, s.name, t_non_coordinator."displayName", t_coordinator."displayName"
        
        UNION ALL
        
        SELECT
            g.id AS "Group ID",
            g.name AS "Group Name",
            s.name AS "School Name",
            t_non_coordinator."displayName" AS "Teacher Name",
            t_coordinator."displayName" AS "Coordinator Name",
            'Evaluation' AS error
        FROM
            "Group" g
        JOIN
            "School" s ON g."schoolId" = s.id
        LEFT JOIN
            "Teacher" t_non_coordinator ON t_non_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role != 1
                LIMIT 1
            )
        LEFT JOIN
            "Teacher" t_coordinator ON t_coordinator.id = (
                SELECT teacher.id
                FROM "Teacher" teacher
                JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                WHERE teacher.id = gtt."B" AND teacher.role = 1
                LIMIT 1
            )
        JOIN
            "Student" st ON st."groupId" = g.id AND st.activated = TRUE
        LEFT JOIN
            "Evaluation" e ON e."studentId" = st.id
        WHERE
            e."studentId" IS NULL
        GROUP BY
            g.id, g.name, s.name, t_non_coordinator."displayName", t_coordinator."displayName"
        ORDER BY
            "Group ID", error;
        `
    }
}

const ModelResume = new CModelResume()
export default ModelResume