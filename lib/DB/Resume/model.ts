import prismadb from "@/prisma/prismadb";

class CModelResume {
    public async resume(): Promise<Array<object>> {
        return prismadb.$queryRaw`
            SELECT
                g.id AS group_id,
                g.name AS group_name,
                s.name AS school_name,
                t_non_coordinator."displayName" AS teacher_display_name,
                t_coordinator."displayName" AS coordinator_display_name,
                CASE
                    WHEN COUNT(c."studentId") = 0 THEN 'Challenge'
                    WHEN COUNT(sk_soft."studentId") = 0 THEN 'Soft'
                    WHEN COUNT(sk_steam."studentId") = 0 THEN 'STEAM'
                    WHEN COUNT(sk_mention."studentId") = 0 THEN 'Mention'
                    WHEN COUNT(e."studentId") = 0 THEN 'Evaluation'
                END AS error
            FROM
                "Group" g
            JOIN
                "School" s ON g."schoolId" = s.id
            
            LEFT JOIN
                "Teacher" t_non_coordinator ON t_non_coordinator.id = (
                    SELECT teacher.id
                    FROM "Teacher" teacher
                    JOIN "_GroupToTeacher" gtt ON gtt."A" = g.id
                    WHERE teacher.id = gtt."B" AND teacher.role = 0
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
            
            LEFT JOIN
                "Skills" sk_steam ON sk_steam."studentId" = st.id
                AND sk_steam."skillId" IN (SELECT id FROM "SkillsHeaders" WHERE CAST(type AS INTEGER) = 1)
            
            LEFT JOIN
                "Skills" sk_mention ON sk_mention."studentId" = st.id
                AND sk_mention."skillId" IN (SELECT id FROM "SkillsHeaders" WHERE CAST(type AS INTEGER) = 2)
            
            LEFT JOIN
                "Challenges" c ON c."studentId" = st.id
            LEFT JOIN
                "Evaluation" e ON e."studentId" = st.id
            
            GROUP BY
                g.id, g.name, s.name, t_non_coordinator."displayName", t_coordinator."displayName"
            HAVING
                COUNT(c."studentId") = 0
                OR COUNT(sk_soft."studentId") = 0
                OR COUNT(sk_steam."studentId") = 0
                OR COUNT(sk_mention."studentId") = 0
                OR COUNT(e."studentId") = 0
            ORDER BY
                g.id, error;
        `
    }
}

const ModelResume = new CModelResume()
export default ModelResume