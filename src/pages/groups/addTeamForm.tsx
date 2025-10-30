import { useSelector } from "react-redux";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Alert, { AlertPropsType } from "../../components/ui/alert";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { fetchAddTeamGroup, fetchAddTeamGroupPayload, fetchTeams, validateAddTeamGroupValues } from "./groupsServices";
import { AsyncSelect } from "../../components/ui/async-select";

type Props = {
  tournamentId: string;
  levelCategoryId: string;
  groupId: string | null;
  isOpen: boolean;
  onCloseModal: () => void;
};

type TeamDataType = {
  _id: string;
  player_1_id: {
    _id: string;
    full_name: string;
  };
  player_2_id: {
    _id: string;
    full_name: string;
  };
}

const AddTeamForm = ({
  isOpen,
  tournamentId,
  levelCategoryId,
  groupId,
  onCloseModal,
}: Props) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertPropsType | null>(null);

  const [selectedTeam, setSelectedTeam] = useState("");

  const addTeamHandler = async (payload: fetchAddTeamGroupPayload) => {
    const successRequest = await fetchAddTeamGroup(payload);
    if (!successRequest) {
      setIsLoading(false);
      setAlert({
        variant: "error",
        title: "oppss...",
        message: "Something went wrong. Internal server error!"
      });
      return;
    }

    const { status, msg, message } = successRequest;

    if (status === 200) {
      setIsLoading(false);
      onCloseModal();
    } else {
      setIsLoading(false);
      setAlert({
        variant: "error",
        message: msg || message
      });
    };
  };

  const onAddTeam = () => {
    setIsLoading(true);
    const payload: fetchAddTeamGroupPayload = {
      tournament_id: tournamentId,
      level_category_id: levelCategoryId,
      group_id: groupId,
      team_id: selectedTeam
    };

    const { isValid } = validateAddTeamGroupValues(payload);

    if (isValid) {
      addTeamHandler(payload)
    } else {
      setIsLoading(false);
      setAlert({
        variant: "error",
        message: "Please complete the form correctly"
      });
    };
  };

  const closeModalHandler = () => {
    setSelectedTeam("");
    onCloseModal();
  };

  return (
    <ConfirmationModal
      title="Add team"
      isOpen={isOpen}
      disabledButton={isLoading || !selectedTeam}
      onClose={closeModalHandler}
      showFooter={user && user.role === "developer" ? true : false}
      labelConfirm='Save'
      onConfirm={onAddTeam}
    >
      <div className="mt-4">
        <AsyncSelect<TeamDataType>
          fetcher={fetchTeams}
          renderOption={(team) => (
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="font-semibold">{team.player_1_id.full_name} & {team.player_2_id.full_name}</div>
              </div>
            </div>
          )}
          getOptionValue={(team) => team._id}
          getDisplayValue={(team) => (
            <div className="flex items-center gap-2 text-left py-3 w-full">
              <div className="flex flex-col leading-tight gap-1.5">
                <div className="font-bold text-[16px] leading-4 mt-0 text-main-blue">{team.player_1_id.full_name} & {team.player_2_id.full_name}</div>
              </div>
            </div>
          )}
          token={token || undefined}
          notFound={<div className="py-6 text-center text-sm">Team not found</div>}
          label="User"
          placeholder="Cari nama pemain..."
          value={selectedTeam}
          onChange={(value) => {
            setSelectedTeam(value);
          }}
          width="325px"
        />
      </div>
      {alert && <Alert options={alert} />}
    </ConfirmationModal>
  )
}

export default AddTeamForm