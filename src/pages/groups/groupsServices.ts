import { isEmptyObject } from "../../lib/utils";

export type TournamentGroupType = {
  _id: string;
  group_name: string;
  level_category_id: {
    _id: string;
    label: string;
  };
  teams: {
    player_1_id: {
      _id: string;
      full_name: string;
    };
    player_2_id: {
      _id: string;
      full_name: string;
    };
  }[] | []
};

interface CreateGroupErrorsObjectKeys {
  [key: string]: string;
}

export interface CreateGroupErrors extends CreateGroupErrorsObjectKeys {
  email: string;
  password: string;
};

export interface CreateTeamGroupErrors extends CreateGroupErrorsObjectKeys {
  team_id: string;
};

export type fetchGroupsListPayload = {
  tournament_id: string;
  level_category_id: string;
};

export type fetchCreateGroupPayload = {
  group_name: string;
  tournament_id: string;
  level_category_id: string;
};

export type fetchAddTeamGroupPayload = {
  tournament_id: string;
  level_category_id: string;
  group_id: string | null;
  team_id: string;
};

export const fetchTeams = async(searchInput: string | undefined, token?: string) => {
  const query = {
    searchInput,
    token
  };

  const apiURL = process.env.REACT_APP_API_URL+ "/select-options/teams";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    });
  
    if(!response.ok) {
      console.log(`HTTP Error! Status : ${response.status}`);
      return;
    };
  
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  };
};

export const validateCreateGroupValues = (payload: fetchCreateGroupPayload) => {
  const { 
    group_name,
  } = payload;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};

  if(!group_name) {
    errors["groupName"] = "This field is required"
  };

  return {
    isValid: isEmptyObject(errors),
    formErrors: errors
  };
};

export const validateAddTeamGroupValues = (payload: fetchAddTeamGroupPayload) => {
  const { 
    group_id,
  } = payload;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};

  if(!group_id) {
    errors["group_id"] = "This field is required"
  };

  return {
    isValid: isEmptyObject(errors),
    formErrors: errors
  };
};

export const fetchCreateGroup = async(payload: fetchCreateGroupPayload) => {
  const apiURL = process.env.REACT_APP_API_URL+"/tournament/create-group";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  
    if(!response.ok) {
      console.log(`HTTP Error! Status : ${response.status}`);
      return;
    };
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchGroupsList = async(payload: fetchGroupsListPayload) => {
  const {
    tournament_id,
    level_category_id
  } = payload;

  const apiURL = `${process.env.REACT_APP_API_URL}/tournament/group-list?tournament_id=${tournament_id}&level_category_id=${level_category_id}`;

  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if(!response.ok) {
      console.log(`HTTP Error! Status : ${response.status}`);
      return;
    };
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchAddTeamGroup = async(payload: fetchAddTeamGroupPayload) => {
  const apiURL = process.env.REACT_APP_API_URL+"/tournament/group/add-team";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  
    if(!response.ok) {
      console.log(`HTTP Error! Status : ${response.status}`);
      return;
    };
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};