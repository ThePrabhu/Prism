import ITCTableRow from "./ITCTableRow";

import type { ITCRecord } from "../types/itc.types";

interface ITCTableProps {
    records: ITCRecord[];
}

export default function ITCTable({
    records,
}: ITCTableProps) {
    if (!records.length) {
        return (
            <section
                className="
                    rounded-3xl
                    border
                    border-dashed
                    border-zinc-300
                    bg-white
                    py-20
                    text-center
                "
            >
                <h3
                    className="
                        text-lg
                        font-semibold
                        text-zinc-900
                    "
                >
                    No Recoverable ITC
                </h3>

                <p
                    className="
                        mt-3
                        text-sm
                        text-zinc-500
                    "
                >
                    Prism did not detect any recoverable
                    Input Tax Credit for this workspace.
                </p>
            </section>
        );
    }

    return (
        <section
            className="
                overflow-hidden
                rounded-3xl
                border
                border-zinc-200
                bg-white
                shadow-sm
            "
        >
            <div
                className="
                    overflow-x-auto
                "
            >
                <table className="min-w-full">

                    <thead
                        className="
                            border-b
                            border-zinc-200
                            bg-zinc-50
                        "
                    >
                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Invoice
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Vendor
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                GSTIN
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Blocked ITC
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Recoverable
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Reason
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {records.map((record) => (

                            <ITCTableRow
                                key={record.id}
                                record={record}
                            />

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
}