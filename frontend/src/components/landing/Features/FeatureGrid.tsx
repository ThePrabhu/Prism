import FeatureCard from "./FeatureCard";
import FeatureVisual from "./FeatureVisual";
import { featureData } from "./featuresData";

const visualTypes = [
    "reconciliation",
    "graph",
    "copilot",
    "vendors",
    "alerts",
    "reports",
] as const;

export default function FeatureGrid() {
    return (
        <div className="mx-auto mt-16 w-full max-w-6xl">

            <div
                className="
                    grid
                    grid-cols-1
                    gap-6
                    lg:grid-cols-2
                    lg:gap-8
                "
            >
                {featureData.map((feature, index) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                        size={feature.size}
                        visual={
                            <FeatureVisual
                                type={visualTypes[index] ?? "reports"}
                            />
                        }
                    />
                ))}

            </div>

        </div>
    );
}
