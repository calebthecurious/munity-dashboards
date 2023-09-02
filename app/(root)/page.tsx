"use client";

import { useEffect } from "react";

import { useGuideModal } from "@/hooks/use-guide-modal";

const SetupPage = () => {
  const onOpen = useGuideModal((state) => state.onOpen);
  const isOpen = useGuideModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
  }
}, [isOpen, onOpen]
  
  )

  return (
    <div className="p-4">
Root Page
    </div>
  )
}

export default SetupPage;