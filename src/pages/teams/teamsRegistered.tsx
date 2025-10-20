import { useEffect, useMemo, useState } from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import { io } from 'socket.io-client';
import { fetchRegisteredTeamList, fetchTeamListPayload } from './teamRegisteredServices';
import PageTitleCard from '../../components/common/PageTitleCard';
import ReusableTable from '../../components/common/ReactTable';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { SingleTeamData } from './teamTypes';

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
      <label>{label}</label>
      <input
        type="text"
        className='p-2 font-normal rounded-lg text-sm mt-2  text-black'
        value={(column.getFilterValue() ?? '') as string}
        onChange={e => {
          setTimeout(() => {
            const newFilters = [...filters, {
              id: filterAccessorId,
              value: e.target.value
            }];
            setFilters(newFilters);
          }, 1500);
          column.setFilterValue(e.target.value)
        }}
        placeholder="Cari nama pemain..."
      />
    </div>
  )
}

const TeamsRegisteredPage = () => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState([
    { id: "player_1_id.full_name", value: "" },
    { id: "player_2_id.full_name", value: "" },
    { id: "level_category_id", value: "all" },
  ]);

  const socket = useMemo(() => io(process.env.REACT_APP_API_URL), []);

  useEffect(() => {
    socket.on('fetchRegisteredTeamList', (data) => {
      setTableData(data);
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

    return () => { }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])


  const fetchData = async () => {
    try {
      const payload: fetchTeamListPayload = {
        filters,
        pagination: {
          limit: 20,
          activePage: 1
        }
      };
      const response = await fetchRegisteredTeamList(payload);
      const { status, message } = response;
      if (status === 200) {
        setTableData(message.data)
      } else {
        // setAlert({
        //   variant: "error",
        //   title: "Something went wrong",
        //   message
        // });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const teamColumns: ColumnDef<SingleTeamData>[] = [
    {
      accessorKey: 'player_1_id.full_name',
      enableResizing: false,
      size: 200,
      header: ({ column }) => (
        <div className=''>
          <FilterTextInput 
            label='Nama pemain 1'
            filterAccessorId="player_1_id.full_name"
            filters={filters}
            column={column}
            setFilters={setFilters}
          />
        </div>
      )
    },
    {
      accessorKey: 'player_2_id.full_name',
      enableResizing: false,
      size: 200,
      header: ({ column }) => (
        <div className=''>
          <FilterTextInput 
            label='Nama pemain 2'
            filterAccessorId="player_2_id.full_name"
            filters={filters}
            column={column}
            setFilters={setFilters}
          />
        </div>
      )
    },
    {
      accessorKey: 'level_category_id.label',
      enableResizing: false,
      size: 150,
      maxSize: 150,
      header: ({ column }) => {
        return (
          <div className=''>
            Kategori Level
            <div className=''>
            <select
              className='px-2 py-[9px] font-normal rounded-lg text-sm mt-2 w-full text-black'
              value={"all"}
              onChange={e => {
                const newFilters = [...filters, {
                  id: "level_category_id.label",
                  value: e.target.value
                }];
                setFilters(newFilters);
                column.setFilterValue(e.target.value)
              }}
            >
              {/* See faceted column filters example for dynamic select options */}
              <option value="all">Semua</option>
              <option value="complicated">complicated</option>
              <option value="relationship">relationship</option>
              <option value="single">single</option>
            </select>
            </div>
          </div>
        )
      },
      cell: ({row}) => {
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
      header: 'Status Pembayaran',
      enableResizing: false,
      size: 120,
      cell: ({row}) => {
        const { original } = row;
        return (
          <div className='flex items-center gap-2 justify-center'>
            <p className='bg-yellow-300 text-black py-1 px-3 rounded-full'>{original.payment_status}</p>
          </div>
        )
      }
    },
    {
      accessorKey: 'review_status',
      header: 'Status review',
      enableResizing: false,
      size: 80,
      cell: ({row}) => {
        const { original } = row;
        return (
          <div className='flex items-center gap-2 justify-center'>
            <p className='bg-yellow-300 text-black py-1 px-3 rounded-full'>{original.review_status}</p>
          </div>
        )
      }
    },
    {
      accessorKey: '_id',
      header: '',
      cell: ({row}) => {
        const { original } = row;
        return (
          <div className='flex items-center justify-center gap-2 rounded-lg'>
            {original.review_status === "verified" && original.payment_status === "confirmed" ? 
              <button 
                className='p-2 bg-transparent text-main-blue'
                onClick={() => console.log(original._id)}
              >
                Lihat detail
              </button>
              : <button 
                className='flex items-center gap-1 py-2 px-4 rounded-lg bg-main-gradient font-semibold' 
                onClick={() => console.log(original._id)}
              >
                <IoCheckmarkCircle size={16} /> Konfirmasi
              </button>
            }
          </div>
        )
      }
      // meta: { filterVariant: 'select' }
    },
  ];

  return (
    <div className=''>
      <PageTitleCard title="Data Peserta" />
      <ReusableTable
        data={tableData}
        columns={teamColumns}
      />
    </div>
  )
}

export default TeamsRegisteredPage