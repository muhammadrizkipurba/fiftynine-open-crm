import React from 'react'
import { IoInformationCircle } from 'react-icons/io5'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { SingleTeamData } from './teamTypes'
import SelectInput, { SelectOption } from '../../components/form/SelectInput';

type Props = {
  isLoading: boolean;
  approvedCategory: string;
  categorySelectOptions: SelectOption[];
  selectedTeamData: SingleTeamData | null;
  onChangeApprovedCategory: (value: string) => void;
};

const TeamApprovalForm = ({
  isLoading,
  approvedCategory,
  selectedTeamData,
  categorySelectOptions,
  onChangeApprovedCategory
}: Props) => {
  return (
    <>
      <div className='mt-3 mb-5'>
        <div className='mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div>
            <p className='leading-5 text-sm'>
              Player 1
            </p>
            <ul>
              <li>
                <p className='leading-5 text-sm capitalize'>
                  - Name : <strong>{selectedTeamData?.player_1_id.full_name}</strong>
                </p>
              </li>
              <li>
                <p className='leading-5 text-sm capitalize'>
                  - City : <strong>{selectedTeamData?.player_1_hometown || "-"}</strong>
                </p>
              </li>
              <li>
                <p className='leading-5 text-sm capitalize'>
                  - Instagram : <strong>{selectedTeamData?.player_1_instagram || "-"}</strong>
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className='leading-5 text-sm'>
              Player 2
            </p>
            <ul>
              <li>
                <p className='leading-5 text-sm capitalize'>
                  - Name : <strong>{selectedTeamData?.player_2_id.full_name}</strong>
                </p>
              </li>
              <li>
                <p className='leading-5 text-sm capitalize'>
                  - City : <strong>{selectedTeamData?.player_2_hometown || "-"}</strong>
                </p>
              </li>
              <li>
                <p className='leading-5 text-sm capitalize'>
                  - Instagram : <strong>{selectedTeamData?.player_2_instagram || "-"}</strong>
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className='text-sm'>Category : <strong>{selectedTeamData?.level_category_id.label}</strong></p>
          </div>
          <div>
            <p className='text-sm'>Experience : <strong>{selectedTeamData?.survey_data.playing_experience}</strong></p>
          </div>
          {selectedTeamData && selectedTeamData.survey_data.any_tournament_experience === "yes" &&
            <div>
              <p className='text-sm'>Tournament History : <strong>{selectedTeamData?.survey_data.tournament_name_and_result}</strong></p>
            </div>
          }
          <div>
            <p className='text-sm'>Payment Receipt</p>
            <div className='mt-1'>
              <PhotoProvider
                speed={() => 300}
                easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
              >
                <div className="foo border rounded-lg border-gray-300 overflow-hidden">
                  <PhotoView
                    src={`${process.env.REACT_APP_API_URL}/payment-receipts/${selectedTeamData?.payment_receipt_image}`}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/payment-receipts/${selectedTeamData?.payment_receipt_image}`}
                      alt="payment-receipt-image"
                      className='h-32 w-full object-cover hover:bg-gray-50/40 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300'
                    />
                  </PhotoView>
                </div>
              </PhotoProvider>
              <div className='flex items-center bg-blue-100 px-3 py-1 rounded-md mt-2 gap-1'>
                <IoInformationCircle className='text-main-blue' size={14} />
                <small className='italic text-main-blue'>Click image to see payment receipt</small>
              </div>
            </div>
          </div>
          <div>
            <p className='text-sm'>Payment Info</p>
            <ul>
              <li className='text-sm mt-1'>
                - Bank name : <strong>{selectedTeamData?.payment_bank_name || "-"}</strong>
              </li>
              <li className='text-sm mt-1'>
                - Bank account number : <strong>{selectedTeamData?.payment_bank_account_number || "-"}</strong>
              </li>
              <li className='text-sm mt-1'>
                - Bank account name : <strong>{selectedTeamData?.payment_bank_account_name || "-"}</strong>
              </li>
            </ul>
          </div>
        </div>
        <hr className='my-4' />
        <div className=''>
          <div className='mb-1.5'>
            <label className='text-sm'>Approved Category</label>
          </div>
          <SelectInput
            name="level_category"
            disabled={isLoading}
            placeholder='Pilih kategori'
            defaultValue={selectedTeamData?.level_category_id.value}
            value={approvedCategory || ""}
            onChange={(value) => {
              onChangeApprovedCategory(value);
            }}
            options={categorySelectOptions}
          />
        </div>
        <div className='mt-5'>
          <p className='text-sm'>
            Are you sure want to Approve this team registration?
          </p>
        </div>
      </div>
    </>
  )
}

export default TeamApprovalForm