import { AsyncSelect } from '../ui/async-select';

type UserDataType = {
  _id: string;
  email: string;
  full_name: string;
};

type Props = {
  authToken?: string;
  value: string;
  setValue: (value: string) => void;
  fetcher: (query: string | undefined) => Promise<UserDataType[] | []>;
}

const AsyncSelectInput = ({
  authToken,
  value,
  fetcher,
  setValue
}: Props) => {
  
  return (
    <AsyncSelect<UserDataType>
      fetcher={fetcher}
      renderOption={(user) => (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="font-semibold">{user.full_name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      )}
      getOptionValue={(user) => user._id}
      getDisplayValue={(user) => (
        <div className="flex items-center gap-2 text-left py-3 w-full">
          <div className="flex flex-col leading-tight gap-1.5">
            <div className="font-bold text-[16px] leading-4 mt-0 text-main-blue">{user.full_name}</div>
            <div className="leading-4 text-[15px] text-main-blue">{user.email}</div>
          </div>
        </div>
      )}
      token={authToken}
      notFound={<div className="py-6 text-center text-sm">No users found</div>}
      label="User"
      placeholder="Cari nama pemain..."
      value={value}
      onChange={setValue}
      width="325px"
    />
  )
}

export default AsyncSelectInput