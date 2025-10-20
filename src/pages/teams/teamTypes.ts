export interface SingleTeamData {
  survey_data: {
    playing_experience: string;
    any_tournament_experience: string;
    tournament_name_and_result: string;
  };
  _id: string;
  player_1_id: {
    _id: string;
    full_name: string;
    email: string;
    whatsapp: string;
  };
  player_2_id: {
    _id: string;
    full_name: string;
    email: string;
    whatsapp: string;
  };
  level_category_id: {
    _id: string;
    label: string;
    value: string;
  };
  payment_bank_name: string;
  payment_bank_account_number: number | null;
  payment_bank_account_name: string;
  payment_receipt_image: string;
  payment_status: string;
  review_status: string;
};
