import React from "react";
import LeaderBoardList from "../components/LeaderBoard/LeaderBoardList";

export default function LeaderBoardsPage() {
  return (
    <div className="min-h-[85vh] lg:w-[50vw] mx-auto bg-white dark:bg-dark-primary-2 dark:text-white ease-out duration-300 mt-5 p-5 rounded-md shadow-lg">
      <h2 className="capitalize sm:text-lg xl:text-xl font-[500] border-b-2 py-5">
        Peringkat pengguna aktif
      </h2>
      <div className="flex mt-5 justify-between items-center sm:text-base xl:text-lg text-gray-600 dark:text-gray-100 tracking-wider">
        <p>Pengguna</p>
        <p>Skor</p>
      </div>
      <LeaderBoardList />
    </div>
  );
}
