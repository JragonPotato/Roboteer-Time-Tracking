"use client"

import { useCallback, useEffect, useState } from "react";
import { getActivities } from "../../lib/actions";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default function Page() {
    const [activities, setActivities] = useState<Record<string, any>[]>([]);
    const {user, isLoading} = useUser();

    useEffect(() => {
        if (user) getActivities(user.email).then(setActivities)
    }, [user?.email])

    return (
        <div className="calendar-holder-holder-holder">
            {activities.map((x, i) => 
                <button className="activity" key={i} onClick={() => {
                    redirect(`/edit-activity/${x.id}?redirect=${"%2Fedit-activity"}`);
                }}>
                    {x.activity}
                </button>
            )}
        </div>
    );
}