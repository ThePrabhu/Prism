import StatusBadge from "./StatusBadge";
import { useDashboardStore } from "../../store/dashboardStore";

export default function SummaryTable() {
    const uploadResult = useDashboardStore(
        (state) => state.uploadResult
    );

    const dashboard = uploadResult?.dashboard;

    if (!dashboard) {
        return (
            <div className="p-10 text-center text-zinc-500">
                Upload a GST file to see the summary.
            </div>
        );
    }

    const rows = [
        {
            id: "1",
            source: "Invoices",
            records: dashboard.total_invoices ?? 0,
            issues: dashboard.mismatches ?? 0,
            status: "Synced" as const,
            impact: `₹ ${dashboard.claimable_itc ?? 0}`,
            updated: "Now",
        },
    ];

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
                        <th className="px-8 py-5 text-left">Source</th>
                        <th className="text-left">Records</th>
                        <th className="text-left">Issues</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">ITC Impact</th>
                        <th className="text-left">Updated</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b hover:bg-emerald-50/30"
                        >
                            <td className="px-8 py-6 font-semibold">
                                {row.source}
                            </td>

                            <td>{row.records}</td>

                            <td>{row.issues}</td>

                            <td>
                                <StatusBadge status={row.status} />
                            </td>

                            <td>{row.impact}</td>

                            <td>{row.updated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}