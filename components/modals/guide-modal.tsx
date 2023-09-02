'use client';

import { useGuideModal } from "@/hooks/use-guide-modal";
import { Modal } from "@/components/ui/modal";


export const GuideModal = () => {
    const guideModal = useGuideModal();

        return (
            <Modal
                title="Create a new guide"
                description="Add a new skill to teach your community"
                isOpen={guideModal.isOpen}
                onClose={guideModal.onClose}
                >
                    Become a guide form
                </Modal>
        )
    };
