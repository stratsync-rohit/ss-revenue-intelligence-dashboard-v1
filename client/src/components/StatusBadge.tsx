import React from "react";

interface Props {
  status: "Good" | "Watch" | "Alert";
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  const styles = {
    Good: {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },
    Watch: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      dot: "bg-orange-500",
    },
    Alert: {
      bg: "bg-red-100",
      text: "text-red-600",
      dot: "bg-red-500",
    },
  };

  const s = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${s.bg} ${s.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;