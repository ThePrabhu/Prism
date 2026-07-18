import ITCActionMenu from "./ITCActionMenu";

import type { ITCRecord } from "../types/itc.types";

interface ITCTableRowProps {
    record: ITCRecord;
}

function getStatusColor(status: ITCRecord["status"]) {
    switch (status) {
        case "claimable":
            return "bg-emerald-100 text-emerald-700";

        case "blocked":
            return "bg-red-100 text-red-700";

        case "pending":
            return "bg-amber-100 text-amber-700";

        case "recovered":
            return "bg-blue-100 text-blue-700";

        default:
            return "bg-zinc-100 text-zinc-700";
    }
}

export default function ITCTableRow({
    record,
}: ITCTableRowProps) {
    return (
        <tr
            className="
                border-b
                border-zinc-100
                transition
                hover:bg-zinc-50
            "
        >
            {/* Invoice */}

            <td className="px-6 py-5">

                <div>

                    <p
                        className="
                            font-semibold
                            text-zinc-900
                        "
                    >
                        {record.invoiceNumber}
                    </p>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-zinc-500
                        "
                    >
                        ₹
                        {record.invoiceAmount.toLocaleString()}
                    </p>

                </div>

            </td>

            {/* Vendor */}

            <td className="px-6 py-5">

                <p
                    className="
                        font-medium
                        text-zinc-800
                    "
                >
                    {record.vendorName}
                </p>

            </td>

            {/* GSTIN */}

            <td className="px-6 py-5">

                <p
                    className="
                        text-sm
                        text-zinc-600
                    "
                >
                    {record.vendorGSTIN}
                </p>

            </td>

            {/* Blocked */}

            <td
                className="
                    px-6
                    py-5
                    text-right
                    font-semibold
                    text-red-600
                "
            >
                ₹
                {record.blockedITC.toLocaleString()}
            </td>

            {/* Recoverable */}

            <td
                className="
                    px-6
                    py-5
                    text-right
                    font-semibold
                    text-emerald-600
                "
            >
                ₹
                {record.recoverableITC.toLocaleString()}
            </td>

            {/* Reason */}

            <td className="px-6 py-5">

                <p
                    className="
                        text-sm
                        text-zinc-700
                    "
                >
                    {record.reason}
                </p>

                <p
                    className="
                        mt-1
                        text-xs
                        text-zinc-400
                    "
                >
                    {record.confidence}% confidence
                </p>

            </td>

            {/* Status */}

            <td className="px-6 py-5 text-center">

                <span
                    className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusColor(record.status)}
                    `}
                >
                    {record.status}
                </span>

            </td>

            {/* Actions */}

            <td className="px-6 py-5">

                <ITCActionMenu
    
                />

            </td>

        </tr>
    );
}