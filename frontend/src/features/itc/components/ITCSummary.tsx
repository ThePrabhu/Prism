import type { Workspace } from "../../dashboard/types/dashboard.types";

interface ITCSummaryProps {
    workspace: Workspace;
}

export default function ITCSummary({
    workspace,
}: ITCSummaryProps) {
    return (
        <section
            className="
                rounded-3xl
                border
                border-zinc-200
                bg-white
                p-7
                shadow-sm
            "
        >
            <h2
                className="
                    text-xl
                    font-semibold
                    text-zinc-900
                "
            >
                Workspace Summary
            </h2>

            <p
                className="
                    mt-1
                    text-sm
                    text-zinc-500
                "
            >
                Overall GST reconciliation summary for the selected
                workspace.
            </p>

            <div
                className="
                    mt-6
                    overflow-x-auto
                "
            >
                <table className="min-w-full">

                    <tbody>

                        <SummaryRow
                            label="Workspace"
                            value={workspace.name}
                        />

                        <SummaryRow
                            label="Uploaded Files"
                            value={workspace.totalFiles}
                        />

                        <SummaryRow
                            label="Total Invoices"
                            value={workspace.totalInvoices}
                        />

                        <SummaryRow
                            label="Detected Alerts"
                            value={workspace.totalAlerts}
                        />

                        <SummaryRow
                            label="Claimable ITC"
                            value={`₹${workspace.claimableItc.toLocaleString()}`}
                        />

                        <SummaryRow
                            label="Processing Stage"
                            value={workspace.processing.stage}
                        />

                        <SummaryRow
                            label="Knowledge Graph"
                            value={`${workspace.graph.nodes} Nodes • ${workspace.graph.edges} Edges`}
                        />

                        <SummaryRow
                            label="Last Updated"
                            value={new Date(
                                workspace.updatedAt
                            ).toLocaleString()}
                        />

                    </tbody>

                </table>
            </div>
        </section>
    );
}

interface SummaryRowProps {
    label: string;

    value: string | number;
}

function SummaryRow({
    label,
    value,
}: SummaryRowProps) {
    return (
        <tr
            className="
                border-b
                border-zinc-100
                last:border-none
            "
        >
            <td
                className="
                    py-4
                    text-sm
                    font-medium
                    text-zinc-500
                "
            >
                {label}
            </td>

            <td
                className="
                    py-4
                    text-right
                    text-sm
                    font-semibold
                    text-zinc-900
                "
            >
                {value}
            </td>
        </tr>
    );
}