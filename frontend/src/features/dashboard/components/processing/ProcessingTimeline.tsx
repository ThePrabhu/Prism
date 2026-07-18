// import { useEffect } from "react";

import { CheckCircle2 } from "lucide-react";

import { useDashboardStore } from "../../store/dashboardStore";

const STEPS = [
    "Uploading",
    "OCR",
    "Building Graph",
    "Matching",
    "AI Analysis",
    "Completed",
];

export default function ProcessingTimeline() {

    const processingStage = useDashboardStore(
        state => state.processingStage
    );

    // const setProcessingStage = useDashboardStore(
    //     state => state.setProcessingStage
    // );

    // const setWorkspaceMode = useDashboardStore(
    //     state => state.setWorkspaceMode
    // );

    // useEffect(() => {

    //     async function simulate(){

    //         const stages = [
    //             "uploading",
    //             "ocr",
    //             "graph",
    //             "matching",
    //             "analysis",
    //             "completed",
    //         ] as const;

    //         for(const stage of stages){

    //             setProcessingStage(stage);

    //             await new Promise(resolve =>
    //                 setTimeout(resolve,900)
    //             );

    //         }

    //         setWorkspaceMode("completed");

    //     }

    //     simulate();

    // },[]);

    const activeIndex = STEPS.findIndex(step => {

        if(step==="Uploading")
            return processingStage==="uploading";

        if(step==="OCR")
            return processingStage==="ocr";

        if(step==="Building Graph")
            return processingStage==="graph";

        if(step==="Matching")
            return processingStage==="matching";

        if(step==="AI Analysis")
            return processingStage==="analysis";

        if(step==="Completed")
            return processingStage==="completed";

        return false;

    });

    return (

        <section
            className="
                rounded-3xl
                bg-white
                p-8
                shadow-[0_20px_60px_rgba(0,0,0,.08)]
            "
        >

            <h2
                className="
                    text-xl
                    font-semibold
                "
            >
                Processing Workspace
            </h2>

            <p
                className="
                    mt-1
                    text-sm
                    text-zinc-500
                "
            >
                Prism is analyzing your GST documents...
            </p>

            <div className="mt-8 space-y-6">

                {STEPS.map((step,index)=>{

                    const completed=index<activeIndex;

                    const active=index===activeIndex;

                    return(

                        <div
                            key={step}
                            className="
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    ${
                                        completed
                                        ? "bg-emerald-500 text-white"
                                        : active
                                        ? "bg-emerald-100 text-emerald-700 animate-pulse"
                                        : "bg-zinc-100 text-zinc-400"
                                    }
                                `}
                            >

                                {completed
                                ? <CheckCircle2 size={18}/>
                                : index+1}

                            </div>

                            <div>

                                <p
                                    className="
                                        font-medium
                                    "
                                >
                                    {step}
                                </p>

                                {active && (

                                    <p
                                        className="
                                            text-sm
                                            text-emerald-600
                                        "
                                    >
                                        In Progress...
                                    </p>

                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

}