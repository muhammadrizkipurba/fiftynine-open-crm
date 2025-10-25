type FiltersType = {
  id: string;
  value: string 
};

export type fetchTeamListPayload = {
  tournament_id: string;
  filters: FiltersType[] | [];
  pagination: {
    limit: number;
    activePage: number;
  }
};

export type fetchApproveRegisteredTeamPayload = {
  team_id: string | undefined;
  approved_category_id: string;
};

export type fetchCategoryOptionsPayload = {
  tournament_id: string;
};

export const fetchRegisteredTeamList = async(payload: fetchTeamListPayload) => {
  const apiURL = process.env.REACT_APP_API_URL+"/team/registration-list";

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

export const fetchApproveRegisteredTeam = async(payload: fetchApproveRegisteredTeamPayload) => {
  const apiURL = process.env.REACT_APP_API_URL+"/team/approve";

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

export const fetchCategoryOptions = async(payload: fetchCategoryOptionsPayload) => {
  const apiURL = process.env.REACT_APP_API_URL+"/select-options/tournament-categories";

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