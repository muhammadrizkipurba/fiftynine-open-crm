import React, { useState } from 'react'
import Alert, { AlertPropsType } from '../../components/ui/alert';
import { TextInputIcon } from '../../components/form/Input';
import { CreateGroupErrors, fetchCreateGroup, fetchCreateGroupPayload, validateCreateGroupValues } from './groupsServices';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
  tournamentId: string;
  levelCategoryId: string;
  isOpen: boolean;
  onCloseModal: () => void;
};

const CreateGroupForm = ({
  isOpen,
  tournamentId,
  levelCategoryId,
  onCloseModal
}: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertPropsType | null>(null);
  const [errors, setErrors] = useState<CreateGroupErrors | null>(null);

  const [groupName, setGroupName] = useState<string>("");

  const deleteErrorHandler = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (errors) {
      const newErrors = errors;
      const removedProperty = typeof event === "string" ? event : event.target.name;
      delete newErrors[removedProperty];
      setErrors(newErrors);
    };
  };

  const createGroupHandler = async (payload: fetchCreateGroupPayload) => {
    const successRequest = await fetchCreateGroup(payload);
    if (!successRequest) {
      setIsLoading(false);
      setAlert({
        variant: "error",
        message: "Something went wrong. Internal server error!"
      });
      return;
    }

    const { status, message } = successRequest;

    if (status === 200) {
      setIsLoading(false);
      onCloseModal();
    } else {
      setIsLoading(false);
      setAlert({
        variant: "error",
        message: message
      });
    };
  };

  const onCreateGroup = () => {
    setIsLoading(true);
    const payload: fetchCreateGroupPayload = {
      group_name: groupName,
      tournament_id: tournamentId,
      level_category_id: levelCategoryId
    };

    const { isValid, formErrors } = validateCreateGroupValues(payload);

    if (isValid) {
      createGroupHandler(payload)
    } else {
      setErrors(formErrors);
      setIsLoading(false);
      setAlert({
        variant: "error",
        message: "Please complete the form correctly"
      });
    };
  };

  return (
    <ConfirmationModal
      title="Create new group"
      isOpen={isOpen}
      disabledButton={isLoading}
      onClose={onCloseModal}
      showFooter={user && user.role === "developer" ? true : false}
      labelConfirm='Save'
      onConfirm={onCreateGroup}
    >
      <div>
        <TextInputIcon
          required
          type="text"
          name="groupName"
          value={groupName}
          placeholder="e.g. Group A"
          disabled={isLoading}
          error={errors?.groupName}
          onChange={(e: any) => {
            deleteErrorHandler(e.target.name);
            setGroupName(e.target.value)
          }}
        />
      </div>

      {alert && <Alert options={alert} />}
    </ConfirmationModal>
  )
}

export default CreateGroupForm