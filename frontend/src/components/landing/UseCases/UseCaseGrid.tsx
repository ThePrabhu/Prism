import UseCaseItem from "./UseCaseItem";
import { useCaseData } from "./useCaseData";

export default function UseCaseGrid() {
    return (
        <div
            className="
                mt-24
                border
                border-zinc-200
                bg-white
            "
        >
            <div
                className="
                    grid
                    md:grid-cols-2
                    lg:grid-cols-3
                "
            >
                {useCaseData.map((item, index) => (
                    <div
                        key={item.title}
                        className="
                            border-zinc-200
                            lg:[&:not(:nth-child(3n))]:border-r
                            md:[&:nth-child(-n+4)]:border-b
                            lg:[&:nth-child(-n+3)]:border-b
                        "
                    >
                        <UseCaseItem
                            index={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}