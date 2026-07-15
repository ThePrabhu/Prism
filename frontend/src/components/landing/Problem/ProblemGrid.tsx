import ProblemCard from "./ProblemCard";
import { problemData } from "./problemData";

export default function ProblemGrid() {
    return (
        <div
            className="
                mx-auto
                mt-16
                grid
                w-full
                max-w-6xl
                grid-cols-1
                gap-6
                md:grid-cols-2
                lg:gap-8
            "
        >
            {problemData.map((problem, index) => (
                <ProblemCard
                    key={problem.title}
                    index={index}
                    icon={problem.icon}
                    title={problem.title}
                    description={problem.description}
                />
            ))}
        </div>
    );
}
