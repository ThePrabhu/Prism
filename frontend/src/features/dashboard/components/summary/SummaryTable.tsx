import StatusBadge from "./StatusBadge";
import { summaryRows } from "./summaryData";

export default function SummaryTable() {
    return (
        <div
            className="
                mt-8
                overflow-hidden
                rounded-3xl
                border
                border-zinc-200
                bg-white
            "
        >

            <table className="w-full">

                <thead>

                    <tr className="border-b bg-zinc-50">

                        <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                            Source
                        </th>

                        <th className="text-left text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                            Records
                        </th>

                        <th className="text-left text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                            Issues
                        </th>

                        <th className="text-left text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                            Status
                        </th>

                        <th className="text-left text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                            ITC Impact
                        </th>

                        <th className="text-left text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                            Updated
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {summaryRows.map((row) => (

                        <tr
                            key={row.id}
                            className="
                                border-b
                                transition
                                hover:bg-emerald-50/30
                            "
                        >

                            <td className="px-8 py-6 font-semibold text-zinc-900">
                                {row.source}
                            </td>

                            <td className="text-zinc-600">
                                {row.records.toLocaleString()}
                            </td>

                            <td
                                className={
                                    row.issues === 0
                                        ? "text-emerald-600 font-semibold"
                                        : "font-semibold text-red-500"
                                }
                            >
                                {row.issues}
                            </td>

                            <td>
                                <StatusBadge status={row.status} />
                            </td>

                            <td className="font-semibold text-zinc-900">
                                {row.impact}
                            </td>

                            <td className="text-zinc-500">
                                {row.updated}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}