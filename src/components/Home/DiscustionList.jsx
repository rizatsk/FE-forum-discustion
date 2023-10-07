import React from "react";
import PropTypes from "prop-types";
import DiscustionItem from "./DiscustionItem";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import SkeletonDisuctionList from "./Skeleton/SkeletonDisuctionList";

export default function DiscustionList({ isLoading, threads }) {
  if (isLoading) {
    return <SkeletonDisuctionList />;
  }

  if (threads.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 gap-5">
        <MdOutlineSpeakerNotesOff className="text-dark-primary-sky w-[20vw] h-[20vw] md:w-[70px] md:h-[70px]" />
        <h2 className="text-center text-lg">Tidak ada diskusi</h2>
      </div>
    );
  }

  return (
    <div className="list-dicustions my-4 space-y-5">
      {threads.map((thread) => (
        <DiscustionItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

DiscustionList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  threads: PropTypes.array,
};
