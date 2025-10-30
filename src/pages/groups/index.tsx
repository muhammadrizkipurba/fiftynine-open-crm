import { useEffect, useState } from 'react'
import { PiCirclesThreePlus } from "react-icons/pi";
import { HiMiniUserPlus } from "react-icons/hi2";

import PageTitleCard from '../../components/common/PageTitleCard'
import Alert, { AlertPropsType } from '../../components/ui/alert'
import SelectInput, { SelectOption } from '../../components/form/SelectInput'
import Loading from "../../components/ui/loading";

import { fetchCategoryOptions, fetchCategoryOptionsPayload } from '../teams/teamRegisteredServices'
import { fetchGroupsList, fetchGroupsListPayload, TournamentGroupType } from './groupsServices'
import CreateGroupForm from './createGroupForm';
import AddTeamForm from './addTeamForm';

type GroupTableProps = {
  idx: number;
  teams: {
    player_1_id: {
      _id: string;
      full_name: string;
    };
    player_2_id: {
      _id: string;
      full_name: string;
    }
  }[] | [];
};

const GroupTable = ({
  idx,
  teams,
}: GroupTableProps) => {
  return (
    <table className="w-full text-left table-auto min-w-max">
      <thead>
        <tr>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 max-w-[15px]">
            <p className="block font-sans text-sm antialiased font-bold leading-none text-white">
              Rank
            </p>
          </th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-bold leading-none text-white">
              Player name
            </p>
          </th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-bold leading-none text-white">
              MP
            </p>
          </th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-bold leading-none text-white">
              W
            </p>
          </th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-bold leading-none text-white">
              L
            </p>
          </th>
          <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-bold leading-none text-white">
              P
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.length > 0 ?
          teams.map((team, sidx) => {
            return (
              <tr key={`group-${idx}-team-${sidx}`} className=''>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className='capitalize p-2 text-center text-xs'>
                    {sidx + 1}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className='capitalize p-2 text-sm text-wrap max-w-[500px]'>
                    <strong>{team.player_1_id.full_name}</strong> & <strong>{team.player_2_id.full_name}</strong>
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className='capitalize p-2 text-sm'>
                    0
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className='capitalize p-2 text-sm'>
                    0
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className='capitalize p-2 text-sm'>
                    0
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className='capitalize p-2 text-sm'>
                    0
                  </p>
                </td>
              </tr>
            )
          })
          : null}
      </tbody>
    </table>
  )
}

const GroupsInfoPage = () => {
  const [isOpenAddTeamModal, setIsOpenAddTeamModal] = useState<boolean>(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertPropsType | null>(null);

  const [selectedTournament, setSelectedTournament] = useState("68ee4a08fa834ff5a0378718");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[] | []>([]);

  const [groupData, setGroupData] = useState([]);

  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState<boolean>(false);

  useEffect(() => {
    fetchSelectCategoryOptions();

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (category_id: string) => {
    setIsLoading(true);
    try {
      const payload: fetchGroupsListPayload = {
        tournament_id: selectedTournament,
        level_category_id: category_id
      };

      const response = await fetchGroupsList(payload);
      const { status, message } = response;
      if (status === 200) {
        setGroupData(message.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setAlert({
          variant: "error",
          title: "Something went wrong",
          message
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setAlert({
        variant: "error",
        title: "Something went wrong",
        message: ""
      });
    }
  };

  const fetchSelectCategoryOptions = async () => {
    try {
      const payload: fetchCategoryOptionsPayload = {
        tournament_id: selectedTournament
      };

      const response = await fetchCategoryOptions(payload);
      const { status, data } = response;
      if (status === 200) {
        setCategoryOptions(data);
        setSelectedCategory(data[0].value);
        fetchData(data[0].value);
      };
    } catch (error) {
      console.error('Error fetching data:', error);
    };
  };

  const onChangeCategory = (value: string) => {
    fetchData(value);
    setSelectedCategory(value);
  };

  return (
    <div>
      <PageTitleCard title="Tournament Groups" />

      <div className='bg-white p-4 mt-4 rounded-lg'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='mb-2'>
            <label className='text-sm text-black font-semibold'>Tournament</label>
            <SelectInput
              name="tournament_id"
              disabled={true}
              placeholder='Pilih kategori'
              defaultValue={selectedTournament}
              value={selectedTournament || ""}
              onChange={(value) => {
                setSelectedTournament(value);
              }}
              options={[
                {
                  value: "68ee4a08fa834ff5a0378718",
                  label: "59 Open"
                }
              ]}
            />
          </div>
          <div className='mb-2'>
            <label className='text-sm text-black font-semibold'>Tournament</label>
            <SelectInput
              name="level_category"
              disabled={isLoading}
              placeholder='Pilih kategori'
              defaultValue={selectedCategory}
              value={selectedCategory}
              onChange={(value) => {
                onChangeCategory(value);
              }}
              options={categoryOptions}
            />
          </div>
        </div>
      </div>

      {alert && <Alert options={alert} />}

      {isLoading ?
        <div className='py-1 flex justify-center w-full min-h-[200px] bg-white mt-3 rounded-lg'>
          <Loading show={isLoading} labelClassName='text-main-blue' spinnerClassName='text-main-blue' />
        </div>
        : <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {groupData && groupData.length > 0 ?
            groupData.map((group: TournamentGroupType, idx) => {
              return (
                <div key={`group-${idx}`} className='flex flex-col h-full mt-5 rounded-lg overflow-hidden'>
                  <div className='bg-main-blue p-4 overflow-hidden'>
                    <label className='text-white text-xl font-bold'>{group.group_name}</label>
                  </div>
                  <div className='flex-1 bg-white'>
                    <div className='overflow-auto'>
                      <GroupTable
                        idx={idx}
                        teams={group.teams}
                      />
                    </div>
                    <div className='px-4 mt-4'>
                      <button
                        onClick={() => {
                          setSelectedGroupId(group._id)
                          setIsOpenAddTeamModal(true);
                        }}
                        className='bg-gray-300 w-full flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-gray-200 transition-all ease-in-out duration-300'
                      >
                        <HiMiniUserPlus />
                        Add team
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
            : null}
          <div className='flex flex-col h-full mt-5 rounded-lg overflow-hidden'>
            <div className='bg-main-green p-4 overflow-hidden'>
              <label className='text-main-blue text-xl font-bold'>New Group</label>
            </div>
            <div className='p-4 pt-8 flex-1 bg-white'>
              <div className='flex flex-col items-center'>
                <PiCirclesThreePlus size={32} />
                <label>Create new group</label>
                <button
                  onClick={() => {
                    setIsOpenCreateGroupModal(true);
                  }}
                  className='p-3 bg-main-green rounded-lg mt-4 text-sm uppercase font-semibold'
                >
                  Create group
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <CreateGroupForm
        isOpen={isOpenCreateGroupModal}
        tournamentId={selectedTournament}
        levelCategoryId={selectedCategory}
        onCloseModal={() => {
          fetchData(selectedCategory);
          setIsOpenCreateGroupModal(false);
        }}
      />

      <AddTeamForm
        isOpen={isOpenAddTeamModal}
        tournamentId={selectedTournament}
        levelCategoryId={selectedCategory}
        groupId={selectedGroupId}
        onCloseModal={() => {
          fetchData(selectedCategory);
          setIsOpenAddTeamModal(false);
        }}
      />
    </div>
  )
}

export default GroupsInfoPage