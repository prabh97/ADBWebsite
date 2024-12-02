import React from 'react';

export function Logo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/3/36/Asian_Development_Bank_logo.svg"
        alt="Asian Development Bank Logo"
        className="h-16 mb-2"
      />
      <h1 className="text-adb-blue text-xl font-semibold">Asian Development Bank</h1>
    </div>
  );
}