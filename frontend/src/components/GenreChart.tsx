import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";

import { getGenres } from "../services/api";
const COLORS = [
    "#E6194B",
    "#3CB44B",
    "#FFE119",
    "#4363D8",
    "#F58231",
    "#911EB4",
    "#46F0F0",
    "#F032E6",
    "#BCF60C",
    "#FABEBE",

    "#008080",
    "#E6BEFF",
    "#9A6324",
    "#FFFAC8",
    "#800000",
    "#AAFFC3",
    "#808000",
    "#FFD8B1",
    "#000075",
    "#808080",

    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",

    "#F1948A",
    "#7FB3D5",
    "#73C6B6",
    "#F8C471",
    "#AF7AC5",
    "#5DADE2",
    "#48C9B0",
    "#F5B041",
    "#EC7063",
    "#5499C7",

    "#1ABC9C",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#34495E",
    "#F1C40F",
    "#E67E22",
    "#E74C3C",
    "#95A5A6",
    "#16A085"
];
type Genre = {
    genre: string;
    count: number;
};

function GenreChart() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getGenres()
            .then((data) => {
                const formattedGenres = Object.entries(data).map(
                    ([genre, count]) => ({
                        genre,
                        count: Number(count)
                    })
                );

                setGenres(formattedGenres);
            })
            .catch((error) => {
                console.error("Error fetching genres:", error);
            });
    }, []);

    if (genres.length === 0) {
        return (
            <div className="genre-chart">
                <p>Loading genres...</p>
            </div>
        );
    }

    return (
        <div className="genre-chart">
            <h2>Top Genres</h2>

       <ResponsiveContainer width="100%" height={650}>
    <PieChart>
  <Pie
    data={genres}
    dataKey="count"
    nameKey="genre"
    cx="50%"
    cy="50%"
    outerRadius={250}
    labelLine={false}
    label={({ cx, cy, midAngle, innerRadius, outerRadius, index }: {
        cx: number;
        cy: number;
        midAngle?: number;
        innerRadius: number;
        outerRadius: number;
        index: number;
    }) => {
    if (midAngle === undefined) return null;
    const RADIAN = Math.PI / 180;

    const radius =
        innerRadius + (outerRadius - innerRadius) * 0.5;

    const x =
        cx + radius * Math.cos(-midAngle * RADIAN);

    const y =
        cy + radius * Math.sin(-midAngle * RADIAN);

let angle = -midAngle;

// Normalize angle to 0–360
angle = ((angle % 360) + 360) % 360;

// Flip text on the left side so it remains readable
if (angle > 90 && angle < 270) {
    angle -= 180;
}

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight="bold"
            stroke="black"
            strokeWidth={2}
            paintOrder="stroke"
            transform={`rotate(${angle}, ${x}, ${y})`}
        >
            {genres[index].genre}
        </text>
    );
}}
>
    {genres.map((entry, index) => (
        <Cell
            key={`cell-${entry.genre}`}
            fill={COLORS[index % COLORS.length]}
        />
    ))}
</Pie>

        <Tooltip />
        <Legend />
    </PieChart>
</ResponsiveContainer>
        </div>
    );
}

export default GenreChart;