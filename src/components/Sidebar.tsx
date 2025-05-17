import { useState } from "react";
import ContactCreatedSection from "./ContactCreatedSection";
import { useDispatch } from "react-redux";
import { setTrigger } from "../redux/features/workFlow/workFlowSlice";
import ActionSelectionView from "./ActionSelectionView";
import TriggerSelectionView from "./TriggerSelectionView";
import WaitActionConfigView from "./WaitActionConfigView";
import AssignContactToUserConfigView from "./AssignContactToUserConfigView";

interface SidebarProps {
  isOpen: boolean;
  toggleSideBar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSideBar }) => {
  const dispatch = useDispatch();
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [showActionSelection, setShowActionSelection] = useState(false);
  const [selectedActionView, setSelectedActionView] = useState<string | null>(
    null
  );

  return (
    <>
      <div
        className={`fixed top-[112px] right-0 h-[calc(100vh-112px)] p-4 overflow-y-auto transition-transform w-96 border-l borderborderGray200 shadow-lg bg-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedActionView === null ? (
          showActionSelection ? (
            <ActionSelectionView
              toggleSideBar={toggleSideBar}
              onActionSelect={setSelectedActionView}
            />
          ) : selectedTrigger === "Contact created" ? (
            <ContactCreatedSection
              setSelectedTrigger={setSelectedTrigger}
              onShowActionView={() => setShowActionSelection(true)}
            />
          ) : (
            <TriggerSelectionView
              onTriggerSelect={(trigger) => {
                const newTrigger = {
                  type: "contact_created",
                  description: "",
                  filters: {
                    events: [],
                    contact_statuses: "",
                  },
                };
                dispatch(setTrigger(newTrigger));
                setSelectedTrigger(trigger);
              }}
              onShowActionView={() => setShowActionSelection(true)}
              toggleSideBar={toggleSideBar}
            />
          )
        ) : selectedActionView === "wait" ? (
          <WaitActionConfigView onClose={() => setSelectedActionView(null)} />
        ) : selectedActionView === "assignContact" ? (
          <AssignContactToUserConfigView
            onClose={() => setSelectedActionView(null)}
          />
        ) : (
          <div className="p-8 text-center">
            Config view for: {selectedActionView} <br />{" "}
            <button
              className="mt-4 underline text-blue-600"
              onClick={() => setSelectedActionView(null)}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </>
  );
};
