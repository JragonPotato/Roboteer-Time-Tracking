"use client"

import { useEffect, useState } from "react";

export default function Buttons() {
    const [statable, setStatable] = useState(false);

    useEffect(() => {
        fetch("/stats").then((res) => {
            setStatable(res.status == 200);
        }).catch(() => setStatable(false));
    }, []);

    return (
        <div className="btns">
            <a className="btn" href="/new-activity"><span className="btn-text">New Activity</span></a>
            <a className="btn" href="/edit-activity"><span className="btn-text">Edit Activities</span></a>
            <a className="btn" href="/stats-for-real"><span className="btn-text">Stats</span></a>
            {statable && <a className="btn" href="/stats"><span className="btn-text">Admin Panel</span></a>}
            <a className="btn" href="/auth/logout"><span className="btn-text">Log Out</span></a>
        </div>
    );
}
