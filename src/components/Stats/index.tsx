import React, {FC} from "react";
import "./Stats.module.scss";

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface StatsProps {
    stats: Stat[];
}

const Stats: FC<StatsProps> = ({ stats }) => {
    return (
        <div>
            <h2>Stats</h2>
            <div className="stats-container">
                {stats.map((stat) => (
                    <div key={stat.stat.name} className="stat-item">
                        <div className="stat-bar">
                            <div className="stat-tiny-bar-chart">
                                {[...Array(15)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`tiny-bar ${index < stat.base_stat / 15 ? "active" : ""}`}
                                    ></div>
                                ))}
                            </div>
                            <span className="stat-name">{stat.stat.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
