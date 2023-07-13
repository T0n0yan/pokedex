import React, { FC } from "react";
import styles from "./Stats.module.scss";

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
            <div className={styles.stats_container}>
                {stats.map((stat) => (
                    <div key={stat.stat.name} className={styles.stat_item}>
                        <div className={styles.stat_bar}>
                            <div className={styles.stat_tiny_bar_chart}>
                                {[...Array(15)].map((_, index) => (
                                    <div key={index} className={`${styles.tiny_bar} ${index < stat.base_stat / 15 ? `${styles.tiny_bar_active}` : ""}`}></div>
                                ))}
                            </div>
                            <span className={styles.stat_name}>
                                {stat.stat.name === 'hp'
                                    ? stat.stat.name.toUpperCase()
                                    : stat.stat.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                }
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
