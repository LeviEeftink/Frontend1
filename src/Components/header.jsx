import React from "react";

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <a className="text-white hover:text-gray-300 transition" href="/">Home</a>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}
