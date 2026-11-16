"use client"

import { useEffect, useState } from "react";
import { getActivities } from "../../lib/actions";
import { useUser } from "@auth0/nextjs-auth0";

export default function Page() {
    const [total, setTotal] = useState("");
    const {user, isLoading} = useUser();

    useEffect(() => {
        if (user) getActivities(user.email).then(x => {
            let hours = 0;
            let minutes = 0;
            for (let row of x) {
                const starthour = parseInt(row.starttime.substring(0, 2));
                const startminute = parseInt(row.starttime.substring(3, 5));

                const endhour = parseInt(row.endtime.substring(0, 2));
                const endminute = parseInt(row.endtime.substring(3, 5));

                hours += Math.abs(endhour - starthour);
                minutes += Math.abs(endminute - startminute);
            }

            setTotal(`${hours}:${minutes < 10 ? "0" : ""}${minutes}`);
        })
    }, [user?.email])

    return (
        <div className="stats-for-real-holder">
            <div className="stats-for-real">{total}</div>
        </div>
    );
}