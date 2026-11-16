export default function ActivityDisplay({date, activity, crew, hour, minute, id}: {date: string, activity: string, crew: string, hour: number, minute: number, id: number}) {
    return (
        <a className="activity-display" href={"/edit-activity/" + id + "?redirect=%2Fstats"}>
            {date} {activity} {crew} {hour}:{`${minute < 10 ? "0" : ""}${minute}`}
        </a>
    )
}