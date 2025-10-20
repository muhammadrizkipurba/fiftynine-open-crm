type FiltersType = {
  id: string;
  value: string 
};

export type fetchTeamListPayload = {
  filters: FiltersType[] | [];
  pagination: {
    limit: number;
    activePage: number;
  }
}

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
}