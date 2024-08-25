"use client"

import {useSearchParams} from "next/navigation";
import Navigation from "@/app/(logged)/_components/nav";
import ChallengesTable from "@/app/(logged)/(teacher)/challenges/table";
import {useEffect, useState} from "react";
import {NotificationColor, setNotification} from "@/lib/Notification/ClientNotification";

export default function ChallengesPage() {
    const searchParams = useSearchParams()
    const classId = searchParams.get('id')
    const [challenges, setChallenges] = useState([])
    const [matrix, setMatrix] = useState<any[][]>([[]])

    useEffect(() => {
        fetch("/api/challenges/get?id=" + classId).then(response => {
            response.json().then(challenges => {setChallenges(challenges.data)})
        }).catch(error => setNotification(error, NotificationColor.ERROR))
    }, []);

    useEffect(() => {
        setMatrix(createChallengesMatrix())
    }, [challenges]);

    const challengesHeaders = [
        {name: "Challenge 1", id: 1234},
        {name: "Challenge 2", id: 1235},
        {name: "Challenge 3", id: 1236},
        {name: "Challenge 4", id: 1237},
    ]

    function createChallengesMatrix() {
        console.log(challenges)
        const challengeIds = challengesHeaders.map(challenge => challenge.id);
        return challenges?.map((user: any) => {
          const row = [user.name];

          challengeIds.forEach(id => {
            row.push(user.challenges.includes(id.toString()));
          });

          return row;
        });
    }

    return (
        <main className={"flex flex-col max-h-[650px]"}>
            <Navigation/>
            <h1>Challenges</h1>
            <h2>{"Class ID " + classId}</h2>
            <section className={"mt-8 flex-1 overflow-y-auto"}>
                <ChallengesTable matrix={matrix} header={challengesHeaders.map(challenge => challenge.name)}/>
            </section>
        </main>
    )
}