import React from "react";

export default function SearchBar({ search, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={onChange}
            className="p-3 mb-6 w-full rounded-lg bg-[#201F21] text-white text-lg"
        />
    );
}
