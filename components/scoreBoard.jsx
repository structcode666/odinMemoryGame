export function Scoreboard({currentScore, bestScoreArray}){

    const bestScore = Math.max(0, ...bestScoreArray)
    return(
        <section className="scoreboard" aria-label="Game scores">
            <div className="score-item">
                <span className="score-label">Current score</span>
                <strong className="score-value">{currentScore}</strong>
            </div>
            <div className="score-divider" aria-hidden="true"></div>
            <div className="score-item">
                <span className="score-label">Best score</span>
                <strong className="score-value">{bestScore}</strong>
            </div>
        </section>
    )
}