import { useEffect, useMemo, useState } from 'react';
import { IoCheckmarkCircle, IoInformationCircle, IoLogoInstagram } from "react-icons/io5";
import { io } from 'socket.io-client';
import { fetchApproveRegisteredTeam, fetchApproveRegisteredTeamPayload, fetchCategoryOptions, fetchCategoryOptionsPayload, fetchRegisteredTeamList, fetchTeamListPayload } from './teamRegisteredServices';
import PageTitleCard from '../../components/common/PageTitleCard';
import ReusableTable from '../../components/common/ReactTable';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { SingleTeamData } from './teamTypes';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import 'react-photo-view/dist/react-photo-view.css';
import Alert, { AlertPropsType } from '../../components/ui/alert';
import Loading from "../../components/ui/loading";
import TeamApprovalForm from './teamApprovalForm';
import { SelectOption } from '../../components/form/SelectInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TeamInfoDetails from './teamInfoDetails';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
    placeholderInput?: string;
  }
};

const FilterTextInput = ({
  label,
  column,
  filterAccessorId,
  filters,
  setFilters
}: {
  label: string;
  filterAccessorId: string;
  column: any;
  filters: any;
  setFilters: (e: any) => void;
}) => {
  return (
    <div className='flex flex-col'>
      <small>{label}</small>
      <input
        type="text"
        className='p-2 font-normal rounded-lg text-sm mt-2  text-black'
        value={(column.getFilterValue() ?? '') as string}
        onChange={e => {
          setTimeout(() => {
            const newFilters = filters.map((item: any) => {
              if (item.id === filterAccessorId) {
                return {
                  id: filterAccessorId,
                  value: e.target.value
                };
              };

              return item;
            });
            setFilters(newFilters);
          }, 1500);
          column.setFilterValue(e.target.value)
        }}
        placeholder="Cari nama pemain..."
      />
    </div>
  )
};

const TeamsRegisteredPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertPropsType | null>(null);

  const [selectedTeamData, setSelectedTeamData] = useState<SingleTeamData | null>(null);
  const [approvedCategory, setApprovedCategory] = useState<string>("");
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState<boolean>(false);

  const [selectOptions, setSelectOptions] = useState<SelectOption[] | []>([]);
  const [totalTeamsPerCategory, setTotalTeamsPerCategory] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState([
    { id: "player_1_id.full_name", value: "" },
    { id: "player_2_id.full_name", value: "" },
    { id: "level_category_id", value: "all" },
    { id: "payment_status", value: "all" },
  ]);

  const socket = useMemo(() => io(process.env.REACT_APP_API_URL), []);

  useEffect(() => {
    socket.on('fetchRegisteredTeamList', (data) => {
      const rawData = data.reverse();
      setTableData(rawData);
      // socket.disconnect();
    });

    // socket.on('dataUpdated', (newData) => {
    //   setTableData(prevData => [...prevData, newData]); // Add new data to the table
    // });
    return () => {
      socket.off("fetchRegisteredTeamList");
    };
  }, [socket]);

  useEffect(() => {
    fetchData();
    fetchSelectOptions();

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const payload: fetchTeamListPayload = {
        tournament_id: "68ee4a08fa834ff5a0378718",
        filters,
        pagination: {
          limit: 20,
          activePage: 1
        }
      };
      const response = await fetchRegisteredTeamList(payload);
      const { status, message } = response;
      if (status === 200) {
        setTableData(message.data.reverse());
        setTotalTeamsPerCategory(message.totalTeamsPerCategory);
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

  const fetchSelectOptions = async () => {
    try {
      const payload: fetchCategoryOptionsPayload = {
        tournament_id: "68ee4a08fa834ff5a0378718"
      };

      const response = await fetchCategoryOptions(payload);
      const { status, data } = response;
      if (status === 200) {
        setSelectOptions(data);
      } else {
        setSelectOptions([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onConfirmHandler = async () => {
    try {
      setIsLoading(true);
      const payload: fetchApproveRegisteredTeamPayload = {
        team_id: selectedTeamData?._id,
        approved_category_id: approvedCategory
      };

      const response = await fetchApproveRegisteredTeam(payload);
      const { status } = response;
      if (status === 200) {
        fetchData();
        setIsOpenConfirmationModal(false);
        setSelectedTeamData(null);
        setApprovedCategory("");
      } else {
        setIsOpenConfirmationModal(true);
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setAlert({
        variant: "error",
        title: "Something went wrong",
        message: ""
      });
    };
  };

  const teamColumns: ColumnDef<SingleTeamData>[] = [
    {
      accessorKey: 'No.',
      enableResizing: false,
      size: 10,
      cell: ({ row }) => {
        return (
          <div className='text-center'>
            {Number(row.id) + 1}
          </div>
        )
      }
    },
    {
      accessorKey: 'player_1_id.full_name',
      enableResizing: false,
      size: 150,
      header: ({ column }) => (
        <div className=''>
          <FilterTextInput
            label='Player 1 name'
            filterAccessorId="player_1_id.full_name"
            filters={filters}
            column={column}
            setFilters={setFilters}
          />
        </div>
      ),
      cell: ({ row }) => {
        const { player_1_id, player_1_hometown, player_1_instagram } = row.original;
        const { whatsapp } = player_1_id;
        const phone_number = whatsapp.charAt(0) === "0" ? "+62"+whatsapp.slice(1) : whatsapp.substring(0, 3) === '+62' ? "+62"+whatsapp.slice(3) : "+62"+whatsapp;
        return (
          <div>
            <p className='capitalize font-bold'>{player_1_id.full_name}</p>
            <small className='text-[12px] text-gray-400'>{phone_number}</small>
            { player_1_hometown && 
              <small className='capitalize text-[12px] text-gray-400'> - {player_1_hometown}</small>
            }
            { player_1_instagram && 
              <p className='text-[12px] text-gray-400 leading-3 flex items-center gap-1 lowercase'>
                <IoLogoInstagram size={12} /> 
                <small className='text-[12px] text-gray-400'>{player_1_instagram}</small>
              </p>
            }
          </div>
        )
      }
    },
    {
      accessorKey: 'player_2_id.full_name',
      enableResizing: false,
      size: 150,
      header: ({ column }) => (
        <div className=''>
          <FilterTextInput
            label='Player 2 name'
            filterAccessorId="player_2_id.full_name"
            filters={filters}
            column={column}
            setFilters={setFilters}
          />
        </div>
      ),
      cell: ({ row }) => {
        const { player_2_id, player_2_hometown, player_2_instagram } = row.original;
        const { whatsapp } = player_2_id;
        const phone_number = whatsapp.charAt(0) === "0" ? "+62"+whatsapp.slice(1) : whatsapp.substring(0, 3) === '+62' ? "+62"+whatsapp.slice(3) : "+62"+whatsapp;
        return (
          <div>
            <p className='capitalize font-bold'>{player_2_id.full_name}</p>
            <small className='text-[12px] text-gray-400'>{phone_number}</small>
            { player_2_hometown && player_2_hometown !== "-" && 
              <small className='capitalize text-[12px] text-gray-400'> - {player_2_hometown}</small>
            }
            { player_2_instagram && player_2_instagram !== "-" &&
              <p className='text-[12px] text-gray-400 leading-3 flex items-center gap-1 lowercase'>
                <IoLogoInstagram size={12} /> 
                <small className='text-[12px] text-gray-400'>{player_2_instagram}</small>
              </p>
            }
          </div>
        )
      }
    },
    {
      accessorKey: 'level_category_id.label',
      enableResizing: false,
      size: 150,
      maxSize: 150,
      header: ({ column }) => {
        return (
          <div className=''>
            <small>Category</small>
            <div className=''>
              <select
                className='px-2 py-[9px] font-normal rounded-lg text-sm mt-2 w-full text-black'
                value={(column.getFilterValue() ?? '') as string}
                onChange={e => {
                  const newFilters = filters.map(item => {
                    if (item.id === "level_category_id") {
                      return {
                        id: "level_category_id",
                        value: e.target.value
                      };
                    };

                    return item;
                  });
                  setFilters(newFilters);
                  column.setFilterValue(e.target.value)
                }}
              >
                <option value="all">Semua</option>
                {selectOptions.map((opt: any, idx: number) => {
                  return (
                    <option key={`category-option-${idx}`} value={opt.value}>{opt.label}</option>
                  )
                })}
              </select>
            </div>
          </div>
        )
      },
      cell: ({ row }) => {
        const { original } = row;
        return (
          <div className=''>
            <p className='text-center'>{original.level_category_id.label}</p>
          </div>
        )
      }
    },
    {
      accessorKey: 'payment_status',
      enableResizing: false,
      size: 120,
      header: ({ column }) => {
        return (
          <div className=''>
            <small>Payment Status</small>
            <div className=''>
              <select
                className='px-2 py-[9px] font-normal rounded-lg text-sm mt-2 w-full text-black'
                value={(column.getFilterValue() ?? '') as string}
                onChange={e => {
                  const newFilters = filters.map(item => {
                    if (item.id === "payment_status") {
                      return {
                        id: "payment_status",
                        value: e.target.value
                      };
                    };

                    return item;
                  });
                  setFilters(newFilters);
                  column.setFilterValue(e.target.value)
                }}
              >
                <option value="all">Semua</option>
                {[{value: "waiting", label: "Waiting"}, {value: "confirmed", label: "Confirmed"}].map((opt: any, idx: number) => {
                  return (
                    <option key={`category-option-${idx}`} value={opt.value}>{opt.label}</option>
                  )
                })}
              </select>
            </div>
          </div>
        )
      },
      cell: ({ row }) => {
        const { payment_status } = row.original;
        return (
          <div className='flex items-center gap-2 justify-center'>
            <p className={`text-black py-1 px-3 text-xs rounded-full ${payment_status === "confirmed" ? 'bg-green-400' : 'bg-yellow-300'}`}>{payment_status}</p>
          </div>
        )
      }
    },
    {
      accessorKey: 'review_status',
      enableResizing: false,
      size: 120,
      header: "Review status",
      cell: ({ row }) => {
        const { review_status } = row.original;
        return (
          <div className='flex items-center gap-2 justify-center'>
            <p className={`text-black py-1 px-3 text-xs rounded-full ${review_status === "verified" ? 'bg-green-400' : 'bg-yellow-300'}`}>{review_status}</p>
          </div>
        )
      }
    },
    {
      accessorKey: '_id',
      header: '',
      cell: ({ row }) => {
        const { original } = row;
        return (
          <div className='flex items-center justify-center gap-2 rounded-lg'>
            {(original.review_status === "verified" && original.payment_status === "confirmed") ?
              <button
                className='flex items-center gap-1 py-2 px-4 bg-main-blue text-white rounded-lg'
                onClick={() => {
                  setSelectedTeamData(original);
                  setIsOpenConfirmationModal(false);
                  setIsOpenDetailsModal(true);
                }}
              >
                <IoInformationCircle />
                Lihat detail
              </button>
              : <button
                className='flex items-center gap-1 py-2 px-4 rounded-lg bg-main-gradient font-semibold'
                onClick={() => {
                  setSelectedTeamData(original);
                  setApprovedCategory(original.level_category_id._id);
                  setIsOpenDetailsModal(false);
                  setIsOpenConfirmationModal(true);
                }}
              >
                <IoCheckmarkCircle size={16} /> Approve
              </button>
            }
          </div>
        )
      }
    },
  ];


  return (
    <div className=''>
      <PageTitleCard title="Registered Teams" />
      <div className='mt-4 bg-neutral-300 text-black rounded-xl p-4'>
        <p className='font-bold text-xl'>Total teams per category :</p>
        <hr className='my-4 border-black' />
        {isLoading ?
          <div className='py-1 flex justify-center w-full'>
            <Loading show={isLoading} labelClassName='text-main-blue' spinnerClassName='text-main-blue' />
          </div>
          : <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
            {totalTeamsPerCategory.map((item: any, idx) => {
              return (
                <li key={item.category} className=''>
                  <p className=''>
                    {item.category}
                    <span className='font-bold'>: {item.total} {item.total > 1 ? "pairs" : "pair"}</span>
                  </p>
                </li>
              )
            })}
          </ul>
        }
      </div>

      {alert && <Alert options={alert} />}

      <ReusableTable
        data={tableData}
        columns={teamColumns}
      />

      {/* APPROVE TEAM MODAL */}
      <ConfirmationModal
        title="Approve Team"
        isOpen={isOpenConfirmationModal}
        disabledButton={isLoading}
        onClose={() => {
          setSelectedTeamData(null);
          setIsOpenConfirmationModal(false);
        }}
        showFooter={user && user.role === "admin" ? true : false}
        labelConfirm='Approve'
        onConfirm={onConfirmHandler}
      >
        {user && user.role === "admin" ? 
          <TeamApprovalForm
            isLoading={isLoading}
            approvedCategory={approvedCategory}
            onChangeApprovedCategory={(value) => setApprovedCategory(value)}
            categorySelectOptions={selectOptions}
            selectedTeamData={selectedTeamData}
          />
        : <>
          <TeamInfoDetails selectedTeamData={selectedTeamData} />
          <hr className='my-4' />
          <div className='mt-4 flex flex-col items-center justify-center'>
            <p>You have <strong>view-only</strong> access.</p>
            <p>Please contact your admin to approve this team.</p>
          </div>
        </>
        }
      </ConfirmationModal>

      {/* TEAM INFO DETAILS MODAL */}
      <ConfirmationModal
        title="Team information"
        isOpen={isOpenDetailsModal}
        disabledButton={isLoading}
        onClose={() => {
          setSelectedTeamData(null);
          setIsOpenDetailsModal(false);
        }}
        showFooter={false}
        onConfirm={() => {}}
      >
        <TeamInfoDetails selectedTeamData={selectedTeamData} />
      </ConfirmationModal>
    </div>
  )
}


export default TeamsRegisteredPage