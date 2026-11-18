"use client"

import { redirect, useRouter, useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react";
import { getActivityById, putActivity, putActivityId } from "../../../lib/actions";
import { useUser } from "@auth0/nextjs-auth0";

export default function Page({params}: {params: Promise<{id: number}>}) {
    const {id} = use(params)
    const searchParams = useSearchParams();

    const [activity, setActivity] = useState<Record<string, any> | null>(null);
    const {user, isLoading} = useUser()

    useEffect(() => {
        getActivityById(id).then(setActivity);
    }, [])

    const utcDate = new Date(Date.now() - 6 * 3.6e+6);
    let date = utcDate.toISOString();

    let time = date.substring(11, 16);

    const [startTime, setStartTime] = useState(time);
    useEffect(() => {
        if (activity) setStartTime(activity.starttime.substring(0, 5));
    }, [activity?.starttime]);

    return activity && (
        <form className="btns" onSubmit={(e) => {
                e.preventDefault();
    
                let formData = new FormData(e.target);
    
                putActivityId(
                    id,
                    user.email,
                    formData.get('date') as string,
                    formData.get('project_name') as string,
                    formData.get('start_time') as string,
                    formData.get('end_time') as string,
                    formData.get('description') as string,
                    formData.get('crew') as string
                    );

                redirect(`/completed?redirect=${searchParams.get("redirect")}`);
            }}>
                <div className="calendar-holder-holder-holder"><input className="title" type="text" placeholder="Project Name" name="project_name" defaultValue={activity.activity} /></div>
                <div className="calendar-holder-holder-holder"><input className="title" type="date" defaultValue={activity.squareoncalendar.toLocaleString("sv-SE").substring(0, 10)} name="date" /></div>
                <div className="calendar-holder-holder-holder">
                    <div className="time-holder-holder">
                        <div className="time-holder time-l">
                            <label>Start Time</label>
                            <input className="time time-l" type="time" defaultValue={activity.starttime.substring(0, 5)} onChange={x => { setStartTime(x.currentTarget.value) }} name="start_time" />
                        </div>
                        <div className="time-holder time-r">
                            <label>End Time</label>
                            <input className="time time-r" type="time" min={startTime} defaultValue={activity.endtime.substring(0, 5)} name="end_time" />
                        </div>
                    </div>
                </div>
                <div className="calendar-holder-holder-holder"><input className="title" placeholder="Description (Must be descriptive)" name="description" defaultValue={activity.description} /></div>
                <div className="calendar-holder-holder-holder"><select className="title" name="crew" defaultValue={activity.crew} >
                    <option className="whyNotCentered" value="" disabled hidden>--Crew--</option>
                    <option className="whyNotCentered" value="software">Software</option>
                    <option className="whyNotCentered" value="electrical">Electrical</option>
                    <option className="whyNotCentered" value="strategy">Strategy</option>
                    <option className="whyNotCentered" value="mechanical">Mechanical</option>
                    <option className="whyNotCentered" value="marketing">Marketing</option>
                    <option className="whyNotCentered" value="cad">CAD</option>
                    <option className="whyNotCentered" value="awards">Awards</option>
                    <option className="whyNotCentered" value="leadership">Leadership Council</option></select>
                </div>
                <button className="btn" disabled={isLoading}><span className="btn-text">Submit</span></button>
            </form>
    );
}