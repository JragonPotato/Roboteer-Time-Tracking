import { User } from "@auth0/nextjs-auth0/types"
import { ReactNode, RefObject, useRef } from "react"
import ActivityDisplay from "./ActivityDisplay";

export default function UserDisplay({email, rows}: {email: string, rows: any[]}) {
    let hours = 0
    let minutes = 0

    let children = rows.map((x, j) => {
        const starthour = parseInt(x.starttime.substring(0, 2));
        const startminute = parseInt(x.starttime.substring(3, 5));

        const endhour = parseInt(x.endtime.substring(0, 2));
        const endminute = parseInt(x.endtime.substring(3, 5));

        hours += Math.abs(endhour - starthour);
        minutes += Math.abs(endminute - startminute);

        return (
            <div key={j}>
                <ActivityDisplay date={x.squareoncalendar.toLocaleString("sv-SE").substring(0, 10)} activity={x.activity} crew={x.crew} hour={endhour - starthour} minute={endminute - startminute} id={x.id} />
            </div>
        );
    })

    return (
        <details className="user-display">
            <summary className="user-info">
                <span className="summary-item-l">{hours}:{`${minutes < 10 ? "0" : ""}${minutes}`}</span>
                <span className="summary-item-r">{email}</span>
                <div className="svg-holder summary-item-r">
                    <svg className="open-arrow" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                    <svg className="closed-arrow" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                </div>
            </summary>
            {children}
        </details>)
}