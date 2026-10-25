export default function Buttons() {
    return (
        <div className="btns">
            <a className="btn" href="/new-activity"><span className="btn-text">New Activity</span></a>
            <a className="btn" href="/new-activity"><span className="btn-text">Edit Activities</span></a>
            <a className="btn" href="/new-activity"><span className="btn-text">Stats</span></a>
            <a className="btn" href="/auth/logout"><span className="btn-text">Log Out</span></a>
        </div>
    );
}